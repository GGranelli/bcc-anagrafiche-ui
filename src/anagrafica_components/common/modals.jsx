import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import TableModal from "./tableModal";

class Modals extends Component {
  state = {
    confirmed: false,
    disableCheckboxes: false,
  };

  items = [
    { path: "telefono", label: "Numero di telefono", flagged: false },
    { path: "email", label: "Email", flagged: false },
    { path: "p1", label: "Privacy 1", flagged: false },
    { path: "p2", label: "Privacy 2", flagged: false },
    { path: "p3", label: "Privacy 3", flagged: false },
    { path: "p4", label: "Privacy 4", flagged: false },
    { path: "p5", label: "Privacy 5", flagged: false },
    { path: "p6", label: "Privacy 6", flagged: false },
    { path: "firma", label: "Firma grafometrica", flagged: false },
  ];

  handleCheckbox = (item) => {
    this.items.find((m) => m.path === item.path).flagged =
      item.flagged === true ? false : true;
  };

  cleanItems = () => {
    this.items.forEach((m) => (m.flagged = false));
    this.changeConfirmedStatus(false);
    this.setState({ disableCheckboxes: false });

    if (this.props.success === true) {
    }
  };

  changeConfirmedStatus = (bool) => {
    this.setState({ confirmed: bool });
  };

  showConfirmationButton = () => {
    this.changeConfirmedStatus(true);
    //disable checkboxes
    this.setState({ disableCheckboxes: true });
  };

  renderConfirmButton(param) {
    switch (param) {
      case true:
        return (
          <button
            onClick={() => {
              this.props.confirmation(this.items);
              this.cleanItems();
            }}
            type="button"
            className="btn btn-confirm"
          >
            Conferma
          </button>
        );

      default:
        return (
          <button
            onClick={this.showConfirmationButton}
            type="button"
            className="btn btn-primary"
          >
            Conferma
          </button>
        );
    }
  }

  renderCloseButton(param) {
    switch (param) {
      case true:
        return (
          <button
            onClick={() => {
              this.changeConfirmedStatus(false);
              this.setState({ disableCheckboxes: false });
            }}
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Annulla
          </button>
        );

      default:
        return (
          <button
            onClick={() => {
              this.props.hideModal();
              this.cleanItems();
            }}
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        );
    }
  }

  render() {
    const { customer, show, confirmation, success } = this.props;
    const { confirmed, disableCheckboxes } = this.state;
    return (
      <Modal show={show}>
        <ModalHeader>
          <ModalTitle>{customer.nome}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <TableModal
            items={this.items}
            customer={customer}
            getToggleCheckbox={this.handleCheckbox}
            confirmation={confirmation}
            disableCheckboxes={disableCheckboxes}
            success={success}
          />
        </ModalBody>
        <ModalFooter>
          {confirmed && !success && (
            <div style={{ float: "left" }}>
              Sei sicuro di voler confermare l'anagrafica?
            </div>
          )}
          {!customer.confermato &&
            !success &&
            this.renderConfirmButton(confirmed)}
          {this.renderCloseButton(confirmed)}
        </ModalFooter>
      </Modal>
    );
  }
}

export default Modals;
