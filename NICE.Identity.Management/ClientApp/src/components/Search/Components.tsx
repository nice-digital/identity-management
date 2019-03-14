import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

export const Container: React.ComponentType<any> = styled(Paper)`
margin: 1rem;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 80%;
`;

export const Input: React.ComponentType<any> = styled(InputBase)`
  margin-left: 8;
  flex: 1;
`;

export const Action: React.ComponentType<any> = styled(IconButton)`
  padding: 10
`;
