import React, { useContext } from "react";
import AdvancedField from "./AdvancedField";
import { CalculatorContext } from "./CalculatorContext";

function BatchProduction() {
  const context = useContext(CalculatorContext);
  return (
    <div className="card card-section mb-4">
      <div className="card-header-custom">
        <h3>Produção em lote</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col mb-3">
            <AdvancedField
              label="Total de unidades"
              type="number"
              className="form-control"
              value={context.totalDeUnidades}
              onChange={(e) => {
                if (
                  parseFloat(e.target.value) >=
                  parseFloat(context.unidadesPorPlaca)
                ) {
                  context.setTotalDeUnidades(e.target.value);
                } else {
                  context.setTotalDeUnidades(context.unidadesPorPlaca);
                }
              }}
              placeholder="0"
              step="1"
              min={context.unidadesPorPlaca}
            />
          </div>
          <div className="col mb-3">
            <AdvancedField
              label="Unidades por placa"
              type="number"
              className="form-control"
              value={context.unidadesPorPlaca}
              onChange={(e) => {
                context.setUnidadesPorPlaca(e.target.value);
                if (
                  parseFloat(context.totalDeUnidades) <
                  parseFloat(e.target.value)
                ) {
                  context.setTotalDeUnidades(e.target.value);
                }
              }}
              placeholder="0"
              step="1"
              min="1"
            />
          </div>
          <div className="col mb-3">
            <AdvancedField
              label="Modelagem"
              type="number"
              className="form-control"
              value={context.tempoModelagem}
              onChange={(e) => context.setTempoModelagem(e.target.value)}
              placeholder="0"
              step="1"
              min="0"
              currencyPrefix="min"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BatchProduction;
