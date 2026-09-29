import os
import csv
import random
from datetime import datetime, timedelta

os.makedirs('analytics/datasets', exist_ok=True)
os.makedirs('analytics/sql', exist_ok=True)
os.makedirs('analytics/notebooks', exist_ok=True)
os.makedirs('public/data', exist_ok=True)

random.seed(42)

# 1. Generate Retail Sales Dataset (Raw with deliberate quality issues + Clean version)
regions = ['East', 'West', 'Central', 'South']
categories = {
    'Technology': ['Phones', 'Laptops', 'Accessories', 'Printers'],
    'Furniture': ['Chairs', 'Tables', 'Bookcases', 'Furnishings'],
    'Office Supplies': ['Paper', 'Binders', 'Storage', 'Art', 'Envelopes']
}
segments = ['Consumer', 'Corporate', 'Home Office']
ship_modes = ['Standard Class', 'Second Class', 'First Class', 'Same Day']

retail_clean = []
retail_raw = []

start_date = datetime(2023, 1, 1)

for i in range(1, 1001):
    order_id = f"ORD-{2023}-{10000 + i}"
    days_offset = random.randint(0, 365)
    order_date = start_date + timedelta(days=days_offset)
    ship_date = order_date + timedelta(days=random.randint(1, 6))
    
    region = random.choice(regions)
    cat = random.choice(list(categories.keys()))
    sub_cat = random.choice(categories[cat])
    seg = random.choice(segments)
    ship_mode = random.choice(ship_modes)
    cust_id = f"CUST-{random.randint(100, 350)}"
    cust_name = f"Customer {cust_id.split('-')[1]}"
    
    qty = random.randint(1, 10)
    base_price = {
        'Technology': random.uniform(150, 1200),
        'Furniture': random.uniform(80, 700),
        'Office Supplies': random.uniform(10, 120)
    }[cat]
    
    discount = round(random.choice([0.0, 0.0, 0.1, 0.15, 0.2, 0.3]), 2)
    sales = round(qty * base_price * (1 - discount), 2)
    profit_margin = random.uniform(0.08, 0.35) if discount < 0.25 else random.uniform(-0.15, 0.05)
    profit = round(sales * profit_margin, 2)
    
    clean_row = {
        'order_id': order_id,
        'order_date': order_date.strftime('%Y-%m-%d'),
        'ship_date': ship_date.strftime('%Y-%m-%d'),
        'customer_id': cust_id,
        'customer_name': cust_name,
        'segment': seg,
        'region': region,
        'category': cat,
        'sub_category': sub_cat,
        'sales': sales,
        'quantity': qty,
        'discount': discount,
        'profit': profit,
        'ship_mode': ship_mode
    }
    retail_clean.append(clean_row)
    
    # Create raw version with realistic dirty data (missing values, inconsistent cases, malformed dates, trailing spaces)
    raw_row = dict(clean_row)
    if i % 35 == 0:
        raw_row['profit'] = ''  # missing profit
    if i % 45 == 0:
        raw_row['region'] = raw_row['region'].lower() + ' ' # case & whitespace
    if i % 50 == 0:
        raw_row['order_date'] = order_date.strftime('%m/%d/%Y') # inconsistent date format
    if i % 60 == 0:
        raw_row['discount'] = str(discount * 100) + '%' # percentage string instead of float
    if i % 80 == 0:
        retail_raw.append(raw_row) # duplicate row
    retail_raw.append(raw_row)

# Write Retail Sales CSVs
for path, data in [
    ('analytics/datasets/retail_sales_clean.csv', retail_clean),
    ('public/data/retail_sales_clean.csv', retail_clean),
    ('analytics/datasets/retail_sales_raw.csv', retail_raw),
    ('public/data/retail_sales_raw.csv', retail_raw)
]:
    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=retail_clean[0].keys())
        writer.writeheader()
        writer.writerows(data)

print(f"Generated Retail Sales: {len(retail_clean)} clean rows, {len(retail_raw)} raw rows.")

