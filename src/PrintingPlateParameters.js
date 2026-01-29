import React, { useContext } from "react";
import AdvancedField from "./AdvancedField";
import { CalculatorContext } from "./CalculatorContext";

const MATERIAIS = {
  pla: { nome: "PLA", preco: 100 },
  pla_especial: { nome: "PLA Especial", preco: 120 },
  petg: { nome: "PETG", preco: 100 },
  abs: { nome: "ABS", preco: 70 },
  personalizado: { nome: "Personalizado", preco: null },
};

const MATERIAIS_RESINA = {
  resina_padrao: { nome: "Resina Padrão", preco: 120 },
  resina_abs_like: { nome: "Resina ABS-Like", preco: 160 },
  personalizado: { nome: "Personalizado", preco: null },
};

function PrintingPlateParameters() {
  const context = useContext(CalculatorContext);

  const handleMudarTipoMaterial = (novoTipo) => {
    context.setTipoFilamento(novoTipo);
    const materiaisAtivos =
      context.tipoImpressao === "resina" ? MATERIAIS_RESINA : MATERIAIS;
    if (novoTipo !== "personalizado" && materiaisAtivos[novoTipo].preco) {
      context.setPrecoMaterial(materiaisAtivos[novoTipo].preco);
    }
  };

  const handleMudarTipoImpressao = (novoTipo) => {
    context.setTipoImpressao(novoTipo);
    // Resetar seleção de material para o primeiro da nova categoria
    const materiaisAtivos =
      novoTipo === "resina" ? MATERIAIS_RESINA : MATERIAIS;
    const primeiroMaterial = Object.keys(materiaisAtivos)[0];
    context.setTipoFilamento(primeiroMaterial);
    if (materiaisAtivos[primeiroMaterial].preco) {
      context.setPrecoMaterial(materiaisAtivos[primeiroMaterial].preco);
    }
    // Atualizar tempo de finalização padrão
    if (novoTipo === "resina") {
      context.setTempoPreparacaoMinutos("10");
      context.setTempoFinalizacaoMinutos("20");
    } else {
      context.setTempoPreparacaoMinutos("5");
      context.setTempoFinalizacaoMinutos("5");
    }
  };

  return (
    <div className="card card-section mb-4">
      <div className="card-header-custom">
        <h3>Parâmetros por placa de impressão</h3>
      </div>
      <div className="card-body">
        <div className="col mb-3">
          <label className="form-label">Tipo de Impressão</label>
          <select
            className="form-control"
            value={context.tipoImpressao}
            onChange={(e) => handleMudarTipoImpressao(e.target.value)}
          >
            <option value="filamento">Filamento</option>
            <option value="resina">Resina</option>
          </select>
        </div>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">
              {context.tipoImpressao === "resina" ? "Resina" : "Filamento"}
            </label>
            <select
              className="form-control"
              value={context.tipoFilamento}
              onChange={(e) => handleMudarTipoMaterial(e.target.value)}
            >
              {Object.entries(
                context.tipoImpressao === "resina"
                  ? MATERIAIS_RESINA
                  : MATERIAIS,
              ).map(([chave, filamento]) => (
                <option key={chave} value={chave}>
                  {filamento.nome}
                  {filamento.preco && ` - R$ ${filamento.preco}`}
                </option>
              ))}
            </select>
          </div>

          <div className="col mb-3">
            <label className="form-label">Custo</label>
            <div className="input-group">
              <span className="input-group-text">R$/Kg</span>
              <input
                type="number"
                className="form-control"
                value={context.precoMaterial}
                onChange={(e) => context.setPrecoMaterial(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                disabled={context.tipoFilamento !== "personalizado"}
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Peso Total</label>
            <div className="input-group">
              <span className="input-group-text">g</span>
              <input
                type="number"
                className="form-control"
                value={context.quantidadeMaterial}
                onChange={(e) => context.setQuantidadeMaterial(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          <div className="col">
            <label className="form-label">Duração da impressão</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={context.duracaoImpressaoHoras}
                onChange={(e) =>
                  context.setDuracaoImpressaoHoras(e.target.value)
                }
                placeholder="0"
                step="0.1"
                min="0"
              />
              <span className="input-group-text">h</span>
              <input
                type="number"
                className="form-control"
                value={context.duracaoImpressaoMinutos}
                onChange={(e) =>
                  context.setDuracaoImpressaoMinutos(e.target.value)
                }
                placeholder="0"
                step="1"
                min="0"
                max="59"
              />
              <span className="input-group-text">m</span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <AdvancedField
              label="Preparo (fatiar, trocar o material e iniciar)"
              type="number"
              className="form-control"
              value={context.tempoPreparacaoMinutos}
              onChange={(e) =>
                context.setTempoPreparacaoMinutos(e.target.value)
              }
              placeholder="0"
              step="1"
              min="0"
              currencyPrefix="min"
            />
          </div>
          <div className="col mb-3">
            <AdvancedField
              label="Finalização (remover impressão, remover suportes e embalar)"
              type="number"
              className="form-control"
              value={context.tempoFinalizacaoMinutos}
              onChange={(e) =>
                context.setTempoFinalizacaoMinutos(e.target.value)
              }
              placeholder="0"
              step="1"
              min="0"
              currencyPrefix="min"
            />
          </div>
        </div>
        <div className="col mb-3">
          <AdvancedField
            label="Trabalho adicional"
            type="number"
            className="form-control"
            value={context.tempoDeTrabalhoAdicional}
            onChange={(e) =>
              context.setTempoDeTrabalhoAdicional(e.target.value)
            }
            placeholder="0"
            step="1"
            min="0"
            currencyPrefix="min"
          />
        </div>
      </div>
    </div>
  );
}

export default PrintingPlateParameters;
