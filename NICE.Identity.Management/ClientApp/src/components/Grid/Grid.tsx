import React, { Component } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { Wrapper } from "./components";
import { ColDef } from "ag-grid-community";

export interface columnType {
  headerName: string;
  field: string;
}

export interface rowType {
  make: string;
  model: string;
  price: string;
}

export interface GridProps {}
export interface GridState {
  columnDefs: Array<columnType>;
  rowData: Array<rowType>;
}

export class Grid extends Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props)
    this.state= {
      columnDefs: [
        {
          headerName: "Make",
          field: "make"
        },
        {
          headerName: "Model",
          field: "model"
        },
        {
          headerName: "Price",
          field: "price"
        }
      ],
      rowData: [
        {
          make: "Toyota",
          model: "Celica",
          price: 35000
        },
        {
          make: "Ford",
          model: "Mondeo",
          price: 32000
        },
        {
          make: "Porsche",
          model: "Boxter",
          price: 72000
        }
      ]
    };
  }


  render() {
    return (
      <Wrapper
        className="ag-theme-balham"
      >
        <AgGridReact columnDefs={this.state.columnDefs} rowData={{}} />
      </Wrapper>
    );
  }
}
