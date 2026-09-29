export interface SqlQueryPreset {
  id: string;
  title: string;
  category: string;
  description: string;
  targetTable: string;
  sql: string;
  explanation: string;
}

export const SQL_PRESETS: SqlQueryPreset[] = [
  {
    id: "retail-summary",
    title: "Executive Revenue & Profit Margin KPI",
    category: "Aggregations",
    description: "Calculates total sales, gross profit, overall profit margin percentage, and average basket value across the entire retail dataset.",
    targetTable: "retail_sales",
    sql: `SELECT 
    COUNT(DISTINCT order_id) AS total_orders,
    COUNT(DISTINCT customer_id) AS unique_customers,
    ROUND(SUM(sales), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND((SUM(profit) / SUM(sales)) * 100, 2) AS profit_margin_pct,
    ROUND(AVG(sales), 2) AS avg_order_value
FROM retail_sales;`,
    explanation: "Standard aggregate functions (COUNT, SUM, AVG, ROUND) evaluating high-level business health."
  },
  {
    id: "retail-subcat-cte",
    title: "Sub-Category Contribution with CTE",
    category: "CTEs & Ranks",
    description: "Uses a Common Table Expression to aggregate category totals and calculate sub-category share of category sales.",
    targetTable: "retail_sales",
    sql: `WITH CategorySales AS (
    SELECT 
        category,
        sub_category,
        SUM(sales) AS subcat_sales,
        SUM(profit) AS subcat_profit,
        SUM(quantity) AS units_sold,
        AVG(discount) * 100 AS avg_discount_pct
    FROM retail_sales
    GROUP BY category, sub_category
)
SELECT 
    category,
    sub_category,
    ROUND(subcat_sales, 2) AS sales,
    ROUND(subcat_profit, 2) AS profit,
    units_sold,
    ROUND(avg_discount_pct, 1) AS avg_discount_pct,
    ROUND((subcat_profit / subcat_sales) * 100, 2) AS margin_pct
FROM CategorySales
ORDER BY category, subcat_sales DESC;`,
    explanation: "Encapsulates aggregations into a clean CTE, making margin calculations reusable and readable."
  },
  {
    id: "retail-window-cumulative",
    title: "Regional Cumulative Revenue (Window Function)",
    category: "Window Functions",
    description: "Computes running cumulative revenue per region using SUM() OVER (PARTITION BY region ORDER BY order_month).",
    targetTable: "retail_sales",
    sql: `WITH MonthlyRegional AS (
    SELECT 
        region,
        SUBSTR(order_date, 1, 7) AS order_month,
        SUM(sales) AS monthly_sales,
        SUM(profit) AS monthly_profit
    FROM retail_sales
    GROUP BY region, order_month
)
SELECT 
    region,
    order_month,
    ROUND(monthly_sales, 2) AS monthly_revenue,
    ROUND(monthly_profit, 2) AS monthly_profit,
    ROUND(SUM(monthly_sales) OVER (
        PARTITION BY region 
        ORDER BY order_month 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ), 2) AS cumulative_revenue
FROM MonthlyRegional
ORDER BY region, order_month;`,
    explanation: "Demonstrates window partitioning to calculate ongoing cumulative pacing across geographical regions."
  },
  {
    id: "rfm-tier-summary",
    title: "RFM Segment Churn Risk & Spend Matrix",
    category: "Customer Analytics",
    description: "Evaluates revenue contribution and churn percentages across RFM customer tiers.",
    targetTable: "customer_retention",
    sql: `SELECT 
    rfm_segment,
    COUNT(customer_id) AS total_customers,
    ROUND(AVG(total_spent), 2) AS avg_monetary_value,
    ROUND(AVG(order_count), 1) AS avg_frequency,
    ROUND(AVG(recency_days), 1) AS avg_recency_days,
    ROUND(SUM(total_spent), 2) AS total_segment_revenue,
    ROUND(SUM(is_churned) * 100.0 / COUNT(customer_id), 1) AS churn_rate_pct
FROM customer_retention
GROUP BY rfm_segment
ORDER BY total_segment_revenue DESC;`,
    explanation: "Groups customer records by RFM tier to measure lifetime value and churn risk."
  },
  {
    id: "hr-overtime-attrition",
    title: "Overtime Impact on Employee Departures",
    category: "HR Analytics",
    description: "Examines voluntary attrition rates across overtime categories and job satisfaction scores.",
    targetTable: "workforce_hr",
    sql: `SELECT 
    overtime,
    job_satisfaction,
    COUNT(employee_id) AS total_staff,
    SUM(CASE WHEN attrition = 'Yes' THEN 1 ELSE 0 END) AS departures,
    ROUND(SUM(CASE WHEN attrition = 'Yes' THEN 100.0 ELSE 0 END) / COUNT(employee_id), 1) AS departure_rate_pct
FROM workforce_hr
GROUP BY overtime, job_satisfaction
ORDER BY overtime DESC, job_satisfaction ASC;`,
    explanation: "Highlights how overtime compounding with low job satisfaction multiplies departure rates."
  },
  {
    id: "ops-courier-sla",
    title: "Courier Partner Delivery SLA Scorecard",
    category: "Operations",
    description: "Ranks logistics carriers by on-time delivery percentage and average shipping cost.",
    targetTable: "ecommerce_operations",
    sql: `SELECT 
    courier_partner,
    COUNT(order_id) AS total_shipments,
    ROUND(AVG(shipping_cost), 2) AS avg_shipping_cost,
    ROUND(AVG(actual_delivery_days), 1) AS avg_actual_transit_days,
    SUM(CASE WHEN sla_met = 'Yes' THEN 1 ELSE 0 END) AS on_time_orders,
    ROUND(SUM(CASE WHEN sla_met = 'Yes' THEN 100.0 ELSE 0 END) / COUNT(order_id), 1) AS on_time_sla_rate_pct
FROM ecommerce_operations
WHERE order_status != 'Cancelled'
GROUP BY courier_partner
ORDER BY on_time_sla_rate_pct DESC;`,
    explanation: "Provides vendor performance comparison with conditional filtering of cancelled shipments."
  }
];

