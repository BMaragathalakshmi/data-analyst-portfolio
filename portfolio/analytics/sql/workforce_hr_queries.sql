-- ==========================================================
-- PROJECT 3: WORKFORCE & HR ANALYTICS
-- Focus: Department Attrition, Overtime Impact, Salary Equity
-- ==========================================================

-- Query 1: Department Level Headcount, Average Salary & Attrition Rate
SELECT 
    department,
    COUNT(employee_id) AS total_employees,
    ROUND(AVG(monthly_income), 0) AS avg_monthly_salary,
    ROUND(AVG(tenure_years), 1) AS avg_tenure,
    SUM(CASE WHEN attrition = 'Yes' THEN 1 ELSE 0 END) AS attrition_count,
    ROUND(SUM(CASE WHEN attrition = 'Yes' THEN 1.0 ELSE 0 END) / COUNT(employee_id) * 100, 1) AS attrition_rate_pct
FROM workforce_hr
GROUP BY department
ORDER BY attrition_rate_pct DESC;

-- Query 2: Overtime vs Job Satisfaction vs Attrition Matrix
SELECT 
    overtime,
    job_satisfaction,
    COUNT(employee_id) AS total_staff,
    SUM(CASE WHEN attrition = 'Yes' THEN 1 ELSE 0 END) AS departures,
    ROUND(SUM(CASE WHEN attrition = 'Yes' THEN 100.0 ELSE 0 END) / COUNT(employee_id), 1) AS departure_rate_pct
FROM workforce_hr
GROUP BY overtime, job_satisfaction
ORDER BY overtime DESC, job_satisfaction ASC;
