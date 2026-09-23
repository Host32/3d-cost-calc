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
const SHOPEE_FAIXAS = [
  { ate: 79.99, taxa: 20, fixo: 4.5 },
  { ate: 99.99, taxa: 14, fixo: 16 },
  { ate: 199.99, taxa: 14, fixo: 20 },
  { ate: 499.99, taxa: 14, fixo: 26 },
  { ate: Infinity, taxa: 14, fixo: 26 },
];

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

    const custoInsumosSemFalhas =
      custoDeMaterial +
      custoDeEnergia +
      custoDepreciacao +
      custoManutencao +
      custoDescartaveisResina +
      acessorios +
      embalagem;

    const custoInsumos =
      custoInsumosSemFalhas / (1 - (parseFloat(context.taxaFalhas) || 0) / 100);
    const falhas = custoInsumos - custoInsumosSemFalhas;

    const custoServicos =
      custoModelagem +
      custoPintura +
      custoMaoDeObra +
      parseFloat(context.frete || 0) / unidadesTotal;

    const custoDireto = custoInsumos + custoServicos;

    const taxasSemMarketplace =
    (parseFloat(context.impostos) || 0) / 100 +
    (parseFloat(context.taxaCartaoCredito) || 0) / 100 +
    (parseFloat(context.contribuicaoDespesasFixas) || 0) / 100;

    // Função helper para calcular um tier de preço
    const calculateTier = (markupValue) => {
  const precoBase =
    custoInsumos * (markupValue / 100 + 1) + custoServicos;

  let taxaMarketplacePercentual =
    parseFloat(context.taxaMarketplace) || 0;
  let taxasFixasAplicadas =
    parseFloat(context.taxaFixaMarketplace) || 0;
  let taxasAplicadas =
    taxasSemMarketplace + taxaMarketplacePercentual / 100;

  if (context.marketplaceSelecionado === "shopee") {
    const faixaShopee =
      SHOPEE_FAIXAS.find((faixa) => {
        const totalTaxas =
          taxasSemMarketplace + faixa.taxa / 100;
        const precoCalculado =
          (precoBase + faixa.fixo) / (1 - totalTaxas);
        const precoArredondado =
          Math.round((precoCalculado + Number.EPSILON) * 100) / 100;

        return precoArredondado <= faixa.ate;
      }) || SHOPEE_FAIXAS[SHOPEE_FAIXAS.length - 1];

    taxaMarketplacePercentual = faixaShopee.taxa;
    taxasFixasAplicadas = faixaShopee.fixo;
    taxasAplicadas =
      taxasSemMarketplace + taxaMarketplacePercentual / 100;
  }

  const price =
    (precoBase + taxasFixasAplicadas) / (1 - taxasAplicadas);
  const profit =
    price - custoDireto - price * taxasAplicadas - taxasFixasAplicadas;
  const profitPercentage = (profit / price) * 100;
  const taxasVariaveis = taxasAplicadas * price;

  return {
    price,
    profit,
    profitPercentage,
    batchPrice: price * unidadesTotal,
    batchProfit: profit * unidadesTotal,
    taxasVariaveis,
    taxasFixas: taxasFixasAplicadas,
    taxasTotais: taxasVariaveis + taxasFixasAplicadas,
    taxaMarketplacePercentual,
  };
};

    // Calcular tiers pré-definidos
    const competitivo = calculateTier(100);
    const padrao = calculateTier(130);
    const premium = calculateTier(160);
    const luxo = calculateTier(200);
    const personalizado = calculateTier(parseFloat(context.markup) || 0);

    const custoTaxasVariaveis = personalizado.taxasVariaveis;
    const custoTaxasFixas = personalizado.taxasFixas;
    const custoTaxas = personalizado.taxasTotais;
    const custoTotal = custoDireto + custoTaxas;

    // Impostos sobre o preço personalizado
    const impostosSobrePreco =
      personalizado.price * ((parseFloat(context.impostos) || 0) / 100);
    const taxaCartaoCreditoSobrePreco =
      personalizado.price *
      ((parseFloat(context.taxaCartaoCredito) || 0) / 100);
    const taxaMarketplaceSobrePreco =
      personalizado.price *
     (personalizado.taxaMarketplacePercentual / 100);
    const contribuicaoDespesasFixasSobrePreco =
      personalizado.price *
      ((parseFloat(context.contribuicaoDespesasFixas) || 0) / 100);

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
      custoInsumos,
      custoServicos,
      custoDireto,
      custoTaxasVariaveis,
      custoTaxasFixas,
      custoTaxas,
      custoTotal,

      precoTiers: {
        competitivo,
        padrao,
        premium,
        luxo,
        personalizado,
      },

      contribuicaoDespesasFixasSobrePreco,
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
            <Fees costs={costs} />
            
            <BatchProduction costs={costs} />

            <PrintingPlateParameters costs={costs} />

            <UnitParameters costs={costs} />
          </div>

          {/* Right Column - Results */}
          <div className="col-lg-7">
            {/* Cost Breakdown */}
            <CostBreakdown costs={costs} />

            {/* Suggested Prices */}
            <SuggestedPrices costs={costs} />
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
