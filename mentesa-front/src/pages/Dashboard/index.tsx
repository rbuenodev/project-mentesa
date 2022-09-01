import { useEffect } from "react";
import CardInfo from "../../components/CardsInfo";
import { Content, Container } from "./style";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Content>
        <CardInfo description="Sessões Agendadas (dia)" value="5" />
        <CardInfo description="Sessões Agendadas (mês)" value="15" />
        <CardInfo description="Sessões canceladas (mês)" value="1" />
        <CardInfo description="Total de pacientes cadastrados" value="1545" />
        <CardInfo description="Total de sessões (individuais)" value="4" />
        <CardInfo description="Total de sessões (duplas)" value="2" />
        <CardInfo description="Total de sessões (grupo)" value="3" />
      </Content>
    </Container>
  );
};

export default Dashboard;
