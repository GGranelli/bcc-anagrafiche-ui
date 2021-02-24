import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      {/* <label className="labelForm" htmlFor={name}>
        {label}
      </label> */}
      <input {...rest} name={name} id={name} className={"inputForm"} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
