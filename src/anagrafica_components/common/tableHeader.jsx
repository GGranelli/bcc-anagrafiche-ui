import React, { Component } from "react";

class tableHeader extends Component {
  render() {
    return (
      <thead>
        <tr className="tr-customer-table">
          {this.props.columns.map((column) => (
            <th className="th-customer-table" key={column.path || column.key}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default tableHeader;
