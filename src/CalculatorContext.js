import React, { createContext, useMemo, useState } from "react";

export const CalculatorContext = createContext();

export function CalculatorProvider({ children }) {
  // Entradas básicas
  const [tipoImpressao, setTipoImpressao] = useState("filamento");
  const [quantidadeMaterial, setQuantidadeMaterial] = useState("");
  const [tipoFilamento, setTipoFilamento] = useState("pla");
  const [precoMaterial, setPrecoMaterial] = useState(100);
  const [duracaoImpressaoHoras, setDuracaoImpressaoHoras] = useState("");
  const [duracaoImpressaoMinutos, setDuracaoImpressaoMinutos] = useState("");
  const [tempoModelagem, setTempoModelagem] = useState("");
  const [tempoPreparacaoMinutos, setTempoPreparacaoMinutos] = useState("5");
  const [tempoFinalizacaoMinutos, setTempoFinalizacaoMinutos] = useState("5");
  const [tempoPintura, setTempoPintura] = useState("");
  const [tempoDeTrabalhoAdicional, setTempoDeTrabalhoAdicional] = useState("");
  const [custoAcessorios, setCustoAcessorios] = useState("");
  const [custoEmbalagem, setCustoEmbalagem] = useState("");
  const [impostos, setImpostos] = useState("0");
  const [taxaCartaoCredito, setTaxaCartaoCredito] = useState("10");
  const [marketplaceSelecionado, setMarketplaceSelecionado] =
    useState("semarketplace");
  const [taxaMarketplace, setTaxaMarketplace] = useState(0);
  const [frete, setFrete] = useState("");
  const [unidadesPorPlaca, setUnidadesPorPlaca] = useState("1");
  const [totalDeUnidades, setTotalDeUnidades] = useState("1");

  // Configurações avançadas
  const [taxaFalhas, setTaxaFalhas] = useState("15");
  const [mostrarAvancadas, setMostrarAvancadas] = useState(false);
  const [precoImpressora, setPrecoImpressora] = useState("9000");
  const [vidaUtilImpressora, setVidaUtilImpressora] = useState("20000");
  const [custoManutencaoMensal, setCustoManutencaoMensal] = useState("400");
  const [custoEletricidadeHora, setCustoEletricidadeHora] = useState("1.2");
  const [consumoEletricoImpressora, setConsumoEletricoImpressora] =
    useState("400");

  // Impressora de resina
  const [precoImpressoraResina, setPrecoImpressoraResina] = useState("3500");
  const [vidaUtilImpressoraResina, setVidaUtilImpressoraResina] =
    useState("20000");
  const [custoManutencaoMensalResina, setCustoManutencaoMensalResina] =
    useState("400");
  const [consumoEletricoImpressoraResina, setConsumoEletricoImpressoraResina] =
    useState("100");

  // Lava e Cura de resina
  const [precoLavaCura, setPrecoLavaCura] = useState("1200");
  const [vidaUtilLavaCura, setVidaUtilLavaCura] = useState("20000");
  const [custoManutencaoMensalLavaCura, setCustoManutencaoMensalLavaCura] =
    useState("150");
  const [duracaoUsoLavaCura, setDuracaoUsoLavaCura] = useState("6");

  const [
    custoMateriaisDescartaveisResina,
    setCustomateriaisDescartaveisResina,
  ] = useState("0.5");

  const [custoMaoDeObraHora, setCustoMaoDeObraHora] = useState("15");
  const [custoModelagemHora, setCustoModelagemHora] = useState("30");
  const [custoPinturaHora, setCustoPinturaHora] = useState("100");

  // Seleção de margem
  const [markup, setMarkup] = useState(130);

  const producaoEmLote = useMemo(() => {
    return parseInt(totalDeUnidades) > 1;
  }, [totalDeUnidades]);

  const value = {
    // Entradas básicas
    tipoImpressao,
    setTipoImpressao,
    quantidadeMaterial,
    setQuantidadeMaterial,
    tipoFilamento,
    setTipoFilamento,
    precoMaterial,
    setPrecoMaterial,
    duracaoImpressaoHoras,
    setDuracaoImpressaoHoras,
    duracaoImpressaoMinutos,
    setDuracaoImpressaoMinutos,
    tempoModelagem,
    setTempoModelagem,
    tempoPreparacaoMinutos,
    setTempoPreparacaoMinutos,
    tempoFinalizacaoMinutos,
    setTempoFinalizacaoMinutos,
    tempoPintura,
    setTempoPintura,
    tempoDeTrabalhoAdicional,
    setTempoDeTrabalhoAdicional,
    custoAcessorios,
    setCustoAcessorios,
    custoEmbalagem,
    setCustoEmbalagem,
    impostos,
    setImpostos,
    taxaCartaoCredito,
    setTaxaCartaoCredito,
    marketplaceSelecionado,
    setMarketplaceSelecionado,
    taxaMarketplace,
    setTaxaMarketplace,
    frete,
    setFrete,
    unidadesPorPlaca,
    setUnidadesPorPlaca,
    totalDeUnidades,
    setTotalDeUnidades,

    // Configurações avançadas
    taxaFalhas,
    setTaxaFalhas,
    mostrarAvancadas,
    setMostrarAvancadas,
    precoImpressora,
    setPrecoImpressora,
    vidaUtilImpressora,
    setVidaUtilImpressora,
    custoManutencaoMensal,
    setCustoManutencaoMensal,
    custoEletricidadeHora,
    setCustoEletricidadeHora,
    consumoEletricoImpressora,
    setConsumoEletricoImpressora,

    // Impressora de resina
    precoImpressoraResina,
    setPrecoImpressoraResina,
    vidaUtilImpressoraResina,
    setVidaUtilImpressoraResina,
    custoManutencaoMensalResina,
    setCustoManutencaoMensalResina,
    consumoEletricoImpressoraResina,
    setConsumoEletricoImpressoraResina,
    custoMateriaisDescartaveisResina,
    setCustomateriaisDescartaveisResina,

    // Lava e Cura de resina
    precoLavaCura,
    setPrecoLavaCura,
    vidaUtilLavaCura,
    setVidaUtilLavaCura,
    custoManutencaoMensalLavaCura,
    setCustoManutencaoMensalLavaCura,
    duracaoUsoLavaCura,
    setDuracaoUsoLavaCura,

    // Custos horários
    custoMaoDeObraHora,
    setCustoMaoDeObraHora,
    custoModelagemHora,
    setCustoModelagemHora,
    custoPinturaHora,
    setCustoPinturaHora,

    // Seleção de margem
    markup,
    setMarkup,

    producaoEmLote,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}
