export interface ResourcesCreateDTO {
  title: string;
  description: string;
  courseList: string[];
  prerequisites: string[];
  expectedDuration: number;
  aproxTuitionInternational: number;
  aproxTuitionDomestic: number;
  academicCalendarUrl: string;
}

export interface ResourceUpdateDTO {
  description?: string;
  courseList?: string[];
  prerequisites?: string[];
  expectedDuration?: number;
  aproxTuitionInternational?: number;
  aproxTuitionDomestic?: number;
  academicCalendarUrl?: string;
}

export interface ResourceResponseDTO {
  id: number;
  title: string;
  description: string;
  courseList: string[];
  prerequisites: string[];
  expectedDuration: number;
  aproxTuitionInternational: number | null;
  aproxTuitionDomestic: number;
  academicCalendarUrl: string | null;
}
