import React, { ReactNode } from "react";
import { Container } from "./style";

interface BaseLayoutProps {
  children?: ReactNode;
}
const Content: React.FC<BaseLayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Content;
