import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

export const PatientButton = styled.button`
  width: 20%;
  margin: 7px 0;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  color: #fff;
  background: #6813d4;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }

  .iconTheme {
    margin-right: 10px;
  }
`;

export const InputSeach = styled.input`
  width: 35%;
  background: #fff;
  border: 1px solid;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 10px;
  margin-left: 20px;
`;
