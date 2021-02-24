import React, { Component } from "react";
import Table from "./common/table";
import customerImg from "../img/customer.png";
import modifyImg from "../img/confirm.jpg";

class CustomerSearchTable extends Component {
  state = {
    refresh: false,
  };
  columns = [
    { path: "cab", label: "Cab" },
    { path: "nag", label: "Nag" },
    { path: "nome", label: "Nome" },
    { path: "dataNascita", label: "Data di nascita" },
    { path: "telefono", label: "Telefono" },
    { path: "email", label: "Email" },
    {
      key: "dettagli",
      content: (customer) => (
        <button onClick={() => this.props.onDetailsClick(customer)}>
          <img
            className="img-details"
            src={this.getButtonImage(
              customer.confermato || customer.id === this.props.refresh
            )}
          />
        </button>
      ),
    },
  ];

  getButtonImage(bool) {
    let image = "";
    image += bool ? customerImg : modifyImg;
    return image;
  }

  render() {
    const { customers } = this.props;
    return <Table columns={this.columns} data={customers} />;
  }
}

export default CustomerSearchTable;
