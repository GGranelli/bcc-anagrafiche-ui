import React, { Component } from "react";
import _ from "lodash";
import CustomerSearchForm from "./CustomerSearchForm";
import { getBranches } from "../services/branchService";
import {
  getCustomers,
  customerMarkAsEdited,
} from "../services/customerService";
import CustomerSearchTable from "./CustomerSearchTable";
import Modals from "./common/modals";
import Pagination from "./common/pagination";
import { paginate } from "./common/paginate";

class CustomerSearch extends Component {
  state = {
    branches: [],
    customers: [],
    currentPage: 1,
    pageSize: 10,
    tableIsHidden: true,
    customer: {},
    customerToRefresh: "",
    modal: false,
    modalSuccess: false,
    errors: {},
  };

  async populateBranches() {
    const { data: branches } = await getBranches();
    this.setState({ branches });
  }

  async componentDidMount() {
    await this.populateBranches();
  }

  async getCustomersFromSearch(data) {
    const { branch, nag, customerName, birthDate } = data;
    let birthDateString = "" + birthDate;
    if (birthDateString !== "") {
      birthDateString = birthDateString.replace(/-/g, "/");
    }

    const { data: customers } = await getCustomers(
      branch,
      nag,
      customerName,
      birthDateString
    );

    this.setState({ customers });
  }

  handleDetails = async (customer) => {
    await this.setState({ customer: customer });

    if (this.state.customer.id > 0) this.setState({ modal: true });
  };

  handleSearch = async (data) => {
    this.getCustomersFromSearch(data);

    //visualizzo il component del risultato della ricerca;
    this.setState({ tableIsHidden: false });
  };

  handleClose = () => {
    this.setState({ modal: false });
    this.setState({ modalSuccess: false });
  };

  handleConfirmed = async (items) => {
    const { id } = this.state.customer;
    const array = [{ path: "id", label: "", flagged: id }, ...items];
    //chiamata backend
    try {
      await customerMarkAsEdited(array);
      this.showModalSuccess();
      this.refreshCostumerSearchTable();
    } catch (ex) {
      //visualizzo errore nel salvataggio
    }
  };

  showModalSuccess() {
    this.setState({ modalSuccess: true });
  }

  refreshCostumerSearchTable() {
    this.setState({ customerToRefresh: this.state.customer.id });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPageData = () => {
    const { pageSize, currentPage, customers: allCustomers } = this.state;

    const sorted = _.orderBy(allCustomers, "nome", "asc");

    const filtered = paginate(sorted, currentPage, pageSize);

    return { totalCount: allCustomers.length, data: filtered };
  };

  render() {
    const {
      branches,
      currentPage,
      pageSize,
      tableIsHidden,
      customer,
      customerToRefresh,
      modal,
      modalSuccess,
    } = this.state;

    const { totalCount, data: customers } = this.getPageData();

    return (
      <div id="container">
        <Modals
          customer={customer}
          show={modal}
          hideModal={this.handleClose}
          confirmation={this.handleConfirmed}
          success={modalSuccess}
        />
        <CustomerSearchForm
          onSearchClick={this.handleSearch}
          branches={branches}
        />
        <div className="div-customer-table">
          {!tableIsHidden &&
            ((customers.length > 0 && (
              <React.Fragment>
                <CustomerSearchTable
                  refresh={customerToRefresh}
                  customers={customers}
                  onDetailsClick={this.handleDetails}
                />
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </React.Fragment>
            )) || <p>Nessuna corrispondenza trovata</p>)}
        </div>
      </div>
    );
  }
}

export default CustomerSearch;
