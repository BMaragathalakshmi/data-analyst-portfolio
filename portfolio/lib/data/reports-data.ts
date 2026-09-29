export interface InsightReport {
  id: string;
  projectSlug: string;
  title: string;
  executiveSummary: string;
  businessProblem: string;
  datasetDescription: string;
  cleaningMethodology: string;
  analyticalFindings: string[];
  recommendations: string[];
  limitations: string[];
  publishedDate: string;
  readTime: string;
  metrics: { label: string; value: string }[];
}

export const INSIGHT_REPORTS: InsightReport[] = [
  {
    id: "report-retail-sales",
    projectSlug: "retail-sales",
    title: "Project Report: Retail Sales & Discount Analysis",
    publishedDate: "Portfolio Project",
    readTime: "4 min read",
    executiveSummary: "This portfolio project analyzed 1,000 retail transactions from an open-source benchmark dataset to study how product discounting affects category profitability.",
    businessProblem: "Exploring why revenue growth does not always translate to higher profit margins, and evaluating whether deep discounting (>20%) erodes sub-category profitability.",
    datasetDescription: "Sample Global Superstore benchmark dataset comprising 1,012 raw rows across 14 transaction attributes including Order ID, Category, Sales, Discount, and Profit.",
    cleaningMethodology: "Audited for 12 duplicate records and 28 missing profit entries. Cleaned using Pandas by standardizing text, removing duplicate rows, and imputing missing profit values with sub-category medians.",
    analyticalFindings: [
      "Technology sub-categories had the highest average margins in this sample dataset.",
      "Furniture items sold with discounts higher than 20% resulted in negative net margins in the data.",
      "West and East regions showed higher average transaction values than Central and South regions."
    ],
    recommendations: [
      "Consider capping discounts at 15% on low-margin furniture categories.",
      "Establish automated data quality checks for raw order logs to ensure complete records."
    ],
    limitations: [
      "Sample dataset used for academic and portfolio practice; external factors not included."
    ],
    metrics: [
      { label: "Sample Records", value: "1,000" },
      { label: "Calculated Sales", value: "$418,920" },
      { label: "Overall Margin", value: "16.8%" }
    ]
  },
  {
    id: "report-customer-retention",
    projectSlug: "customer-retention",
    title: "Project Report: Customer Retention & RFM Study",
    publishedDate: "Portfolio Project",
    readTime: "4 min read",
    executiveSummary: "An exploratory analysis of 500 customer transaction records across 6 signup cohorts to practice calculating retention rates and RFM segments.",
    businessProblem: "Understanding how repeat purchasing frequency and transaction recency influence customer retention in an e-commerce context.",
    datasetDescription: "500 customer records detailing order counts, lifetime spend, recency days, and signup cohorts.",
    cleaningMethodology: "Validated data ranges, confirmed unique customer keys, and engineered RFM scoring brackets.",
    analyticalFindings: [
      "Customers making 3 or more purchases showed significantly higher ongoing activity rates.",
      "The Champions segment represented the highest contribution to total sample revenue.",
      "Recency beyond 90 days strongly correlated with account inactivity in the dataset."
    ],
    recommendations: [
      "Implement follow-up communication before customer recency exceeds 45-60 days.",
      "Focus onboarding initiatives on driving the second and third repeat purchases."
    ],
    limitations: [
      "500-customer sample dataset used for portfolio practice."
    ],
    metrics: [
      { label: "Sample Profiles", value: "500" },
      { label: "Repeat Rate", value: "48.6%" },
      { label: "Cohorts", value: "6 Months" }
    ]
  },
  {
    id: "report-workforce-hr",
    projectSlug: "workforce-hr",
    title: "Project Report: Workforce & Attrition Factors",
    publishedDate: "Portfolio Project",
    readTime: "4 min read",
    executiveSummary: "Analyzed 500 employee records from an open HR benchmark dataset to identify factors correlated with voluntary turnover.",
    businessProblem: "Investigating the statistical correlation between overtime hours, job satisfaction ratings, and employee departures.",
    datasetDescription: "500 employee records covering age, department, job role, monthly income, tenure, satisfaction score, overtime, and departure status.",
    cleaningMethodology: "Checked for null values and confirmed valid ranges for age, tenure, and compensation.",
    analyticalFindings: [
      "Employees working regular overtime in the sample had higher departure rates than non-overtime staff.",
      "Job satisfaction ratings of 1 or 2 coincided with higher departure rates in the dataset.",
      "Sales and Operations departments showed higher turnover rates compared to other departments in the sample."
    ],
    recommendations: [
      "Monitor overtime workloads regularly to support staff retention.",
      "Conduct periodic satisfaction surveys in departments with higher turnover."
    ],
    limitations: [
      "Open benchmark dataset; qualitative exit interview details were not included."
    ],
    metrics: [
      { label: "Sample Headcount", value: "500" },
      { label: "Sample Turnover", value: "14.2%" },
      { label: "Overtime Turnover", value: "28.6%" }
    ]
  },
  {
    id: "report-ecommerce-operations",
    projectSlug: "ecommerce-operations",
    title: "Project Report: E-Commerce Delivery SLA Analysis",
    publishedDate: "Portfolio Project",
    readTime: "4 min read",
    executiveSummary: "Evaluated 1,000 shipment dispatch logs across 4 logistics carriers to compare on-time SLA compliance and cancellation reasons.",
    businessProblem: "Comparing carrier transit durations and identifying the main recorded causes for order cancellations in the sample data.",
    datasetDescription: "1,000 logistics records detailing courier partner, promised delivery days, actual transit days, and order status.",
    cleaningMethodology: "Validated transit day calculations and normalized carrier names.",
    analyticalFindings: [
      "Express Logistics recorded the highest on-time delivery rate (92.4%) in the sample.",
      "SpeedyDelivery had lower SLA compliance (68.2%) with higher average transit delays.",
      "Payment gateway failures and address errors were the most common cancellation reasons recorded."
    ],
    recommendations: [
      "Allocate high-priority deliveries to carriers with higher historical on-time rates.",
      "Add address validation checks during order entry to reduce delivery failures."
    ],
    limitations: [
      "Weather disruption events were not captured in the benchmark logs."
    ],
    metrics: [
      { label: "Sample Dispatches", value: "1,000" },
      { label: "Average SLA Rate", value: "81.4%" },
      { label: "Top Carrier SLA", value: "92.4%" }
    ]
  }
];
