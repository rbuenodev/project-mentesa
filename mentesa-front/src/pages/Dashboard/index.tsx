import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import CardInfo from "../../components/CardsInfo";
import { getUserId } from "../../services/Auth/service";
import { PatientDto } from "../../services/Patient/dtos/Patient.dto";
import { usePatientList } from "../../services/Patient/hooks";
import { fetchPatientList } from "../../services/Patient/service";
import { SessionDto } from "../../services/Session/dtos/Session.dto";
import { fetchSessionList } from "../../services/Session/service";
import formatDate from "../../utils/formatDate";
import Sessions from "../Sessions";

import { Content, Container } from "./style";

const Dashboard: React.FC = () => {
  // const [totalPatients, setTotalPatients] = useState(0);
  const [sessions, setSessions] = useState([] as SessionDto[]);
  const [patients, setPatients] = useState([] as PatientDto[]);

  const fetchData = async () => {
    const sesssionsData = await fetchSessionList({ id: getUserId() });
    setSessions(sesssionsData);
    const patientsData = await fetchPatientList({ id: getUserId() });
    setPatients(patientsData);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const totalPatients = useMemo(() => {
    return patients.length;
  }, [patients]);

  const sessionCurrentDay = useMemo(() => {
    return sessions.filter((session) => {
      const date = new Date();
      const sessionDate = new Date(session.appointmentDate);
      if (date === sessionDate) return true;
    }).length;
  }, [sessions]);

  const sessionsAtCurrentMonth = useMemo(() => {
    return sessions.filter((session) => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const sessionDate = new Date(session.appointmentDate);
      const sessionYear = sessionDate.getFullYear();
      const sessionMonth = sessionDate.getMonth() + 1;

      if (
        year === sessionYear &&
        month === sessionMonth &&
        session.status == "Agendado"
      ) {
        return true;
      }
    }).length;
  }, [sessions]);

  const sessionsCanceldMonth = useMemo(() => {
    return sessions.filter((session) => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const sessionDate = new Date(session.appointmentDate);
      const sessionYear = sessionDate.getFullYear();
      const sessionMonth = sessionDate.getMonth() + 1;

      if (
        year === sessionYear &&
        month === sessionMonth &&
        session.status === "Cancelado"
      ) {
        return true;
      }
    }).length;
  }, [sessions]);

  const totalIndividualSession = useMemo(() => {
    return sessions.filter((session) => {
      session.sessionType.toLowerCase() === "Individual".toLowerCase();
    }).length;
  }, [sessions]);

  const totalCoupleSession = useMemo(() => {
    return sessions.filter((session) => {
      session.sessionType.toLowerCase() === "Dupla".toLowerCase();
    }).length;
  }, [sessions]);

  const totalGroupSession = useMemo(() => {
    return sessions.filter((session) => {
      session.sessionType.toLowerCase() === "Grupo".toLowerCase();
    }).length;
  }, [sessions]);

  return (
    <Container>
      <Content>
        <CardInfo
          description="Sessões Agendadas (dia)"
          value={sessionCurrentDay.toString()}
        />
        <CardInfo
          description="Sessões Agendadas (mês)"
          value={sessionsAtCurrentMonth.toString()}
        />
        <CardInfo
          description="Sessões canceladas (mês)"
          value={sessionsCanceldMonth.toString()}
        />
        <CardInfo
          description="Total de pacientes cadastrados"
          value={totalPatients.toString()}
        />
        <CardInfo
          description="Total de sessões (individuais)"
          value={totalIndividualSession.toString()}
        />
        <CardInfo
          description="Total de sessões (duplas)"
          value={totalCoupleSession.toString()}
        />
        <CardInfo
          description="Total de sessões (grupo)"
          value={totalGroupSession.toString()}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
