import { Container, Header, MenuContainer, UserContainer } from "./style";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import TodayIcon from "@mui/icons-material/Today";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getUserName } from "../../services/Auth/service";

const Aside: React.FC = () => {
  const { singOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    singOut();
    navigate("/");
  };

  const professionalName = `Dr. ${getUserName()}`;

  return (
    <Container>
      <Header>
        <h1>Mente Sã</h1>
        <p>Bem vindo(a),</p>
        <UserContainer>
          <h4>{professionalName}</h4>
          <button onClick={handleSignOut}>
            <LogoutIcon />
          </button>
        </UserContainer>
      </Header>
      <MenuContainer>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menuItemLinkActived" : "menuItemLink"
          }
        >
          <HomeIcon />
          <h4>DashBoard</h4>
        </NavLink>
        <NavLink
          to="/patients"
          className={({ isActive }) =>
            isActive ? "menuItemLinkActived" : "menuItemLink"
          }
        >
          <PersonIcon /> <h4>Pacientes</h4>
        </NavLink>
        <NavLink
          to="/sessions"
          className={({ isActive }) =>
            isActive ? "menuItemLinkActived" : "menuItemLink"
          }
        >
          <TodayIcon /> <h4>Sessões</h4>
        </NavLink>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