# 2. Customer Retention Dataset
cust_retention = []
cohort_months = ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06']
for c_id in range(1001, 1501):
    cohort = random.choice(cohort_months)
    order_count = random.choices([1, 2, 3, 4, 5, 8, 12], weights=[45, 25, 12, 8, 5, 3, 2])[0]
    total_spent = round(sum([random.uniform(30, 250) for _ in range(order_count)]), 2)
    recency_days = random.randint(3, 180)
    is_churned = 1 if recency_days > 90 and order_count < 3 else 0
    rfm_segment = 'Champions' if (recency_days < 30 and order_count >= 4) else \
                  'Loyal Customers' if (order_count >= 3) else \
                  'At Risk' if (recency_days > 60 and order_count >= 2) else \
                  'Hibernating' if (recency_days > 90) else 'Recent New'
    
    cust_retention.append({
        'customer_id': f"CR-{c_id}",
        'cohort_month': cohort,
        'order_count': order_count,
        'total_spent': total_spent,
        'avg_order_value': round(total_spent / order_count, 2),
        'recency_days': recency_days,
        'rfm_segment': rfm_segment,
        'is_churned': is_churned
    })

for path in ['analytics/datasets/customer_retention.csv', 'public/data/customer_retention.csv']:
    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=cust_retention[0].keys())
        writer.writeheader()
        writer.writerows(cust_retention)

# 3. Workforce & HR Analytics Dataset
hr_data = []
departments = ['Engineering', 'Sales', 'Marketing', 'Human Resources', 'Finance', 'Operations']
roles = {
    'Engineering': ['Software Engineer', 'Data Engineer', 'QA Specialist'],
    'Sales': ['Sales Executive', 'Account Manager', 'Sales Representative'],
    'Marketing': ['Content Specialist', 'Growth Lead', 'SEO Analyst'],
    'Human Resources': ['HR Generalist', 'Recruiter', 'Talent Lead'],
    'Finance': ['Financial Analyst', 'Accountant', 'Compliance Officer'],
    'Operations': ['Logistics Coordinator', 'Operations Manager', 'Procurement Officer']
}
for emp_id in range(101, 601):
    dept = random.choice(departments)
    role = random.choice(roles[dept])
    age = random.randint(22, 58)
    tenure_years = round(min(age - 21, random.uniform(0.5, 15)), 1)
    satisfaction = random.randint(1, 5)
    monthly_income = int({
        'Engineering': random.uniform(4500, 9500),
        'Sales': random.uniform(3500, 8000),
        'Marketing': random.uniform(3800, 7500),
        'Human Resources': random.uniform(3400, 6800),
        'Finance': random.uniform(4200, 8500),
        'Operations': random.uniform(3600, 7000)
    }[dept] + (tenure_years * 280))
    overtime = random.choice(['Yes', 'No'])
    attrition = 'Yes' if (satisfaction <= 2 and overtime == 'Yes' and random.random() < 0.55) or (satisfaction == 1 and random.random() < 0.7) else 'No'
    
    hr_data.append({
        'employee_id': f"EMP-{emp_id}",
        'department': dept,
        'job_role': role,
        'age': age,
        'tenure_years': tenure_years,
        'monthly_income': monthly_income,
        'job_satisfaction': satisfaction,
        'overtime': overtime,
        'attrition': attrition
    })

for path in ['analytics/datasets/workforce_hr.csv', 'public/data/workforce_hr.csv']:
    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=hr_data[0].keys())
        writer.writeheader()
        writer.writerows(hr_data)

# 4. E-Commerce Operations Analytics Dataset
ops_data = []
couriers = ['Express Logistics', 'FastTrack Cargo', 'SpeedyDelivery', 'MetroPostal']
statuses = ['Delivered', 'Delivered', 'Delivered', 'Delayed', 'Cancelled', 'Returned']
for o_id in range(5001, 6001):
    courier = random.choice(couriers)
    status = random.choice(statuses)
    promised_days = random.randint(2, 5)
    actual_days = promised_days + random.randint(-1, 4) if status in ['Delivered', 'Delayed'] else 0
    sla_met = 'Yes' if (status == 'Delivered' and actual_days <= promised_days) else 'No'
    shipping_cost = round(random.uniform(8.5, 34.0), 2)
    cancellation_reason = 'None' if status != 'Cancelled' else random.choice(['Customer Request', 'Address Not Found', 'Payment Failure', 'Stock Issue'])
    
    ops_data.append({
        'order_id': f"OPS-{o_id}",
        'courier_partner': courier,
        'promised_delivery_days': promised_days,
        'actual_delivery_days': actual_days,
        'sla_met': sla_met,
        'order_status': status,
        'shipping_cost': shipping_cost,
        'cancellation_reason': cancellation_reason
    })

for path in ['analytics/datasets/ecommerce_operations.csv', 'public/data/ecommerce_operations.csv']:
    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=ops_data[0].keys())
        writer.writeheader()
        writer.writerows(ops_data)

print("All 4 flagship datasets created successfully!")
