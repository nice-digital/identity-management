import React from "react"
import SearchIcon from "@material-ui/icons/Search"
import { Container, Input, Action } from "./Components"

export const Search = (props: any) => {
  const {placeholder } = props
  return (
    <Container elevation={1}>
      <Input placeholder={placeholder || 'Find a user account'} />
      <Action aria-label="Search">
        <SearchIcon />
      </Action>
    </Container>
  )
}