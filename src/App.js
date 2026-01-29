import React, { useContext } from "react";
import "./App.css";
import AdvancedSettings from "./AdvancedSettings";
import BatchProduction from "./BatchProduction";
import PrintingPlateParameters from "./PrintingPlateParameters";
import UnitParameters from "./UnitParameters";
import Fees from "./Fees";
import SuggestedPrices from "./SuggestedPrices";
import CostBreakdown from "./CostBreakdown";
import { CalculatorContext, CalculatorProvider } from "./CalculatorContext";

// Preços dos filamentos por kg
const MATERIAIS = {
  pla: { nome: "PLA", preco: 100 },
  pla_especial: { nome: "PLA Especial", preco: 120 },
  petg: { nome: "PETG", preco: 100 },
  abs: { nome: "ABS", preco: 70 },
  personalizado: { nome: "Personalizado", preco: null },
};

// Taxas dos marketplaces
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

function AppContent() {
  const context = useContext(CalculatorContext);

  // Calcular custos
  const calculateCosts = () => {
    const material = parseFloat(context.quantidadeMaterial) || 0;
    const precoPorGrama = (parseFloat(context.precoMaterial) || 0) / 1000;
    const acessorios = parseFloat(context.custoAcessorios) || 0;
    const embalagem = parseFloat(context.custoEmbalagem) || 0;
    const duracaoHoras =
      (parseFloat(context.duracaoImpressaoHoras) || 0) +
      (parseFloat(context.duracaoImpressaoMinutos) || 0) / 60;

    const depreciacao =
      parseFloat(context.precoImpressora) /
      parseFloat(context.vidaUtilImpressora);
    const taxaManutencaoHora = context.custoManutencaoMensal / (30 * 24);

    const depreciacaoResina =
      parseFloat(context.precoImpressoraResina) /
      parseFloat(context.vidaUtilImpressoraResina);
    const taxaManutencaoHoraResina =
      context.custoManutencaoMensalResina / (30 * 24);

    const depreciacaoLavaCura =
      parseFloat(context.precoLavaCura) / parseFloat(context.vidaUtilLavaCura);
    const taxaManutencaoHoraLavaCura =
      context.custoManutencaoMensalLavaCura / (30 * 24);

    const isResina = context.tipoImpressao === "resina";

    // Usar valores corretos de depreciação e manutenção baseado no tipo de impressão
    const depreciacaoEquipamento = isResina ? depreciacaoResina : depreciacao;

    const taxaManutencaoHoraEquipamento = isResina
      ? taxaManutencaoHoraResina
      : taxaManutencaoHora;

    const unidadesPlaca = parseFloat(context.unidadesPorPlaca) || 1;
    const unidadesTotal = parseFloat(context.totalDeUnidades) || 1;

    const custoDeMaterial = (material * precoPorGrama) / unidadesPlaca;

    // Custo de energia varia de acordo com o tipo de impressora
    const consumoEletricoAtivo = isResina
      ? parseFloat(context.consumoEletricoImpressoraResina) || 0
      : parseFloat(context.consumoEletricoImpressora) || 0;

    const usoLavaCuraHoras = isResina ? context.duracaoUsoLavaCura / 60 : 0;

    const custoEnergiaLavaCura =
      usoLavaCuraHoras *
      (((parseFloat(context.custoEletricidadeHora) || 0) *
        (parseFloat(context.consumoEletricoLavaCura) || 0)) /
        1000);

    const custoDeEnergia =
      (duracaoHoras *
        (((parseFloat(context.custoEletricidadeHora) || 0) *
          consumoEletricoAtivo) /
          1000) +
        custoEnergiaLavaCura) /
      unidadesPlaca;

    const custoDepreciacao =
      (duracaoHoras * depreciacaoEquipamento +
        usoLavaCuraHoras * depreciacaoLavaCura) /
      unidadesPlaca;
    const custoManutencao =
      (duracaoHoras * taxaManutencaoHoraEquipamento +
        usoLavaCuraHoras * taxaManutencaoHoraLavaCura) /
      unidadesPlaca;

    // Adicionar custo de materiais descartáveis para resina
    const custoDescartaveisResina = isResina
      ? parseFloat(context.custoMateriaisDescartaveisResina) || 0
      : 0;

    const tempoDeMaodeObraHoras =
      ((parseFloat(context.tempoDeTrabalhoAdicional) || 0) / 60 +
        (parseFloat(context.tempoPreparacaoMinutos) || 0) / 60 +
        (parseFloat(context.tempoFinalizacaoMinutos) || 0) / 60) /
      unidadesPlaca;

    const custoMaoDeObra =
      ((parseFloat(context.custoMaoDeObraHora) || 0) * tempoDeMaodeObraHoras) /
      (1 - (parseFloat(context.taxaFalhas) || 0) / 100);

    const tempoDeModelagemHoras =
      (parseFloat(context.tempoModelagem) || 0) / 60 / unidadesTotal;
    const custoModelagem =
      (parseFloat(context.custoModelagemHora) || 0) * tempoDeModelagemHoras;

    const tempoDePinturaHoras = (parseFloat(context.tempoPintura) || 0) / 60;
    const custoPintura =
      (parseFloat(context.custoPinturaHora) || 0) * tempoDePinturaHoras;

    const cmv =
      custoDeMaterial +
      custoDeEnergia +
      custoDepreciacao +
      custoManutencao +
      custoDescartaveisResina +
      acessorios +
      embalagem;

    const cmvFalhas = cmv / (1 - (parseFloat(context.taxaFalhas) || 0) / 100);
    const falhas = cmvFalhas - cmv;

    const custoServicos =
      custoModelagem +
      custoPintura +
      custoMaoDeObra +
      parseFloat(context.frete || 0) / unidadesTotal;

    const custoTotal = cmvFalhas + custoServicos;

    const taxas =
      (parseFloat(context.impostos) || 0) / 100 +
      (parseFloat(context.taxaCartaoCredito) || 0) / 100 +
      (parseFloat(context.taxaMarketplace) || 0) / 100;

    // Função helper para calcular um tier de preço
    const calculateTier = (markupValue) => {
      const price =
        (cmvFalhas * (markupValue / 100 + 1) + custoServicos) / (1 - taxas);
      const profit = price - custoTotal - price * taxas;
      const profitPercentage = (profit / price) * 100;
      return {
        price,
        profit,
        profitPercentage,
        batchPrice: price * unidadesTotal,
        batchProfit: profit * unidadesTotal,
      };
    };

    // Calcular tiers pré-definidos
    const competitivo = calculateTier(100);
    const padrao = calculateTier(130);
    const premium = calculateTier(160);
    const luxo = calculateTier(200);
    const personalizado = calculateTier(parseFloat(context.markup) || 0);

    // Impostos sobre o preço personalizado
    const impostosSobrePreco =
      personalizado.price * ((parseFloat(context.impostos) || 0) / 100);
    const taxaCartaoCreditoSobrePreco =
      personalizado.price *
      ((parseFloat(context.taxaCartaoCredito) || 0) / 100);
    const taxaMarketplaceSobrePreco =
      personalizado.price * ((parseFloat(context.taxaMarketplace) || 0) / 100);

    return {
      depreciacao,
      taxaManutencaoHora,

      depreciacaoLavaCura,
      taxaManutencaoHoraLavaCura,

      depreciacaoResina,
      taxaManutencaoHoraResina,

      custoDeMaterial,
      custoDeEnergia,
      custoDepreciacao,
      custoManutencao,
      custoMaoDeObra,
      falhas,
      custoModelagem,
      custoPintura,
      custoTotal,

      precoTiers: {
        competitivo,
        padrao,
        premium,
        luxo,
        personalizado,
      },

      impostosSobrePreco,
      taxaCartaoCreditoSobrePreco,
      taxaMarketplaceSobrePreco,

      custoDescartaveisResina,
    };
  };

  const costs = calculateCosts();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="container-fluid">
          <h1 className="app-title">Calculadora de Custos de Impressão 3D</h1>
        </div>
      </header>

      <div className="container-fluid mt-4">
        <div className="row">
          <AdvancedSettings costs={costs} />
        </div>
        <div className="row">
          {/* Left Column - Inputs */}
          <div className="col-lg-5">
            <BatchProduction costs={costs} />

            <PrintingPlateParameters costs={costs} />

            <UnitParameters costs={costs} />

            <Fees costs={costs} />
          </div>

          {/* Right Column - Results */}
          <div className="col-lg-7">
            {/* Suggested Prices */}
            <SuggestedPrices costs={costs} />

            {/* Cost Breakdown */}
            <CostBreakdown costs={costs} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <CalculatorProvider>
      <AppContent />
    </CalculatorProvider>
  );
}

export default App;
