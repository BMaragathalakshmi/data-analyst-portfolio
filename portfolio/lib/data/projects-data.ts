import { ProjectData } from "@/lib/types";

export const FLAGSHIP_PROJECTS: ProjectData[] = [
  {
    slug: "retail-sales",
    title: "Retail Sales Analysis & Discount Optimization",
    shortDescription: "Portfolio data project analyzing product categories, discount impacts, and regional sales patterns using SQL queries, Python EDA, and Power BI dashboards on an open retail benchmark dataset.",
    businessDomain: "Retail Analytics",
    datasetSource: {
      name: "Global Superstore Open Benchmark Dataset",
      license: "Open Data Commons / Public Domain",
      recordCount: 1000,
      columnCount: 14,
      url: "https://www.kaggle.com"
    },
    heroStats: [
      { label: "Dataset Records", value: "1,000", sub: "Cleaned sample rows" },
      { label: "Total Sales", value: "$418,920", sub: "Calculated across sample" },
      { label: "Overall Margin", value: "16.8%", sub: "Net calculated profit margin" },
      { label: "Pipeline Stages", value: "8 Steps", sub: "Raw CSV to Dashboard" }
    ],
    problemStatement: "In this practice analysis, the goal was to investigate why total revenue increased while net profit margins remained flat across product lines, specifically testing the hypothesis that aggressive discounting (>20%) erodes category profitability.",
    solutionOverview: "Conducted an end-to-end analysis: cleaned raw CSV records, resolved 12 duplicate rows and missing profit entries using Pandas, wrote relational SQL queries with CTEs and window functions, visualized distributions in Python, and built an interactive Power BI report.",
    keyFindings: [
      "Technology sub-categories (Phones, Accessories) generated the highest calculated sales and profit margins in the sample.",
      "Furniture items sold with discounts higher than 20% showed negative net margins in the dataset.",
      "West and East regions showed higher average order values ($438 vs $372) compared to Central and South regions in this sample.",
      "Corporate orders accounted for higher average sales per transaction than individual consumer orders."
    ],
    recommendations: [
      "Set a suggested discount limit of 15% on low-margin furniture categories to prevent negative margin sales.",
      "Focus promotional campaigns in regions with higher average basket sizes.",
      "Monitor data quality regularly to prevent missing profit and date formatting discrepancies in raw transactional logs."
    ],
    limitations: [
      "Analysis is based on a 1,000-row sample dataset for academic and portfolio practice.",
      "Does not include marketing spend, customer acquisition cost, or external macroeconomic factors."
    ],
    stages: [
      {
        id: "raw-dataset",
        title: "1. Raw Dataset Ingestion",
        subtitle: "Sample data schema & attributes",
        description: "Loaded a sample raw dataset of 1,012 records across 14 columns to practice schema inspection and identify common real-world data issues.",
        iconName: "Database",
        toolsUsed: ["CSV Ingestion", "Pandas", "Python"],
        metrics: [
          { label: "Raw Records", value: "1,012", status: "normal" },
          { label: "Columns", value: "14", status: "normal" },
          { label: "File Format", value: "CSV", status: "normal" }
        ],
        tablePreview: {
          columns: ["order_id", "order_date", "customer_id", "region", "category", "sales", "discount", "profit"],
          rows: [
            ["ORD-2023-10001", "2023-01-14", "CUST-142", "East", "Technology", 840.50, 0.10, 168.10],
            ["ORD-2023-10002", "2023-01-18", "CUST-218", "West", "Furniture", 420.00, 0.20, 42.00],
            ["ORD-2023-10003", "2023-01-22", "CUST-304", "Central", "Office Supplies", 45.20, 0.00, 11.30],
            ["ORD-2023-10004", "2023-01-29", "CUST-119", "South", "Technology", 1250.00, 0.00, 312.50]
          ]
        },
        artifacts: [
          { name: "retail_sales_clean.csv", type: "CSV", downloadUrl: "/data/retail_sales_clean.csv", size: "135 KB" }
        ]
      },
      {
        id: "data-quality-audit",
        title: "2. Data Quality Audit",
        subtitle: "Checking for nulls, duplicates & format errors",
        description: "Ran Python validation scripts checking for null values, duplicates, mixed date formats, and negative margin outliers.",
        iconName: "ShieldAlert",
        toolsUsed: ["Python Pandas", "Data Validation"],
        metrics: [
          { label: "Duplicate Rows", value: "12", status: "warning" },
          { label: "Missing Profit Values", value: "28", status: "warning" }
        ],
        codeSnippet: {
          language: "python",
          title: "data_quality_audit.py",
          code: `import pandas as pd

df = pd.read_csv('retail_sales_raw.csv')
print("Total rows:", len(df))
print("Duplicate rows:", df.duplicated().sum())
print("Missing values per column:\n", df.isnull().sum())`,
          explanation: "Script used to identify missing records and duplicates before running analytical queries."
        }
      },
      {
        id: "data-cleaning",
        title: "3. Data Cleaning & Preparation",
        subtitle: "Deduplication & datatype standardization",
        description: "Standardized text formatting, cleaned column names, removed duplicate rows, and imputed missing numerical values with sub-category medians.",
        iconName: "Wand2",
        toolsUsed: ["Python Pandas", "Data Cleaning"],
        metrics: [
          { label: "Clean Records", value: "1,000", status: "good" },
          { label: "Missing Values", value: "0", status: "good" }
        ],
        codeSnippet: {
          language: "python",
          title: "clean_dataset.py",
          code: `# Clean whitespace & title case
for col in ['region', 'category', 'sub_category', 'segment']:
    df[col] = df[col].astype(str).str.strip().str.title()

# Remove duplicate rows
df = df.drop_duplicates()

# Fill missing profit with sub-category median
df['profit'] = pd.to_numeric(df['profit'], errors='coerce')
df['profit'] = df['profit'].fillna(df.groupby('sub_category')['profit'].transform('median'))`,
          explanation: "Demonstrates practical data cleaning steps in Pandas."
        }
      },
      {
        id: "sql-analysis",
        title: "4. SQL Query Analysis",
        subtitle: "CTEs, aggregations & window functions",
        description: "Loaded cleaned data into SQLite to practice writing analytical SQL queries, CTEs, and window functions.",
        iconName: "Terminal",
        toolsUsed: ["SQLite / PostgreSQL", "SQL CTEs", "Window Functions"],
        codeSnippet: {
          language: "sql",
          title: "regional_sales_summary.sql",
          code: `WITH MonthlySales AS (
    SELECT 
        region,
        SUBSTR(order_date, 1, 7) AS order_month,
        ROUND(SUM(sales), 2) AS monthly_sales,
        ROUND(SUM(profit), 2) AS monthly_profit
    FROM retail_sales
    GROUP BY region, order_month
)
SELECT 
    region,
    order_month,
    monthly_sales,
    monthly_profit,
    ROUND(SUM(monthly_sales) OVER (PARTITION BY region ORDER BY order_month), 2) AS cumulative_sales
FROM MonthlySales
ORDER BY region, order_month;`,
          explanation: "Calculates monthly sales and cumulative running totals by region using SQL window functions."
        }
      },
      {
        id: "python-eda",
        title: "5. Python Exploratory Analysis",
        subtitle: "Statistical summary & correlation",
        description: "Generated category summaries and correlation matrices using Pandas and Matplotlib.",
        iconName: "Code2",
        toolsUsed: ["Python", "Pandas", "Matplotlib"],
        chartType: "bar",
        chartData: [
          { name: "Technology", sales: 178500, profit: 40000 },
          { name: "Furniture", sales: 132400, profit: 12200 },
          { name: "Office Supplies", sales: 108020, profit: 18200 }
        ]
      },
      {
        id: "excel-analysis",
        title: "6. Excel Modeling & Formulas",
        subtitle: "XLOOKUP, SUMIFS & Pivot Tables",
        description: "Created structured spreadsheet models with XLOOKUP formulas, conditional formatting, and multi-condition SUMIFS calculations.",
        iconName: "FileSpreadsheet",
        toolsUsed: ["Microsoft Excel", "XLOOKUP", "SUMIFS", "Pivot Tables"]
      },
      {
        id: "power-bi-dashboard",
        title: "7. Power BI Dashboard",
        subtitle: "Interactive visual reporting",
        description: "Built a Power BI dashboard report with interactive slicers, KPI calculation cards, and DAX measures.",
        iconName: "LayoutDashboard",
        toolsUsed: ["Power BI Desktop", "DAX Measures", "Data Modeling"]
      },
      {
        id: "business-insights",
        title: "8. Summary & Takeaways",
        subtitle: "Synthesizing analytical findings",
        description: "Summarized the analytical findings into clear business takeaways and practice recommendations.",
        iconName: "TrendingUp",
        toolsUsed: ["Analytical Reporting", "Summary Documentation"],
        insights: [
          "Technology items generated the strongest margins in this sample dataset.",
          "High discounts (>20%) on furniture products consistently reduced net profitability.",
          "Clean, structured data ensures accurate calculations across SQL and BI tools."
        ]
      }
    ]
  },
  {
    slug: "customer-retention",
    title: "Customer Retention & Cohort Study",
    shortDescription: "Practice project analyzing customer repeat purchase patterns, cohort retention, and RFM segmentation on an open-source e-commerce dataset.",
    businessDomain: "Customer Analytics",
    datasetSource: {
      name: "Open E-Commerce Customer Benchmark Dataset",
      license: "Public Domain / CC BY",
      recordCount: 500,
      columnCount: 8,
      url: "https://www.kaggle.com"
    },
    heroStats: [
      { label: "Sample Accounts", value: "500", sub: "Analyzed customer profiles" },
      { label: "Repeat Buyers", value: "48.6%", sub: "Customers with >= 2 orders" },
      { label: "Top Segment", value: "Champions", sub: "Highest frequency & spend" },
      { label: "Cohorts", value: "6 Months", sub: "Signup batches" }
    ],
    problemStatement: "Investigated how customer order frequency and recency relate to long-term repeat purchasing, and practiced building an RFM (Recency, Frequency, Monetary) segmentation model.",
    solutionOverview: "Calculated RFM score brackets, wrote SQL queries for monthly signup cohorts, and built visualization charts in Python and Power BI.",
    keyFindings: [
      "Customers who made 3 or more purchases showed significantly higher repeat probability in subsequent months.",
      "The top customer segment accounted for a major share of total sample spend.",
      "Recency beyond 90 days strongly correlated with inactivity in the sample dataset."
    ],
    recommendations: [
      "Send timely re-engagement reminders to customers before recency exceeds 45-60 days.",
      "Offer loyalty incentives to encourage the critical 2nd and 3rd repeat purchase."
    ],
    limitations: [
      "Dataset is a 500-customer sample used for learning and portfolio demonstration."
    ],
    stages: [
      {
        id: "raw-dataset",
        title: "1. Raw Dataset Ingestion",
        subtitle: "Customer transactional logs",
        description: "Loaded 500 customer records with cohort tags, transaction counts, and spend values.",
        iconName: "Database",
        toolsUsed: ["CSV Ingestion", "Python Pandas"]
      },
      {
        id: "data-quality-audit",
        title: "2. Data Quality Audit",
        subtitle: "Checking customer records",
        description: "Verified unique customer IDs and validated non-negative spend values.",
        iconName: "ShieldAlert",
        toolsUsed: ["Python Assertions"]
      },
      {
        id: "data-cleaning",
        title: "3. RFM Feature Engineering",
        subtitle: "Scoring recency, frequency & monetary tiers",
        description: "Segmented customers into categories (Champions, Loyal, At Risk, Hibernating, New) based on recency days and order count.",
        iconName: "Wand2",
        toolsUsed: ["Python Pandas", "NumPy"]
      },
      {
        id: "sql-analysis",
        title: "4. SQL Cohort Queries",
        subtitle: "Grouping cohorts and calculating repeat rates",
        description: "Wrote SQL queries to aggregate customers by cohort month and segment.",
        iconName: "Terminal",
        toolsUsed: ["SQL Aggregations"]
      },
      {
        id: "python-eda",
        title: "5. Python Visualizations",
        subtitle: "Customer distribution plots",
        description: "Visualized customer distribution across segments using Matplotlib.",
        iconName: "Code2",
        toolsUsed: ["Python", "Matplotlib"],
        chartType: "pie",
        chartData: [
          { name: "Champions", value: 91 },
          { name: "Loyal Customers", value: 135 },
          { name: "At Risk", value: 107 },
          { name: "Hibernating", value: 89 },
          { name: "New Customers", value: 78 }
        ]
      },
      {
        id: "excel-analysis",
        title: "6. Excel Cohort Matrix",
        subtitle: "Cohort matrix modeling",
        description: "Constructed dynamic cohort matrices using Excel formulas.",
        iconName: "FileSpreadsheet",
        toolsUsed: ["Excel Formulas"]
      },
      {
        id: "power-bi-dashboard",
        title: "7. Power BI Customer Report",
        subtitle: "Interactive segment lookup",
        description: "Built a Power BI visual to filter and inspect customer segments.",
        iconName: "LayoutDashboard",
        toolsUsed: ["Power BI", "DAX"]
      },
      {
        id: "business-insights",
        title: "8. Recommendations & Takeaways",
        subtitle: "Retention strategies",
        description: "Documented key customer retention principles based on the sample findings.",
        iconName: "TrendingUp",
        toolsUsed: ["Analytical Summary"],
        insights: [
          "Early engagement within the first 45 days is critical to prevent customer churn.",
          "Segmenting customers by RFM helps prioritize marketing efforts effectively."
        ]
      }
    ]
  },
  {
    slug: "workforce-hr",
    title: "Workforce & HR Attrition Analysis",
    shortDescription: "Analytical study of employee satisfaction, department metrics, and overtime factors using SQL queries and Power BI on an open HR dataset.",
    businessDomain: "People Analytics",
    datasetSource: {
      name: "IBM HR Open Benchmark Dataset",
      license: "Open Data Commons / Public Domain",
      recordCount: 500,
      columnCount: 9,
      url: "https://www.kaggle.com"
    },
    heroStats: [
      { label: "Sample Headcount", value: "500", sub: "Employee records" },
      { label: "Sample Attrition", value: "14.2%", sub: "Voluntary departures" },
      { label: "Overtime Staff", value: "28.6%", sub: "Departure rate in overtime group" },
      { label: "Departments", value: "6", sub: "Analyzed business units" }
    ],
    problemStatement: "Explored common factors associated with employee attrition (such as overtime status, satisfaction scores, and tenure) using descriptive statistics and SQL cross-tabs.",
    solutionOverview: "Processed 500 sample records, wrote SQL queries to compare department turnover rates, and built visual comparison cards in Power BI.",
    keyFindings: [
      "Employees working regular overtime in the sample had higher departure rates than non-overtime staff.",
      "Low job satisfaction ratings (1 or 2) strongly coincided with higher attrition rates in the dataset.",
      "Sales and Operations showed higher turnover percentages compared to Engineering and Finance in this sample."
    ],
    recommendations: [
      "Monitor overtime hours to avoid team burnout.",
      "Conduct regular feedback reviews in departments showing higher turnover rates."
    ],
    limitations: [
      "Academic sample dataset; qualitative exit interview details were not included."
    ],
    stages: [
      {
        id: "raw-dataset",
        title: "1. Raw Dataset Ingestion",
        subtitle: "Demographic & tenure records",
        description: "Imported 500 sample employee records spanning age, department, income, and attrition status.",
        iconName: "Database",
        toolsUsed: ["CSV Ingestion"]
      },
      {
        id: "data-quality-audit",
        title: "2. Data Quality Audit",
        subtitle: "Validating data ranges",
        description: "Checked age, tenure, and salary bounds for consistency.",
        iconName: "ShieldAlert",
        toolsUsed: ["Python Validation"]
      },
      {
        id: "data-cleaning",
        title: "3. Categorical Standardization",
        subtitle: "Standardizing department names",
        description: "Cleaned department labels and created tenure brackets.",
        iconName: "Wand2",
        toolsUsed: ["Pandas"]
      },
      {
        id: "sql-analysis",
        title: "4. SQL Department Queries",
        subtitle: "Overtime vs Attrition cross-tabs",
        description: "Wrote SQL queries grouping staff by overtime status and department.",
        iconName: "Terminal",
        toolsUsed: ["SQL Aggregations"]
      },
      {
        id: "python-eda",
        title: "5. Python Charts",
        subtitle: "Department turnover breakdown",
        description: "Plotted turnover rates across departments in Python.",
        iconName: "Code2",
        toolsUsed: ["Python", "Matplotlib"],
        chartType: "bar",
        chartData: [
          { name: "Engineering", headcount: 95, attritionPct: 9.5 },
          { name: "Sales", headcount: 110, attritionPct: 21.8 },
          { name: "Marketing", headcount: 75, attritionPct: 14.7 },
          { name: "HR", headcount: 50, attritionPct: 10.0 },
          { name: "Finance", headcount: 80, attritionPct: 11.2 },
          { name: "Operations", headcount: 90, attritionPct: 18.9 }
        ]
      },
      {
        id: "excel-analysis",
        title: "6. Excel Salary Modeling",
        subtitle: "Salary band calculations",
        description: "Calculated average salary metrics by department using Excel formulas.",
        iconName: "FileSpreadsheet",
        toolsUsed: ["Excel Formulas"]
      },
      {
        id: "power-bi-dashboard",
        title: "7. Power BI HR Dashboard",
        subtitle: "Visualizing staff metrics",
        description: "Created an interactive Power BI report with department slicers.",
        iconName: "LayoutDashboard",
        toolsUsed: ["Power BI", "DAX"]
      },
      {
        id: "business-insights",
        title: "8. Summary & Takeaways",
        subtitle: "Key takeaways",
        description: "Summarized the observed correlation between workload, satisfaction, and staff retention.",
        iconName: "TrendingUp",
        toolsUsed: ["Reporting"],
        insights: [
          "Balanced workloads and overtime monitoring support employee retention.",
          "Regular pulse checks help identify low-satisfaction areas early."
        ]
      }
    ]
  },
  {
    slug: "ecommerce-operations",
    title: "E-Commerce Logistics & Delivery SLA Analysis",
    shortDescription: "Operational study evaluating courier delivery durations, SLA compliance rates, and order status breakdown on an open logistics dataset.",
    businessDomain: "Logistics & Operations",
    datasetSource: {
      name: "Open Logistics & Fulfillment Benchmark Dataset",
      license: "Public Domain / CC BY",
      recordCount: 1000,
      columnCount: 8,
      url: "https://www.kaggle.com"
    },
    heroStats: [
      { label: "Sample Dispatches", value: "1,000", sub: "Shipment logs" },
      { label: "Sample SLA Rate", value: "81.4%", sub: "On-time deliveries" },
      { label: "Avg Delivery Time", value: "3.6 Days", sub: "Across all couriers" },
      { label: "Couriers", value: "4", sub: "Logistics partners" }
    ],
    problemStatement: "Evaluated transit durations across logistics partners to understand SLA compliance differences and identify reasons for order cancellations in the sample data.",
    solutionOverview: "Analyzed 1,000 shipment dispatches, wrote SQL queries to compute partner on-time percentages, and built an interactive dashboard.",
    keyFindings: [
      "Express Logistics achieved the highest on-time delivery rate (92.4%) in the sample dataset.",
      "SpeedyDelivery recorded lower SLA compliance (68.2%) with higher average transit delays.",
      "Payment gateway failures and address errors were the most common cancellation reasons recorded."
    ],
    recommendations: [
      "Allocate time-sensitive shipments to carriers with higher historical on-time rates.",
      "Add address validation checks during order entry to reduce delivery failures."
    ],
    limitations: [
      "External factors like weather disruptions were not captured in the benchmark dataset."
    ],
    stages: [
      {
        id: "raw-dataset",
        title: "1. Raw Dataset Ingestion",
        subtitle: "Logistics dispatch records",
        description: "Loaded 1,000 shipment logs detailing courier partner, promised days, and transit days.",
        iconName: "Database",
        toolsUsed: ["CSV Ingestion"]
      },
      {
        id: "data-quality-audit",
        title: "2. Data Quality Audit",
        subtitle: "Checking transit day logic",
        description: "Verified delivery day calculations and confirmed non-negative shipping costs.",
        iconName: "ShieldAlert",
        toolsUsed: ["Python Validation"]
      },
      {
        id: "data-cleaning",
        title: "3. SLA Normalization",
        subtitle: "Standardizing carrier names",
        description: "Cleaned courier names and flagged on-time vs delayed records.",
        iconName: "Wand2",
        toolsUsed: ["Pandas"]
      },
      {
        id: "sql-analysis",
        title: "4. SQL Courier Scorecard",
        subtitle: "Ranking on-time percentages",
        description: "Wrote SQL queries computing average transit days and on-time SLA rates by carrier.",
        iconName: "Terminal",
        toolsUsed: ["SQL Aggregations"]
      },
      {
        id: "python-eda",
        title: "5. Python Charts",
        subtitle: "Carrier SLA comparison",
        description: "Plotted on-time delivery rates across carriers in Python.",
        iconName: "Code2",
        toolsUsed: ["Python", "Matplotlib"],
        chartType: "bar",
        chartData: [
          { name: "Express Logistics", total: 260, onTimePct: 92.4 },
          { name: "FastTrack Cargo", total: 245, onTimePct: 84.6 },
          { name: "MetroPostal", total: 255, onTimePct: 80.4 },
          { name: "SpeedyDelivery", total: 240, onTimePct: 68.2 }
        ]
      },
      {
        id: "excel-analysis",
        title: "6. Excel Courier Scorecard",
        subtitle: "Partner rating formulas",
        description: "Built an Excel spreadsheet model calculating on-time performance.",
        iconName: "FileSpreadsheet",
        toolsUsed: ["Excel Formulas"]
      },
      {
        id: "power-bi-dashboard",
        title: "7. Power BI Logistics Dashboard",
        subtitle: "Interactive dispatch monitor",
        description: "Created a Power BI dashboard tracking delivery timelines.",
        iconName: "LayoutDashboard",
        toolsUsed: ["Power BI", "DAX"]
      },
      {
        id: "business-insights",
        title: "8. Summary & Takeaways",
        subtitle: "Logistics conclusions",
        description: "Documented operational takeaways based on the carrier performance analysis.",
        iconName: "TrendingUp",
        toolsUsed: ["Reporting"],
        insights: [
          "Tracking carrier SLAs objectively helps optimize shipping allocation.",
          "Accurate address validation at entry prevents downstream delivery failures."
        ]
      }
    ]
  }
];
