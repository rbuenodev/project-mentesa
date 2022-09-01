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

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0;

  .menuItemLink {
    color: #fff;
    text-decoration: none;
    margin: 15px 0 15px 0;
    display: flex;
    align-items: center;
    transition: opacity 0.3s;
    padding-left: 22px;
    h4 {
      font-size: large;
      font-weight: bold;
      margin-left: 7px;
    }

    &:hover {
      opacity: 0.7;
    }
  }

  .menuItemLinkActived {
    display: flex;
    background: #fff;
    color: #6813d4;
    border-end-end-radius: 22px;
    border-start-end-radius: 22px;
    padding: 8px 8px 8px 22px;
    margin: 15px 10px 15px 0;
    text-decoration: none;
    align-items: center;
    transition: opacity 0.3s;
    h4 {
      font-size: large;
      font-weight: bold;
      margin-left: 7px;
    }

    &:hover {
      opacity: 0.7;
    }
  }
`;
