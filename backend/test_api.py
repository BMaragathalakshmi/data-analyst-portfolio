import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["portfolio"] == "DATA PULSE"
    assert data["author"] == "MARAGATHALAKSHMI B"

def test_sql_execution_retail():
    response = client.post("/api/run-sql", json={
        "query": "SELECT COUNT(*) as total FROM retail_sales",
        "limit": 10
    })
    assert response.status_code == 200
    data = response.json()
    assert data["columns"] == ["total"]
    assert len(data["rows"]) == 1
    assert data["rows"][0][0] == 1000

def test_sql_security_disallowed_statement():
    response = client.post("/api/run-sql", json={
        "query": "DROP TABLE retail_sales",
        "limit": 10
    })
    assert response.status_code == 400
    assert "Security policy" in response.json()["detail"]

def test_sql_cte_query():
    query = """
    WITH MonthlyTotals AS (
        SELECT region, SUM(sales) as total_sales
        FROM retail_sales
        GROUP BY region
    )
    SELECT * FROM MonthlyTotals ORDER BY total_sales DESC;
    """
    response = client.post("/api/run-sql", json={"query": query})
    assert response.status_code == 200
    data = response.json()
    assert len(data["rows"]) == 4
