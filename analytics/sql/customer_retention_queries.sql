-- ==========================================================
-- PROJECT 2: CUSTOMER RETENTION & COHORT ANALYTICS
-- Focus: RFM Segmentation, Cohort Repeat Rates, Churn Risks
-- ==========================================================

-- Query 1: RFM Customer Tier Distribution
SELECT 
    rfm_segment,
    COUNT(customer_id) AS total_customers,
    ROUND(AVG(total_spent), 2) AS avg_monetary_value,
    ROUND(AVG(order_count), 1) AS avg_frequency,
    ROUND(AVG(recency_days), 1) AS avg_recency_days,
    ROUND(SUM(total_spent), 2) AS total_segment_revenue,
    ROUND(SUM(is_churned) * 100.0 / COUNT(customer_id), 1) AS churn_rate_pct
FROM customer_retention
GROUP BY rfm_segment
ORDER BY total_segment_revenue DESC;

-- Query 2: Cohort Spending & Order Value Analysis
SELECT 
    cohort_month,
    COUNT(customer_id) AS cohort_size,
    ROUND(SUM(total_spent), 2) AS cohort_revenue,
    ROUND(AVG(avg_order_value), 2) AS mean_aov,
    ROUND(AVG(order_count), 2) AS repeat_purchase_rate
FROM customer_retention
GROUP BY cohort_month
ORDER BY cohort_month ASC;

-- Query 3: At-Risk & Churn Warning Identification
SELECT 
    customer_id,
    rfm_segment,
    total_spent,
    order_count,
    recency_days
FROM customer_retention
WHERE is_churned = 1 OR recency_days > 120
ORDER BY total_spent DESC
LIMIT 15;
