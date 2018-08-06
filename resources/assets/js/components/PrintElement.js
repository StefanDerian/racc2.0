import React from "react";
import ReactToPrint from "react-to-print";

class PrintElement extends React.Component {
  render() {
    return (
      <table>
        {this.props.printdata}
      </table>
    );
  }
}

export default PrintElement
