import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class CustomerSearchForm extends Form {
  state = {
    data: {
      branch: "",
      nag: "",
      customerName: "",
      birthDate: "",
    },
    branches: [],
    errors: {},
  };

  schema = {
    branch: Joi.string().required().label("Filiale"),
    nag: Joi.number().required().label("NAG"),
    customerName: Joi.string().label("Nome").allow(""),
    birthDate: Joi.date().label("Data di nascita").allow(""),
  };

  doSubmit = async () => {
    this.props.onSearchClick(this.state.data);
  };

  render() {
    return (
      <div className="divFormRicercaClienti">
        <form onSubmit={this.handleSubmit} className="formRicercaClienti">
          Filiale
          {this.renderSelect("branch", "Filiale", this.props.branches)}
          NAG
          {this.renderInput("nag", "NAG")}
          Nome
          {this.renderInput("customerName", "Nome")}
          Data di Nascita
          {this.renderInput(
            "birthDate",
            "Data di nascita",
            "string",
            "1900-01-01"
          )}
          {this.renderButton("Cerca")}
        </form>
      </div>
    );
  }
}

export default CustomerSearchForm;

// render() {
//   return (
//     <div className="divFormRicercaClienti">
//       <form onSubmit={this.handleSubmit} className="formRicercaClienti">
//         <table>
//           <tbody>
//             <tr className="trForm">
//               <td>
//                 Filiale
//                 <br />
//                 {this.renderSelect("branch", "Filiale", this.props.branches)}
//               </td>
//             </tr>
//             <tr className="trForm">
//               <td>
//                 NAG
//                 <br />
//                 {this.renderInput("nag", "NAG")}
//               </td>
//             </tr>
//             <tr className="trForm">
//               <td>
//                 Nome
//                 <br />
//                 {this.renderInput("customerName", "Nome")}
//               </td>
//             </tr>
//             <tr className="trForm">
//               <td>
//                 Data di Nascita
//                 <br />
//                 {this.renderInput(
//                   "birthDate",
//                   "Data di nascita",
//                   "string",
//                   "1900/01/01"
//                 )}
//               </td>
//             </tr>
//             <tr className="trForm">
//               <td>{this.renderButton("Cerca")}</td>
//             </tr>
//           </tbody>
//         </table>
//       </form>
//     </div>
//   );
// }