export interface ExcelFormulaExample {
  id: string;
  name: string;
  category: string;
  syntax: string;
  useCase: string;
  sampleInput: string;
  sampleOutput: string;
  explanation: string;
}

export const EXCEL_FORMULAS: ExcelFormulaExample[] = [
  {
    id: "xlookup-pricing",
    name: "XLOOKUP Price Extractor",
    category: "Lookup & Reference",
    syntax: `=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])`,
    useCase: "Dynamically retrieving product base unit price from a secondary Catalog worksheet without VLOOKUP column index vulnerabilities.",
    sampleInput: `Cell A2: "PROD-TECH-042", Product Catalog: Column A (IDs), Column D (Prices)`,
    sampleOutput: `$840.50`,
    explanation: "XLOOKUP provides exact matching by default, looks to the left or right, and handles missing keys gracefully with built-in default values."
  },
  {
    id: "sumifs-regional",
    name: "SUMIFS Multi-Condition Aggregation",
    category: "Math & Statistical",
    syntax: `=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2)`,
    useCase: "Aggregating total sales for 'Technology' products strictly within the 'East' region where discount is <= 0.10.",
    sampleInput: `Sum Range: Sales!J:J, Category: Sales!G:G ("Technology"), Region: Sales!F:F ("East"), Discount: Sales!L:L ("<=0.10")`,
    sampleOutput: `$48,920.00`,
    explanation: "Calculates precise multidimensional totals without needing complex array formulas."
  },
  {
    id: "if-iferror-margin",
    name: "IF + IFERROR Safe Margin Calculator",
    category: "Logical Functions",
    syntax: `=IFERROR(IF(Sales>0, Profit/Sales, 0), "Data Error")`,
    useCase: "Calculating profit margin percentage while preventing #DIV/0! errors for zero-sales promotional items.",
    sampleInput: `Sales: $0.00, Profit: -$24.50`,
    sampleOutput: `0.0% (Clean fallback without breaking dashboards)`,
    explanation: "Wraps mathematical calculations in robust error handlers to maintain pristine executive presentation sheets."
  },
  {
    id: "countifs-cohort",
    name: "COUNTIFS Cohort Frequency",
    category: "Statistical Functions",
    syntax: `=COUNTIFS(Customers!B:B, "2023-01", Customers!C:C, ">=3")`,
    useCase: "Counting the number of January cohort customers who completed 3 or more repeat purchases.",
    sampleInput: `Cohort Range: Customers!B:B ("2023-01"), Order Count: Customers!C:C (">=3")`,
    sampleOutput: `48 Customers`,
    explanation: "Enables fast cohort frequency matrix generation directly inside spreadsheet models."
  }
];
