import React from "react";

import { Wrapper, GridWrapper, SearchWrapper } from "./components";
import { Grid } from "../../components/Grid";

export interface GridContainerProps {}
export interface GridContainerState {}

export class GridContainer extends React.Component<
  GridContainerProps,
  GridContainerState
> {
  constructor(props: GridContainerProps) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <SearchWrapper id="search-container">
          <input />
        </SearchWrapper>
        <GridWrapper id="grid-container">
          <Grid>placeholderF</Grid>
        </GridWrapper>
      </Wrapper>
    );
  }
}
