import { SkillItem } from "@/lib/types";

export const SKILLS_DATA: SkillItem[] = [
  {
    name: "SQL & Relational Databases",
    category: "SQL",
    level: "Practicing",
    description: "Formulating multi-table joins, subqueries, Common Table Expressions (CTEs), window functions (ROW_NUMBER, DENSE_RANK, LAG, LEAD, SUM OVER), and aggregate group-by analytics in PostgreSQL and SQLite.",
    tools: ["PostgreSQL", "SQLite", "MySQL", "DBeaver"],
    proofProjectSlug: "retail-sales",
    keyConcepts: [
      "CTEs & Subqueries",
      "Window Functions & Partitioning",
      "Multi-Table Inner/Outer Joins",
      "CASE Statements & Aggregations",
      "Query Performance & Indexing Basics"
    ]
  },
  {
    name: "Python for Data Analysis",
    category: "Python",
    level: "Practicing",
    description: "Performing programmatic data ingestion, exploratory data analysis (EDA), data cleaning, statistical summaries, and exploratory charting with Pandas, NumPy, Matplotlib, and Seaborn.",
    tools: ["Python 3", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter"],
    proofProjectSlug: "retail-sales",
    keyConcepts: [
      "DataFrame Wrangling & Filtering",
      "Groupby & Aggregations",
      "Missing Value Imputation",
      "Correlation Analysis",
      "Data Type Casting & Regex"
    ]
  },
  {
    name: "Data Cleaning & Quality Audit",
    category: "Data Cleaning",
    level: "Project Experience",
    description: "Systematic auditing of dirty raw datasets: identifying duplicate records, handling missing values, standardizing dates into ISO-8601, outlier detection, and creating transparent audit logs.",
    tools: ["Pandas", "Power Query", "Excel", "Data Validation"],
    proofProjectSlug: "retail-sales",
    keyConcepts: [
      "Deduplication & Primary Key Verification",
      "Null Handling & Imputation Strategies",
      "Date & String Standardization",
      "Outlier Detection (IQR / Z-score)",
      "Before/After Quality Diff Logging"
    ]
  },
  {
    name: "Microsoft Excel & Modeling",
    category: "Excel",
    level: "Project Experience",
    description: "Advanced spreadsheet modeling using XLOOKUP, INDEX/MATCH, SUMIFS/COUNTIFS, nested IF/IFERROR logic, Pivot Tables with calculated fields, dynamic slicers, and conditional formatting.",
    tools: ["Microsoft Excel", "Power Query", "Pivot Tables"],
    proofProjectSlug: "customer-retention",
    keyConcepts: [
      "XLOOKUP & Dynamic Arrays",
      "SUMIFS / COUNTIFS / AVERAGEIFS",
      "Pivot Tables & Pivot Charts",
      "Data Validation & Dropdowns",
      "Conditional Formatting & Heatmaps"
    ]
  },
  {
    name: "Power BI & Business Intelligence",
    category: "Power BI",
    level: "Practicing",
    description: "Transforming cleaned dimensional data into interactive dashboards, calculating custom DAX measures (CALCULATE, DIVIDE, SAMEPERIODLASTYEAR), and creating cross-filtering visual canvases.",
    tools: ["Power BI Desktop", "Tableau", "DAX", "Power Query M", "Star Schema"],
    proofProjectSlug: "workforce-hr",
    keyConcepts: [
      "Star Schema Data Modeling",
      "DAX Measures & Calculated Columns",
      "Interactive Slicers & Cross-filtering",
      "KPI Cards & Visual Hierarchy",
      "Drill-down & Drill-through Pages"
    ]
  },
  {
    name: "Data Visualization & Storytelling",
    category: "Data Visualization",
    level: "Practicing",
    description: "Selecting the optimal visual representation (bar, scatter, line, cohort heatmaps, donut, waterfall) to communicate clear analytical conclusions to non-technical stakeholders.",
    tools: ["Power BI", "Recharts", "Matplotlib", "Seaborn"],
    proofProjectSlug: "ecommerce-operations",
    keyConcepts: [
      "Visual Hierarchy & Contrast",
      "Clutter Reduction & Direct Labeling",
      "Actionable Executive Dashboards",
      "Trend & Variance Identification"
    ]
  },
  {
    name: "Business Insights & Strategy",
    category: "Business Insights",
    level: "Learning",
    description: "Bridging raw analytical findings to executive strategy: formulating actionable recommendations, identifying margin leakages, and structuring root-cause analyses.",
    tools: ["Executive Summaries", "ROI Calculation", "Root Cause Analysis"],
    proofProjectSlug: "retail-sales",
    keyConcepts: [
      "Margin Leakage Identification",
      "Customer Segmentation Strategies",
      "Operational Bottleneck Diagnostics",
      "Clear Risk vs Benefit Framing"
    ]
  },
  {
    name: "Front-End Web Development",
    category: "HTML & CSS",
    level: "Learning",
    description: "Building responsive interfaces with semantic HTML, CSS layouts, and JavaScript interactions, including an online food-ordering front-end project.",
    tools: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    keyConcepts: [
      "Semantic Page Structure",
      "Flexbox & CSS Grid",
      "Responsive Media Queries",
      "Client-Side Interactions"
    ]
  },
  {
    name: "C & C++ Programming",
    category: "C Programming",
    level: "Learning",
    description: "Programming fundamentals in C and C++, including control flow, functions, arrays, debugging, and structured problem solving.",
    tools: ["C", "C++", "GCC", "VS Code"],
    keyConcepts: [
      "Data Types & Memory Allocation",
      "Control Flow & Loops",
      "Functions & Modular Code",
      "Arrays & String Manipulation"
    ]
  }
];
