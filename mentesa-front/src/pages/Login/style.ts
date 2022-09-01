import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  color: #aaaaaa;
  background: #efefef;

  a {
    color: #3b3b3c;
  }
  button {
    color: #fff;
    background: #6813d4;
    :hover {
      background: #b489ea;
    }
  }
`;

export const AccessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  text-align: center;
  color: #6813d4;
`;

export const Subtitle = styled.h2`
  color: #6813d4;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;
