import styled from "styled-components";

export const Container = styled.div`
  grid-area: CT;
  color: #aaaaaa;
  background: #efefef;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #666666;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #666666;
  }
`;
