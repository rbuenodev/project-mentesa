import api from "../api";
import {
  IProfessionalId,
  IProfessionalIdAndPatient,
} from "../Profissional/dtos/IProfessional";
import { PatientDto } from "./dtos/Patient.dto";

export const TOKEN_KEY = "@menteSa-Token";

export async function fetchPatientList(
  dto: IProfessionalId
): Promise<PatientDto[]> {
  const { id } = dto;
  const url = `${id}/patients`;
  const { data } = await api.get(url);

  return data;
}

export async function fetchPatientById({
  professionalId,
  patientId,
}: IProfessionalIdAndPatient): Promise<PatientDto> {
  const url = `${professionalId}/patients/${patientId}`;
  const { data } = await api.get(url);
  return data;
}

export async function fetchDeletePatient({
  professionalId,
  patientId,
}: IProfessionalIdAndPatient): Promise<any> {
  const url = `${professionalId}/patients/${patientId}`;
  const { data } = await api.delete(url);
  return data;
}

export async function fetchAddPatient({
  id,
  name,
  email,
  gender,
  createdAt,
  cfp,
  birthday,
  professionalId,
}: PatientDto): Promise<PatientDto> {
  const params = {
    id,
    name,
    email,
    gender,
    createdAt,
    cfp,
    birthday,
    professionalId,
  };

  const url = `${professionalId}/patients`;
  const { data } = await api.post(url, params);
  return data;
}

export async function fetchEditPatient({
  id,
  name,
  email,
  gender,
  createdAt,
  cfp,
  birthday,
  professionalId,
}: PatientDto): Promise<PatientDto> {
  const params = {
    id,
    name,
    email,
    gender,
    createdAt,
    cfp,
    birthday,
    professionalId,
  };

  const url = `${professionalId}/patients`;
  const { data } = await api.put(url, params);
  return data;
}
