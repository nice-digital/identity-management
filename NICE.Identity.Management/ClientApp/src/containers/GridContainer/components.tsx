import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: grid;
  width: 100%;
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & input{
	  max-width: 100px;
  }
`;

export const GridWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;