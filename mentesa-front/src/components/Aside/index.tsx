import {
  Container,
  Header,
  MenuContainer,
  MenuItemLink,
  UserContainer,
} from "./style";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import TodayIcon from "@mui/icons-material/Today";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";

const Aside: React.FC = () => {
  return (
    <Container>
      <Header>
        <h1>Mente Sã</h1>
        <p>Bem vindo(a),</p>
        <UserContainer>
          <h4>Dr. Estranho</h4>
          <button>
            <LogoutIcon />
          </button>
        </UserContainer>
      </Header>
      <MenuContainer>
        <MenuItemLink href="/" isActive={true}>
          <HomeIcon />
          <h4>DashBoard</h4>
        </MenuItemLink>
        <MenuItemLink href="/patients" isActive={false}>
          <PersonIcon /> <h4>Pacientes</h4>
        </MenuItemLink>
        <MenuItemLink href="/sessions" isActive={false}>
          <TodayIcon /> <h4>Sessões</h4>
        </MenuItemLink>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
