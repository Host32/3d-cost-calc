import React from "react";

function PriceOption({ title, markup, pricingData, onSelect, showBatch }) {
  const { price, profit, profitPercentage, batchPrice, batchProfit } =
    pricingData;
  const isProfitable = profit > 0;

  return (
    <div className="price-option" onClick={onSelect}>
      <h5>{title}</h5>
      <div className="price-value">R${price.toFixed(2)}</div>
      <small className="d-block opacity-75">Por Unidade</small>
      <small>{markup}% de markup</small>
      <div>
        <small className={`lucro ${!isProfitable ? "sem-lucro" : ""}`}>
          Lucro: R${profit.toFixed(2)} ({profitPercentage.toFixed(2)}%)
        </small>
      </div>
      {showBatch && (
        <div>
          <small className="d-block mt-2 opacity-85">
            Lote: R${batchPrice.toFixed(2)}
          </small>
          <small className={`lucro ${!isProfitable ? "sem-lucro" : ""}`}>
            Lucro Total: R${batchProfit.toFixed(2)}
          </small>
        </div>
      )}
    </div>
  );
}

export default PriceOption;
