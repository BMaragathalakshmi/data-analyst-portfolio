export type SkillCategory = 
  | 'Data Cleaning'
  | 'SQL'
  | 'Python'
  | 'Excel'
  | 'Power BI'
  | 'Data Analysis'
  | 'Data Visualization'
  | 'Business Insights'
  | 'HTML & CSS'
  | 'C Programming';

export type SkillLevel = 'Learning' | 'Practicing' | 'Project Experience';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  description: string;
  tools: string[];
  proofProjectSlug?: string;
  keyConcepts: string[];
}

export type PipelineStageId = 
  | 'raw-dataset'
  | 'data-quality-audit'
  | 'data-cleaning'
  | 'sql-analysis'
  | 'python-eda'
  | 'excel-analysis'
  | 'power-bi-dashboard'
  | 'business-insights';

export interface PipelineStage {
  id: PipelineStageId;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  toolsUsed: string[];
  metrics?: { label: string; value: string; delta?: string; status?: 'normal' | 'good' | 'warning' | 'critical' }[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
    explanation: string;
  };
  tablePreview?: {
    columns: string[];
    rows: (string | number)[][];
    totalCount?: number;
  };
  chartData?: any;
  chartType?: 'bar' | 'line' | 'pie' | 'composed' | 'radar';
  insights?: string[];
  artifacts?: { name: string; type: string; downloadUrl: string; size: string }[];
}

export interface ProjectData {
  slug: string;
  title: string;
  shortDescription: string;
  businessDomain: string;
  datasetSource: {
    name: string;
    license: string;
    recordCount: number;
    columnCount: number;
    url?: string;
  };
  heroStats: { label: string; value: string; sub: string }[];
  problemStatement: string;
  solutionOverview: string;
  keyFindings: string[];
  recommendations: string[];
  limitations: string[];
  stages: PipelineStage[];
}

export interface DataQualityIssue {
  type: 'missing' | 'duplicate' | 'type_mismatch' | 'outlier' | 'format_error';
  column: string;
  count: number;
  percentage: number;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface CleaningLogEntry {
  timestamp: string;
  operation: string;
  affectedColumn?: string;
  rowsAffected: number;
  reason: string;
}
