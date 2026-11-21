export interface ReportFormData {
  studentName: string;
  rollNo: string;
  projectName: string;
  guideName: string;
  guideDesignation?: string;
  hodName: string;
  directorName: string;
  collegeName: string;
  departmentName: string;
  academicYear: string;
  githubLink: string;
  isNoLink: boolean;
  domain: string;
  projectDescription?: string;
  certificateImage: string; // Base64 image data URL (MANDATORY)
}

export interface SubSection {
  number: string;
  title: string;
  content: string[];
  table?: {
    caption: string;
    headers: string[];
    rows: (string | number)[][];
  };
  codeListing?: {
    caption: string;
    language: string;
    code: string;
  };
  figure?: {
    caption: string;
    diagramType?: 'architecture' | 'erd' | 'flow' | 'sequence';
    description: string;
    imageSrc?: string;
  };
}

export interface Chapter {
  id: number;
  title: string;
  subsections: SubSection[];
}

export interface ReportItemRef {
  number: string;
  title: string;
  pageNo: number | string;
}

export interface GeneratedReport {
  formData: ReportFormData;
  generatedDate: string;
  abstract: string;
  acknowledgement: string;
  declaration: string;
  certificateText: string;
  chapters: Chapter[];
  listOfFigures: ReportItemRef[];
  listOfTables: ReportItemRef[];
}
