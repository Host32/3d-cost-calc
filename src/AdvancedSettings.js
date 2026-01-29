import React, { useContext } from "react";
import AdvancedField from "./AdvancedField";
import { CalculatorContext } from "./CalculatorContext";

function AdvancedSettings({ costs }) {
  const context = useContext(CalculatorContext);
  return (
    <div className="col-12 mb-4">
      <div className="card card-section">
        <button
          className="accordion-button collapsed"
          type="button"
          onClick={() => context.setMostrarAvancadas(!context.mostrarAvancadas)}
          aria-expanded={context.mostrarAvancadas}
        >
          ⚙️ Configurações Avançadas
        </button>
        {context.mostrarAvancadas && (
          <div className="card-body">
            <div className="advanced-grid mb-3">
              <AdvancedField
                label="Taxa de energia"
                value={context.custoEletricidadeHora}
                onChange={(e) =>
                  context.setCustoEletricidadeHora(e.target.value)
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="R$/Kwh"
              />
              <AdvancedField
                label="Taxa de falhas"
                value={context.taxaFalhas}
                onChange={(e) => context.setTaxaFalhas(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="%"
              />
              <AdvancedField
                label="Custo mão de obra"
                value={context.custoMaoDeObraHora}
                onChange={(e) => context.setCustoMaoDeObraHora(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="R$/h"
              />
              <AdvancedField
                label="Custo de modelagem"
                value={context.custoModelagemHora}
                onChange={(e) => context.setCustoModelagemHora(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="R$/h"
              />
              <AdvancedField
                label="Custo de pintura"
                value={context.custoPinturaHora}
                onChange={(e) => context.setCustoPinturaHora(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="R$/h"
              />
            </div>
            <h5 className="mb-1">Impressora de filamento</h5>
            <div className="advanced-grid">
              <AdvancedField
                label="Preço"
                value={context.precoImpressora}
                onChange={(e) => context.setPrecoImpressora(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix
              />

              <AdvancedField
                label="Vida Útil"
                value={context.vidaUtilImpressora}
                onChange={(e) => context.setVidaUtilImpressora(e.target.value)}
                placeholder="0"
                step="100"
                min="0"
                currencyPrefix="hrs"
              />

              <AdvancedField
                label="Depreciação"
                value={costs.depreciacao.toFixed(2)}
                placeholder="0"
                currencyPrefix="R$/hr"
                readOnly
              />

              <AdvancedField
                label="Manutenção Mensal"
                value={context.custoManutencaoMensal}
                onChange={(e) =>
                  context.setCustoManutencaoMensal(e.target.value)
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="R$/mês"
              />

              <AdvancedField
                label="Taxa de manutenção"
                value={costs.taxaManutencaoHora.toFixed(2)}
                placeholder="0"
                currencyPrefix="R$/hr"
                readOnly
              />

              <AdvancedField
                label="Consumo de energia"
                value={context.consumoEletricoImpressora}
                onChange={(e) =>
                  context.setConsumoEletricoImpressora(e.target.value)
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="w"
              />
            </div>

            <h5 className="mb-1 mt-4">Impressora de resina</h5>
            <div className="advanced-grid">
              <AdvancedField
                label="Preço"
                value={context.precoImpressoraResina}
                onChange={(e) =>
                  context.setPrecoImpressoraResina(e.target.value)
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix
              />

              <AdvancedField
                label="Vida Útil"
                value={context.vidaUtilImpressoraResina}
                onChange={(e) =>
                  context.setVidaUtilImpressoraResina(e.target.value)
                }
                placeholder="0"
                step="100"
                min="0"
                currencyPrefix="hrs"
              />

              <AdvancedField
                label="Depreciação"
                value={costs.depreciacaoResina.toFixed(2)}
                placeholder="0"
                currencyPrefix="R$/hr"
                readOnly
              />

              <AdvancedField
                label="Manutenção Mensal"
                value={context.custoManutencaoMensalResina}
                onChange={(e) =>
                  context.setCustoManutencaoMensalResina(e.target.value)
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="R$/mês"
              />

              <AdvancedField
                label="Taxa de manutenção"
                value={costs.taxaManutencaoHoraResina.toFixed(2)}
                placeholder="0"
                currencyPrefix="R$/hr"
                readOnly
              />

              <AdvancedField
                label="Consumo de energia"
                value={context.consumoEletricoImpressoraResina}
                onChange={(e) =>
                  context.setConsumoEletricoImpressoraResina(e.target.value)
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="w"
              />
            </div>

            <h5 className="mb-1 mt-4">Lava e Cura de resina</h5>
            <div className="advanced-grid">
              <AdvancedField
                label="Preço"
                value={context.precoLavaCura}
                onChange={(e) => context.setPrecoLavaCura(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix
              />

              <AdvancedField
                label="Vida Útil"
                value={context.vidaUtilLavaCura}
                onChange={(e) => context.setVidaUtilLavaCura(e.target.value)}
                placeholder="0"
                step="100"
                min="0"
                currencyPrefix="hrs"
              />

              <AdvancedField
                label="Depreciação"
                value={costs.depreciacaoLavaCura.toFixed(2)}
                placeholder="0"
                currencyPrefix="R$/hr"
                readOnly
              />

              <AdvancedField
                label="Manutenção Mensal"
                value={context.custoManutencaoMensalLavaCura}
                onChange={(e) =>
                  context.setCustoManutencaoMensalLavaCura(e.target.value)
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="R$/mês"
              />

              <AdvancedField
                label="Taxa de manutenção"
                value={costs.taxaManutencaoHoraLavaCura.toFixed(2)}
                placeholder="0"
                currencyPrefix="R$/hr"
                readOnly
              />

              <AdvancedField
                label="Duração de lavagem e cura"
                value={context.duracaoUsoLavaCura}
                onChange={(e) => context.setDuracaoUsolavaCura(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="min"
              />

              <AdvancedField
                label="Descartáveis por impressão"
                value={context.custoMateriaisDescartaveisResina}
                onChange={(e) =>
                  context.setCustoMateriaisDescartaveisResina(e.target.value)
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                currencyPrefix="R$"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvancedSettings;
