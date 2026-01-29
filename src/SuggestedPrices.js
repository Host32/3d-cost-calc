import React, { useContext } from "react";
import PriceOption from "./PriceOption";
import { CalculatorContext } from "./CalculatorContext";

function SuggestedPrices({ costs }) {
  const context = useContext(CalculatorContext);
  return (
    <div className="card card-section mb-4">
      <div className="card-header-custom">
        <h3>Preços Sugeridos</h3>
      </div>
      <div className="card-body">
        <div className="prices-grid">
          <PriceOption
            title="Competitivo"
            markup="100"
            pricingData={costs.precoTiers.competitivo}
            showBatch={context.producaoEmLote}
          />
          <PriceOption
            title="Padrão"
            markup="130"
            pricingData={costs.precoTiers.padrao}
            showBatch={context.producaoEmLote}
          />
          <PriceOption
            title="Premium"
            markup="150"
            pricingData={costs.precoTiers.premium}
            showBatch={context.producaoEmLote}
          />
          <PriceOption
            title="Luxo"
            markup="200"
            pricingData={costs.precoTiers.luxo}
            showBatch={context.producaoEmLote}
          />
        </div>

        <div className="mt-4 custom-price-section">
          <h5>Personalizado</h5>
          <div className="row align-items-end">
            <div className="col-md-6">
              <label className="form-label">Markup</label>
              <input
                type="range"
                className="form-range"
                min="80"
                max="200"
                value={context.markup}
                onChange={(e) => context.setMarkup(e.target.value)}
              />
              <small className="text-muted">{context.markup}%</small>
            </div>
            <div className="col-md-6">
              <div className="custom-price-display">
                <div>
                  <small>Preço:</small> R$
                  {costs.precoTiers.personalizado.price.toFixed(2)}
                </div>
                <div
                  className={`lucro-display ${costs.precoTiers.personalizado.profit <= 0 ? "sem-lucro" : ""}`}
                >
                  Lucro: R$
                  {costs.precoTiers.personalizado.profit.toFixed(2)} (
                  {costs.precoTiers.personalizado.profitPercentage.toFixed(2)}
                  %)
                </div>
                {context.producaoEmLote && (
                  <span>
                    <small className="d-block mt-2 opacity-85">
                      Lote: R$
                      {costs.precoTiers.personalizado.batchPrice.toFixed(2)}
                    </small>
                    <div
                      className={`lucro-display ${costs.precoTiers.personalizado.profit <= 0 ? "sem-lucro" : ""}`}
                    >
                      Lucro total: R$
                      {costs.precoTiers.personalizado.batchProfit.toFixed(2)}
                    </div>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestedPrices;
