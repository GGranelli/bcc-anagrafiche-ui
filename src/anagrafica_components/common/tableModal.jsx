import React, { Component } from "react";
import _, { isBoolean, isEmpty } from "lodash";
import Checkbox from "./checkbox";

class TableModal extends Component {
  renderCell = (target, item) => {
    const value = _.get(target, item.path);
    if (isBoolean(value)) return (value && "Si") || "No";
    if (isEmpty(value)) return "Nessun dato";
    return value;
  };

  render() {
    const { nag, dataNascita, confermato, codice } = this.props.customer;
    const { items, customer, disableCheckboxes, success } = this.props;
    if (success === true) customer.confermato = true;

    switch (confermato || success) {
      case true:
        return (
          <div>
            <h5>ATTENZIONE.</h5>
            <p>
              L'anagrafica del cliente è stata confermata
              {success && " correttamente"}.
              <br />
              Il codice univoco assegnato è {codice}
            </p>
          </div>
        );

      case false:
        return (
          <table>
            <tbody>
              <tr>
                <td>NAG:</td>
                <td>{nag}</td>
              </tr>
              <tr className="blank_row" />
              <tr>
                <td>Data di nascita:</td>
                <td>{dataNascita}</td>
              </tr>
              <tr className="blank_row" />
              {items.map((item) => {
                return (
                  <tr key={"row-" + item.label}>
                    <td
                      className="table-modal-label"
                      key={item.label + "-" + nag}
                    >
                      {item.label + ":"}
                    </td>
                    <td
                      className="table-modal-value"
                      key={item.path + "-" + nag}
                    >
                      {this.renderCell(customer, item)}
                    </td>
                    <td
                      className="table-modal-checkbox"
                      key={"checkbox-" + nag}
                    >
                      <Checkbox
                        toggleCheckbox={() =>
                          this.props.getToggleCheckbox(item)
                        }
                        item={item}
                        disable={disableCheckboxes}
                      />
                    </td>
                  </tr>
                );
              })}
              <tr className="blank_row" />
            </tbody>
          </table>
        );
    }
  }
}

export default TableModal;
