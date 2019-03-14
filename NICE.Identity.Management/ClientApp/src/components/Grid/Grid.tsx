import React, { Component } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { Wrapper } from "./Components";
import { ColDef } from "ag-grid-community";

export interface columnType {
  headerName: string;
  field: string;
}
export interface ColumnDefinition extends ColDef{}

export interface GridProps<T> {
  columnDefs: Array<ColDef>;
  rowData: Array<T>;
}
export interface GridState {}

export class Grid<T> extends Component<GridProps<T>, GridState> {
  constructor(props: GridProps<T>) {
    super(props);
  }

  render() {
    const { columnDefs, rowData } = this.props;
    return (
      <Wrapper className="ag-theme-material">
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </Wrapper>
    );
  }
}
