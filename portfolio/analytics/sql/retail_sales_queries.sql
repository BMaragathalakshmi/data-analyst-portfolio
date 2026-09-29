-- ==========================================================
-- PROJECT 1: RETAIL SALES INTELLIGENCE
-- Dataset: Retail Sales 2023
-- Focus: Revenue, Profitability, Regional Trends, Window Functions
-- ==========================================================

-- Query 1: Executive KPI Summary & Margin Analysis
SELECT 
    COUNT(DISTINCT order_id) AS total_orders,
    COUNT(DISTINCT customer_id) AS unique_customers,
    ROUND(SUM(sales), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND((SUM(profit) / SUM(sales)) * 100, 2) AS profit_margin_pct,
    ROUND(AVG(sales), 2) AS avg_order_value
FROM retail_sales;

-- Query 2: Category & Sub-Category Performance with Profit Contribution
WITH CategorySales AS (
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
    ROUND((subcat_profit / subcat_sales) * 100, 2) AS margin_pct,
    ROUND((subcat_sales / SUM(subcat_sales) OVER (PARTITION BY category)) * 100, 2) AS share_within_category_pct
FROM CategorySales
ORDER BY category, subcat_sales DESC;

-- Query 3: Regional Sales & Running Cumulative Revenue (Window Function)
WITH MonthlyRegional AS (
    SELECT 
        region,
        STRFTIME('%Y-%m', order_date) AS order_month,
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
    ), 2) AS cumulative_revenue,
    ROUND(monthly_sales - LAG(monthly_sales, 1) OVER (
        PARTITION BY region 
        ORDER BY order_month
    ), 2) AS mom_growth
FROM MonthlyRegional
ORDER BY region, order_month;

-- Query 4: Customer Segmentation & Discount Sensitivity Analysis
SELECT 
    segment,
    CASE 
        WHEN discount = 0 THEN '0% No Discount'
        WHEN discount <= 0.15 THEN '1% - 15% Moderate'
        ELSE '> 15% Aggressive'
    END AS discount_tier,
    COUNT(order_id) AS order_count,
    ROUND(SUM(sales), 2) AS total_sales,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND((SUM(profit) / SUM(sales)) * 100, 2) AS margin_pct
FROM retail_sales
GROUP BY segment, discount_tier
ORDER BY segment, total_sales DESC;
