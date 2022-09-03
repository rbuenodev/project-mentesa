import { PatientDto } from "../../Patient/dtos/Patient.dto";
import { IProfessional } from "../../Profissional/dtos/IProfessional";

export interface SessionCreateDto {
  professional: string;
  patient: string;
  appointmentDate: string;
  status: string;
  topic: string;
  appointmentType: string;
  sessionType: string;
  createdAt: string;
}

export interface SessionDto {
  id: string;
  professional: IProfessional;
  patient: PatientDto;
  appointmentDate: string;
  status: string;
  topic: string;
  appointmentType: string;
  sessionType: string;
  createdAt: string;
}

export interface SessionPKsDto {
  professionalId: string;
  sessionId: string;
}
