import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Container, Input, Action } from "./Components";

const styles = {
  root: {},
  input: {},
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

export const Search = (props: any) => {
  const classes = styles;

  return (
    <Container elevation={1}>
      <Input placeholder="Search..." />
      <Action aria-label="Search">
        <SearchIcon />
      </Action>
    </Container>
  );
};

// export const Search = () => withStyles(styles)(CustomizedInputBase)
