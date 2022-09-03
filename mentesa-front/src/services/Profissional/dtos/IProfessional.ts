export interface IProfessionalId {
  id: string;
}

export interface IProfessionalIdAndPatient {
  professionalId: string;
  patientId: string;
}

export interface IProfessional {
  id: string;
  name: string;
  email: string;
  picture: string;
  crp: string;
  approach: string;
  contact: string;
  role: string;
}
