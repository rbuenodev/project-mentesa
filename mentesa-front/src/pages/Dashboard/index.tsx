import { useLayoutEffect, useState } from "react";
import CardInfo from "../../components/CardsInfo";
import { getUserId } from "../../services/Auth/service";
import { usePatientList } from "../../services/Patient/hooks";

import { Content, Container } from "./style";

const Dashboard: React.FC = () => {
  const [totalPatients, setTotalPatients] = useState(0);

  const { data } = usePatientList({ id: getUserId() });
  useLayoutEffect(() => {
    if (data) setTotalPatients(data.length);
  }, [data]);

  return (
    <Container>
      <Content>
        <CardInfo description="Sessões Agendadas (dia)" value="5" />
        <CardInfo description="Sessões Agendadas (mês)" value="15" />
        <CardInfo description="Sessões canceladas (mês)" value="1" />
        <CardInfo
          description="Total de pacientes cadastrados"
          value={totalPatients.toString()}
        />
        <CardInfo description="Total de sessões (individuais)" value="4" />
        <CardInfo description="Total de sessões (duplas)" value="2" />
        <CardInfo description="Total de sessões (grupo)" value="3" />
      </Content>
    </Container>
  );
};

export default Dashboard;
