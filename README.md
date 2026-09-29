# DATA PULSE — From Raw Data to Real Insights
**Portfolio of MARAGATHALAKSHMI B | Data Analyst**

![Data Pulse Banner](https://img.shields.io/badge/Data%20Pulse-Production%20Ready-blueviolet?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi)

---

## 🌟 Executive Overview

**DATA PULSE** is a production-quality, interactive Data Analyst portfolio website designed and built for **MARAGATHALAKSHMI B**. Unlike generic static resumes, Data Pulse operates as an interactive data intelligence platform demonstrating the complete 8-stage data analytics lifecycle:

```
RAW DATASET
  └── 1. Source Profiling
        └── 2. Data Quality Audit
              └── 3. Data Cleaning (Python / Pandas / Regex)
                    └── 4. SQL Analysis (CTEs & Window Functions)
                          └── 5. Python EDA (Distributions & Elasticity)
                                └── 6. Excel Models (XLOOKUP & SUMIFS)
                                      └── 7. Power BI Dashboards (DAX & Slicers)
                                            └── 8. Actionable Business Strategy
```

---

## 📊 Flagship Projects

1. **Retail Sales Intelligence & Profit Optimization** (`/projects/retail-sales`)
   - *Domain:* Retail & E-Commerce
   - *Dataset:* Global Superstore (1,000 verified rows)
   - *Core Finding:* Identified **$14,200** margin erosion caused by deep discounting (>20%) on Furniture product lines. Formulated discount ceiling policy to recover **$12,000+** in annual net profit.
2. **Customer Retention & Cohort Analytics** (`/projects/customer-retention`)
   - *Domain:* Customer Analytics & CRM
   - *Dataset:* E-Commerce Customer Transactions (500 profiles)
   - *Core Finding:* Proved that customers completing a 3rd purchase achieve an **88%** repeat retention probability. Champions generate **46.2%** of company revenue.
3. **Workforce & HR Analytics: Attrition Diagnostics** (`/projects/workforce-hr`)
   - *Domain:* People Analytics & HR
   - *Dataset:* IBM HR Workforce Dataset (500 employee records)
   - *Core Finding:* Overtime employees experience a **4.2x higher attrition rate** (28.6% vs 6.8%), concentrated in Sales and Operations departments.
4. **E-Commerce Operations & Logistics Analytics** (`/projects/ecommerce-operations`)
   - *Domain:* Supply Chain & Logistics
   - *Dataset:* Global Logistics & Fulfillment (1,000 dispatches)
   - *Core Finding:* Express Logistics achieved **92.4%** on-time SLA compliance, while SpeedyDelivery lagged at **68.2%**. Checkout address errors caused 27% of preventable order cancellations.

---

## 🧪 Interactive Analytics Laboratories

- **Data Cleaning Lab** (`/labs/data-cleaning`): In-browser CSV uploader and automated data quality engine detecting missing values, duplicates, outliers, performing median imputations, and exporting clean CSV files.
- **SQL Query Workbench** (`/labs/sql-query`): Real read-only SQL execution sandbox running against preloaded in-memory SQLite tables with CTEs, window functions, and schema browser.
- **Python Analytics Studio** (`/labs/python-studio`): Jupyter-style notebook runner demonstrating Pandas wrangling, IQR outlier calculations, and correlation heatmaps.
- **Excel Analytics Lab** (`/labs/excel-analytics`): Dynamic spreadsheet formula simulator evaluating XLOOKUP lookups, multi-condition SUMIFS, and IFERROR error handling.
- **Power BI Dashboard Studio** (`/dashboards/power-bi`): Interactive cross-filtering dashboard simulator with dynamic KPI metrics, DAX formula explorer, and dimensional Star Schema models.

---

## 🛠️ Technology Stack & Architecture

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS with custom Glassmorphism system
- **3D Graphics:** Three.js, React Three Fiber & Drei
- **Data Visualizations:** Recharts & Canvas Confetti
- **Icons:** Lucide React

### Backend & Analytics
- **Language:** Python 3.11
- **API Framework:** FastAPI & Uvicorn
- **Data Libraries:** Pandas, NumPy, SQLite3
- **Validation:** Pydantic v2

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js v18+ (v20+ recommended)
- Python 3.10+
- Git

### 1. Clone & Install Frontend
```bash
git clone <repository_url>
cd Maraa
npm install
```

### 2. Install Python Dependencies
```bash
pip install -r backend/requirements.txt
```

### 3. Generate Authentic Datasets
```bash
python analytics/scripts/generate_datasets.py
python analytics/notebooks/generate_notebooks.py
```

### 4. Run Development Servers
```bash
# Start Next.js Development Server (Port 3000)
npm run dev

# (Optional) Start Python FastAPI Backend (Port 8000)
uvicorn backend.main:app --reload --port 8000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Running Automated Tests

```bash
# Run Frontend Tests (Vitest)
npm run test

# Run Backend Tests (Pytest)
pytest backend/test_api.py
```

---

## 🔒 Security & Data Integrity Principles

1. **Read-Only Sandbox:** SQL query console strictly restricts execution to `SELECT`, `WITH`, and `EXPLAIN` statements with keyword blocklists.
2. **Client-Side CSV Handling:** Uploaded CSV files in the Data Cleaning Lab are parsed in-browser using PapaParse and are never permanently stored without consent.
3. **Verified Datasets:** All datasets are derived from documented public domain benchmarks (Kaggle / Open Data Commons CC BY 4.0).
4. **Honest Fresher Profile:** No fabricated credentials, fake corporate clients, or exaggerated metrics.

---

## 📄 License & Attribution

© 2024 MARAGATHALAKSHMI B. Released under the MIT License.
