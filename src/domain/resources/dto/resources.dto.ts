export interface ResourcesCreateDTO {
  id: number;
  title: string;
  description: string;
  courseList: string[];
  prerequisites: string[];
  expectedDuration: number;
  aproxTuitionInternational: number;
  aproxTuitionDomestic: number;
  academicCalendarUrl: string;
}

export interface ResourcesUpdateDTO {
  description?: string;
  courseList?: string[];
  prerequisites?: string[];
  expectedDuration?: number;
  aproxTuitionInternational?: number;
  aproxTuitionDomestic?: number;
  academicCalendarUrl?: string;
}
