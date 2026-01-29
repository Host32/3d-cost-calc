import React from "react";

function AdvancedField({
  label,
  value,
  onChange,
  placeholder,
  step,
  min,
  currencyPrefix,
  readOnly,
}) {
  return (
    <div className="advanced-field">
      <label className="form-label">{label}</label>
      {currencyPrefix ? (
        <div className="input-group">
          <span className="input-group-text">
            {currencyPrefix === true ? "R$" : currencyPrefix}
          </span>
          <input
            readOnly={readOnly}
            disabled={readOnly}
            type="number"
            className="form-control"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            step={step}
            min={min}
          />
        </div>
      ) : (
        <input
          readOnly={readOnly}
          disabled={readOnly}
          type="number"
          className="form-control"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          step={step}
          min={min}
        />
      )}
    </div>
  );
}

export default AdvancedField;
