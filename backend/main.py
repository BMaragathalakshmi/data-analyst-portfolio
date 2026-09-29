import io
import os
import sqlite3
import threading
import pandas as pd
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

app = FastAPI(
    title="Data Pulse Analytics API",
    description="Data cleaning, SQL execution, and EDA engine for Maragathalakshmi B's Data Pulse Portfolio",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

# In-memory SQLite DB preloaded with project datasets
DB_CONN = sqlite3.connect(":memory:", check_same_thread=False)
DB_LOCK = threading.Lock()

def init_db():
    try:
        retail_df = pd.read_csv("analytics/datasets/retail_sales_clean.csv")
        retail_df.to_sql("retail_sales", DB_CONN, if_exists="replace", index=False)
        
        retention_df = pd.read_csv("analytics/datasets/customer_retention.csv")
        retention_df.to_sql("customer_retention", DB_CONN, if_exists="replace", index=False)
        
        hr_df = pd.read_csv("analytics/datasets/workforce_hr.csv")
        hr_df.to_sql("workforce_hr", DB_CONN, if_exists="replace", index=False)
        
        ops_df = pd.read_csv("analytics/datasets/ecommerce_operations.csv")
        ops_df.to_sql("ecommerce_operations", DB_CONN, if_exists="replace", index=False)
        print("Preloaded all datasets into in-memory SQLite database.")
    except Exception as e:
        print(f"Warning during DB init: {e}")

init_db()

class SqlRequest(BaseModel):
    query: str = Field(min_length=1, max_length=10_000)
    limit: Optional[int] = Field(default=100, ge=1, le=500)

class SqlResponse(BaseModel):
    columns: List[str]
    rows: List[List[Any]]
    row_count: int
    execution_time_ms: float
    error: Optional[str] = None

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "portfolio": "DATA PULSE",
        "author": "MARAGATHALAKSHMI B",
        "role": "Aspiring Data Analyst"
    }

@app.post("/api/run-sql", response_model=SqlResponse)
def execute_sql(req: SqlRequest):
    import time
    start_time = time.time()
    
    # Security: Ensure read-only query
    cleaned_query = req.query.strip().rstrip(";")
    first_word = cleaned_query.split()[0].upper() if cleaned_query.split() else ""
    
    if first_word not in ["SELECT", "WITH", "EXPLAIN"]:
        raise HTTPException(status_code=400, detail="Security policy: Only SELECT, WITH, and EXPLAIN queries are permitted in read-only sandbox.")
    
    disallowed_keywords = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "ATTACH", "DETACH", "CREATE", "REPLACE", "PRAGMA"]
    for kw in disallowed_keywords:
        if f" {kw} " in f" {cleaned_query.upper()} ":
            raise HTTPException(status_code=400, detail=f"Query contains disallowed keyword: {kw}")
    
    try:
        with DB_LOCK:
            DB_CONN.execute("PRAGMA query_only = ON")
            cursor = DB_CONN.execute(cleaned_query)
            columns = [desc[0] for desc in cursor.description] if cursor.description else []
            rows = cursor.fetchmany(req.limit)
        duration = round((time.time() - start_time) * 1000, 2)
        
        return SqlResponse(
            columns=columns,
            rows=rows,
            row_count=len(rows),
            execution_time_ms=duration
        )
    except Exception as e:
        duration = round((time.time() - start_time) * 1000, 2)
        return SqlResponse(
            columns=[],
            rows=[],
            row_count=0,
            execution_time_ms=duration,
            error=str(e)
        )

@app.post("/api/audit-csv")
async def audit_csv_endpoint(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported.")
    
    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds 10MB limit.")
    
    try:
        df = pd.read_csv(io.BytesIO(contents))
    except (pd.errors.ParserError, UnicodeDecodeError, ValueError) as error:
        raise HTTPException(status_code=400, detail="The uploaded file is not a valid CSV.") from error
    
    # Audit metrics
    total_rows = len(df)
    total_cols = len(df.columns)
    if total_rows == 0:
        raise HTTPException(status_code=400, detail="The CSV file contains no data rows.")
    duplicate_rows = int(df.duplicated().sum())
    missing_by_col = df.isnull().sum().to_dict()
    dtypes = {col: str(dtype) for col, dtype in df.dtypes.items()}
    
    issues = []
    for col, missing_count in missing_by_col.items():
        if missing_count > 0:
            issues.append({
                "type": "missing",
                "column": col,
                "count": int(missing_count),
                "percentage": round((missing_count / total_rows) * 100, 2),
                "severity": "high" if (missing_count / total_rows) > 0.1 else "medium",
                "recommendation": f"Impute with median for numerical or 'Unknown' for categorical, or drop if critical key."
            })
    
    if duplicate_rows > 0:
        issues.append({
            "type": "duplicate",
            "column": "All Rows",
            "count": duplicate_rows,
            "percentage": round((duplicate_rows / total_rows) * 100, 2),
            "severity": "medium",
            "recommendation": "Deduplicate across primary key identifier."
        })
        
    return {
        "filename": file.filename,
        "rows": total_rows,
        "columns": total_cols,
        "duplicate_count": duplicate_rows,
        "column_types": dtypes,
        "issues": issues,
        "preview_columns": list(df.columns),
        "preview_rows": df.head(10).fillna("").values.tolist()
    }
