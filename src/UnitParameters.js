import React, { useContext } from "react";
import AdvancedField from "./AdvancedField";
import { CalculatorContext } from "./CalculatorContext";

function UnitParameters() {
  const context = useContext(CalculatorContext);
  return (
    <div className="card card-section mb-4">
      <div className="card-header-custom">
        <h3>Parâmetros por unidade</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col mb-3">
            <AdvancedField
              label="Pintura"
              type="number"
              className="form-control"
              value={context.tempoPintura}
              onChange={(e) => context.setTempoPintura(e.target.value)}
              placeholder="0"
              step="1"
              min="0"
              currencyPrefix="min"
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Acessórios</label>
            <div className="input-group">
              <span className="input-group-text">R$</span>
              <input
                type="number"
                className="form-control"
                value={context.custoAcessorios}
                onChange={(e) => context.setCustoAcessorios(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="col mb-3">
            <label className="form-label">Embalagem</label>
            <div className="input-group">
              <span className="input-group-text">R$</span>
              <input
                type="number"
                className="form-control"
                value={context.custoEmbalagem}
                onChange={(e) => context.setCustoEmbalagem(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitParameters;
