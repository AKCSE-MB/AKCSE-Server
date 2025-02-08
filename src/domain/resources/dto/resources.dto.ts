export interface ResourcesCreateDTO {
  title: string;
  description: string;
  academicCalendarUrl: string;
}

export interface ResourceUpdateDTO {
  description?: string;
  academicCalendarUrl?: string;
}

export interface ResourceResponseDTO {
  id: number;
  title: string;
  description: string;
  academicCalendarUrl: string | null;
}
