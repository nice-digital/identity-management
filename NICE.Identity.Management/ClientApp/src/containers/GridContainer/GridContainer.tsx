import React from "react";
import { Wrapper, GridWrapper, SearchWrapper } from "./components";

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
          <p>placeholderF</p>
        </GridWrapper>
      </Wrapper>
    );
  }
}
