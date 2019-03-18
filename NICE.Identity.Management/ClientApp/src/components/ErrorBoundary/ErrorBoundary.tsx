import React from "react"

export class Boundary extends React.Component {
  state = { hasError: false }

  componentDidCatch(error: Error, info: any) {
    this.setState({ hasError: true })
    //   logErrorToMyService(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong with this component</h1>
    }
    return this.props.children
  }
}

export default Boundary;
