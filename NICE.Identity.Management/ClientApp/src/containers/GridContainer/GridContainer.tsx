import React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { Wrapper, GridWrapper, SearchWrapper } from "./components";
import { Grid, ColumnDefinition } from "../../components/Grid";
import { Store } from "../../store";

export interface GridContainerProps<T> {
  store: Store<any>;
  columnDefs: Array<ColumnDefinition>;
}
export interface GridContainerState {}
@observer
export class GridContainer<T> extends React.Component<
  GridContainerProps<T>,
  GridContainerState
> {
  constructor(props: GridContainerProps<T>) {
    super(props);
    props.store.getList();
  }

  render() {
    const { columnDefs } = this.props;
    const rowData = toJS(this.props.store.data);
    return (
      <Wrapper>
        <SearchWrapper id="search-container">
          <input />
        </SearchWrapper>
        <GridWrapper id="grid-container">
          <Grid columnDefs={columnDefs} rowData={rowData} />
        </GridWrapper>
      </Wrapper>
    );
  }
}
