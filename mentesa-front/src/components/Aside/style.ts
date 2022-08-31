import styled, { css } from "styled-components";

interface IMenuProps {
  isActive: boolean;
}

export const Container = styled.div`
  grid-area: AS;
  background: #6813d4;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  height: 100px;
  margin: 10px 22px;
  color: #fff;

  p {
    margin-top: 30px;
  }
  button {
    border-radius: 5px;
    align-items: center;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  color: #fff;
  align-items: center;
  margin-top: 10px;

  h4 {
    margin-right: 10px;
  }
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  margin: 50px 0 0 20px;
`;

export const MenuItemLink = styled.a<IMenuProps>`
  color: #fff;
  text-decoration: none;
  margin: 22px 0 0 0;
  display: flex;
  align-items: center;
  transition: opacity 0.3s;

  ${(props) =>
    props.isActive &&
    css`
      background: #fff;
      color: #6813d4;
      border-end-end-radius: 22px;
      border-start-end-radius: 22px;
      padding: 8px;
      margin-right: 10px;
    `}

  h4 {
    font-size: large;
    font-weight: bold;
    margin-left: 7px;
  }

  &:hover {
    opacity: 0.7;
  }
`;
