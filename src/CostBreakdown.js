import React, { useContext, useState } from "react";
import { CalculatorContext } from "./CalculatorContext";

function CostBreakdown({ costs }) {
  const context = useContext(CalculatorContext);
  const isResina = context.tipoImpressao === "resina";

  // collapsed by default
  const [collapsed, setCollapsed] = useState(true);

  // derive direct cost (total minus fees) for summary
  const custoDireto = costs.custoTotal - costs.custoTaxas;

  return (
    <div className="card card-section mb-2">
      <div
        className="card-header-custom"
        style={{ cursor: "pointer" }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <h3>
          Custos
          <span style={{ marginLeft: 8 }}>{collapsed ? "+" : "–"}</span>
        </h3>
      </div>
      <div className="card-body">
        {/* summary section with destaque */}
        <div className="cost-summary mb-2 row">
          <div class="col-md-4 mb-1">
            <div className="summary-item direct">
              <span className="label">Custo Direto:</span>
              <span className="value">R${custoDireto.toFixed(2)}</span>
            </div>
          </div>
          <div class="col-md-4 mb-1">
            <div className="summary-item taxas">
              <span className="label">Taxas:</span>
              <span className="value">R${costs.custoTaxas.toFixed(2)}</span>
            </div>
          </div>
          <div class="col-md-4 mb-1">
            <div className="summary-item total">
              <span className="label">Custo Total:</span>
              <span className="value">R${costs.custoTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {!collapsed && (
          <div className="cost-breakdown">
            {context.producaoEmLote && (
              <div
                className="cost-row"
                style={{
                  fontWeight: "600",
                  paddingBottom: "10px",
                  borderBottom: "2px solid #667eea",
                }}
              >
                <span>Item</span>
                <span className="cost-value">Por Unidade</span>
                <span className="cost-value">Total do Lote</span>
              </div>
            )}
            <div className="cost-row">
              <span>Custo do Material</span>
              <span className="cost-value">
                R${costs.custoDeMaterial.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R$
                  {(costs.custoDeMaterial * context.totalDeUnidades).toFixed(2)}
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Custo de Acessórios</span>
              <span className="cost-value">
                R${(parseFloat(context.custoAcessorios) || 0).toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R$
                  {(
                    (parseFloat(context.custoAcessorios) || 0) *
                    context.totalDeUnidades
                  ).toFixed(2)}
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Custo de Energia</span>
              <span className="cost-value">
                R${costs.custoDeEnergia.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R$
                  {(costs.custoDeEnergia * context.totalDeUnidades).toFixed(2)}
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Custo de Depreciação</span>
              <span className="cost-value">
                R${costs.custoDepreciacao.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R$
                  {(costs.custoDepreciacao * context.totalDeUnidades).toFixed(
                    2,
                  )}
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Custo de Manutenção</span>
              <span className="cost-value">
                R${costs.custoManutencao.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R$
                  {(costs.custoManutencao * context.totalDeUnidades).toFixed(2)}
                </span>
              )}
            </div>
            {isResina && (
              <div className="cost-row">
                <span>Custo de Descartáveis</span>
                <span className="cost-value">
                  R${costs.custoDescartaveisResina.toFixed(2)}
                </span>
                {context.producaoEmLote && (
                  <span className="cost-value">
                    R$
                    {(
                      costs.custoDescartaveisResina * context.totalDeUnidades
                    ).toFixed(2)}
                  </span>
                )}
              </div>
            )}
            <div className="cost-row">
              <span>Custo de Falhas</span>
              <span className="cost-value">R${costs.falhas.toFixed(2)}</span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R${(costs.falhas * context.totalDeUnidades).toFixed(2)}
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Custo de Embalagem</span>
              <span className="cost-value">
                R${(parseFloat(context.custoEmbalagem) || 0).toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R$
                  {(
                    (parseFloat(context.custoEmbalagem) || 0) *
                    context.totalDeUnidades
                  ).toFixed(2)}
                </span>
              )}
            </div>
            <div className="cost-row mb-2">
              <strong>
                <span>Custo de Insumos</span>
              </strong>
              <span className="cost-value">
                <strong>R${costs.custoInsumos.toFixed(2)}</strong>
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  <strong>
                    R$
                    {(costs.custoInsumos * context.totalDeUnidades).toFixed(2)}
                  </strong>
                </span>
              )}
            </div>

            <div className="cost-row">
              <span>Custo de Mão de Obra</span>
              <span className="cost-value">
                R${costs.custoMaoDeObra.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R$
                  {(costs.custoMaoDeObra * context.totalDeUnidades).toFixed(2)}
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Custo de Modelagem</span>
              <span className="cost-value">
                R${costs.custoModelagem.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R$
                  {(costs.custoModelagem * context.totalDeUnidades).toFixed(2)}
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Custo de Pintura</span>
              <span className="cost-value">
                R${costs.custoPintura.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R${(costs.custoPintura * context.totalDeUnidades).toFixed(2)}
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Custo de Frete</span>
              <span className="cost-value">
                R${(parseFloat(context.frete) || 0).toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  R$
                  {(
                    (parseFloat(context.frete) || 0) * context.totalDeUnidades
                  ).toFixed(2)}
                </span>
              )}
            </div>
            <div className="cost-row mb-2">
              <strong>
                <span>Custo de Servicos</span>
              </strong>
              <span className="cost-value">
                <strong>R${costs.custoServicos.toFixed(2)}</strong>
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  <strong>
                    R$
                    {(costs.custoServicos * context.totalDeUnidades).toFixed(2)}
                  </strong>
                </span>
              )}
            </div>

            <div className="cost-row">
              <span>Contribuição para Despesas Fixas</span>
              <span className="cost-value">
                R${costs.contribuicaoDespesasFixasSobrePreco.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  <strong>
                    R$
                    {(
                      costs.contribuicaoDespesasFixasSobrePreco *
                      context.totalDeUnidades
                    ).toFixed(2)}
                  </strong>
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Impostos</span>
              <span className="cost-value">
                R${costs.impostosSobrePreco.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  <strong>
                    R$
                    {(
                      costs.impostosSobrePreco * context.totalDeUnidades
                    ).toFixed(2)}
                  </strong>
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Cartão de Crédito</span>
              <span className="cost-value">
                R${costs.taxaCartaoCreditoSobrePreco.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  <strong>
                    R$
                    {(
                      costs.taxaCartaoCreditoSobrePreco *
                      context.totalDeUnidades
                    ).toFixed(2)}
                  </strong>
                </span>
              )}
            </div>
            <div className="cost-row">
              <span>Marketplace</span>
              <span className="cost-value">
                R${costs.taxaMarketplaceSobrePreco.toFixed(2)} + R$
                {context.taxaFixaMarketplace.toFixed(2)}
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  <strong>
                    R$
                    {(
                      costs.taxaMarketplaceSobrePreco * context.totalDeUnidades
                    ).toFixed(2)}{" "}
                    + R$
                    {(
                      context.taxaFixaMarketplace * context.totalDeUnidades
                    ).toFixed(2)}
                  </strong>
                </span>
              )}
            </div>
            <div className="cost-row mb-4">
              <strong>
                <span>Custo de Taxas</span>
              </strong>
              <span className="cost-value">
                <strong>R${costs.custoTaxas.toFixed(2)}</strong>
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  <strong>
                    R${(costs.custoTaxas * context.totalDeUnidades).toFixed(2)}
                  </strong>
                </span>
              )}
            </div>
            <div className="cost-row mb-2">
              <strong>
                <span>Custo Total</span>
              </strong>
              <span className="cost-value">
                <strong>R${costs.custoTotal.toFixed(2)}</strong>
              </span>
              {context.producaoEmLote && (
                <span className="cost-value">
                  <strong>
                    R${(costs.custoTotal * context.totalDeUnidades).toFixed(2)}
                  </strong>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CostBreakdown;
