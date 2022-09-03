import api from "../api";
import {
  IProfessionalId,
  IProfessionalIdAndPatient,
} from "../Profissional/dtos/IProfessional";
import { SessionDto, SessionPKsDto } from "../Session/dtos/Session.dto";

export const TOKEN_KEY = "@menteSa-Token";

export async function fetchSessionList(
  dto: IProfessionalId
): Promise<SessionDto[]> {
  const { id } = dto;
  const url = `${id}/sessions`;
  const { data } = await api.get(url);

  return data;
}

export async function fetchSessionById({
  professionalId,
  sessionId,
}: SessionPKsDto): Promise<SessionDto> {
  const url = `${professionalId}/session/${sessionId}`;
  const { data } = await api.get(url);
  return data;
}

export async function fetchDeleteSession({
  professionalId,
  sessionId,
}: SessionPKsDto): Promise<any> {
  const url = `${professionalId}/sessions/${sessionId}`;
  const { data } = await api.delete(url);
  return data;
}

export async function fetchAddSession({
  id,
  professional,
  patient,
  appointmentDate,
  status,
  topic,
  appointmentType,
  sessionType,
  createdAt,
}: SessionDto): Promise<SessionDto> {
  const params = {
    professional,
    patient,
    appointmentDate,
    status,
    topic,
    appointmentType,
    sessionType,
    createdAt,
  };

  const url = `${professional}/sessions`;
  const { data } = await api.post(url, params);
  return data;
}

export async function fetchEditSession({
  professional,
  patient,
  appointmentDate,
  status,
  topic,
  appointmentType,
  sessionType,
  createdAt,
}: SessionDto): Promise<SessionDto> {
  const params = {
    professional,
    patient,
    appointmentDate,
    status,
    topic,
    appointmentType,
    sessionType,
    createdAt,
  };

  const url = `${professional}/sessions`;
  const { data } = await api.put(url, params);
  return data;
}
