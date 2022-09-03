import { ReactNode } from "react";
import { Header } from "./style";

interface BaseLayoutProps {
  children?: ReactNode;
}
const CustomHeader: React.FC<BaseLayoutProps> = ({ children }) => {
  return <Header>{children}</Header>;
};

export default CustomHeader;
