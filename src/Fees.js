import React, { useContext } from "react";
import AdvancedField from "./AdvancedField";
import { CalculatorContext } from "./CalculatorContext";

const MARKETPLACES = {
  semarketplace: { nome: "Sem Marketplace", taxa: 0, cartao: 10 },
  shopee: { nome: "Shopee", taxa: 14, cartao: 0 },
  shopee_frete: { nome: "Shopee Frete Grátis", taxa: 20, cartao: 0 },
  mercado_livre_classico: {
    nome: "Mercado Livre Clássico",
    taxa: 14,
    cartao: 0,
  },
  mercado_livre_premium: {
    nome: "Mercado Livre Premium",
    taxa: 19.5,
    cartao: 0,
  },
  personalizado: { nome: "Personalizado", taxa: null, cartao: 0 },
};

function Fees({ costs }) {
  const context = useContext(CalculatorContext);

  const handleMudarMarketplace = (novoMarketplace) => {
    context.setMarketplaceSelecionado(novoMarketplace);
    if (
      novoMarketplace !== "personalizado" &&
      MARKETPLACES[novoMarketplace].taxa !== null
    ) {
      context.setTaxaMarketplace(MARKETPLACES[novoMarketplace].taxa);
      context.setTaxaCartaoCredito(MARKETPLACES[novoMarketplace].cartao);
    }
  };

  return (
    <div className="card card-section">
      <div className="card-header-custom">
        <h3>Taxas</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col mb-3">
            <AdvancedField
              label="Impostos"
              type="number"
              className="form-control"
              value={context.impostos}
              onChange={(e) => context.setImpostos(e.target.value)}
              placeholder="0"
              step="0.1"
              min="0"
              currencyPrefix="%"
            />
          </div>
          <div className="col mb-3">
            <AdvancedField
              label="Cartão de Crédito"
              type="number"
              className="form-control"
              value={context.taxaCartaoCredito}
              onChange={(e) => context.setTaxaCartaoCredito(e.target.value)}
              placeholder="0"
              step="0.1"
              min="0"
              currencyPrefix="%"
            />
          </div>
          <div className="col mb-3">
            <AdvancedField
              label="Frete"
              type="number"
              className="form-control"
              value={context.frete}
              onChange={(e) => context.setFrete(e.target.value)}
              placeholder="0.00"
              step="0.1"
              min="0"
              currencyPrefix="R$"
            />
          </div>
        </div>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Marketplace</label>
            <select
              className="form-control"
              value={context.marketplaceSelecionado}
              onChange={(e) => handleMudarMarketplace(e.target.value)}
            >
              {Object.entries(MARKETPLACES).map(([chave, marketplace]) => (
                <option key={chave} value={chave}>
                  {marketplace.nome}
                  {marketplace.taxa !== null && ` - ${marketplace.taxa}%`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <AdvancedField
              label="Taxa do Marketplace"
              type="number"
              className="form-control"
              value={context.taxaMarketplace}
              onChange={(e) => context.setTaxaMarketplace(e.target.value)}
              placeholder="0"
              step="0.1"
              min="0"
              currencyPrefix="%"
              readOnly={context.marketplaceSelecionado !== "personalizado"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fees;
