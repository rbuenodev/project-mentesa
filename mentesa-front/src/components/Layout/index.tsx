import { ReactNode } from "react";
import Aside from "../Aside";
import Content from "../Content";
import { Grid } from "./style";

interface BaseLayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Grid>
      <Aside />
      <Content>{children}</Content>
    </Grid>
  );
};

export default Layout;
