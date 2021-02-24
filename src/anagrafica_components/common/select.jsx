import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      {/* <label htmlFor={name}>{label}</label> */}
      <select
        {...rest}
        name={name}
        id={name}
        className="form-control-sm selectForm"
      >
        <option value="" />
        {options.map((optionNode) => (
          <option key={optionNode.id} value={optionNode.id}>
            {optionNode.id + " - " + optionNode.nome}
          </option>
        ))}
      </select>
      {error && (
        <div className="alert alert-danger alert-select-size">{error}</div>
      )}
    </div>
  );
};

export default Select;
