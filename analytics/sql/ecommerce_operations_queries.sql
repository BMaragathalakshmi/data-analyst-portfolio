-- ==========================================================
-- PROJECT 4: E-COMMERCE OPERATIONS & LOGISTICS ANALYTICS
-- Focus: SLA Compliance, Delivery Delay Diagnostics, Courier Performance
-- ==========================================================

-- Query 1: Courier Partner Performance & On-Time Delivery Rate
SELECT 
    courier_partner,
    COUNT(order_id) AS total_shipments,
    ROUND(AVG(shipping_cost), 2) AS avg_shipping_cost,
    ROUND(AVG(actual_delivery_days), 1) AS avg_actual_transit_days,
    SUM(CASE WHEN sla_met = 'Yes' THEN 1 ELSE 0 END) AS on_time_orders,
    ROUND(SUM(CASE WHEN sla_met = 'Yes' THEN 100.0 ELSE 0 END) / COUNT(order_id), 1) AS on_time_sla_rate_pct
FROM ecommerce_operations
WHERE order_status != 'Cancelled'
GROUP BY courier_partner
ORDER BY on_time_sla_rate_pct DESC;

-- Query 2: Order Status & Cancellation Breakdown
SELECT 
    order_status,
    cancellation_reason,
    COUNT(order_id) AS order_volume,
    ROUND(COUNT(order_id) * 100.0 / (SELECT COUNT(*) FROM ecommerce_operations), 2) AS volume_pct
FROM ecommerce_operations
GROUP BY order_status, cancellation_reason
ORDER BY order_volume DESC;
