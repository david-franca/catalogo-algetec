import { http, HttpResponse, delay } from "msw";
import { baseURL } from "../baseURL";

export const skillsHandler = [
  http.post(baseURL("document-designer/skills"), async () => {
    await delay(1000);
    return HttpResponse.json({
      habilidades: [
        {
          id: 1,
          nome: "Manipulação de Equipamentos de Laboratório",
          descricao:
            "Habilidade para manusear com segurança e precisão os instrumentos utilizados no experimento, como bequer, dinamômetro, suporte universal, cilindro de Arquimedes e recipientes. Envolve práticas de organização dos materiais, posicionamento correto e execução das medições físicas sem causar danos aos equipamentos.",
          tipo: "habilidade manual",
        },
        {
          id: 2,
          nome: "Coordenação Motora para Montagem do Experimento",
          descricao:
            "Capacidade de executar movimentos coordenados e precisos para posicionar e ajustar os instrumentos de medição, garantindo que cada etapa do experimento seja realizada com exatidão e sem erros operacionais. Envolve a destreza ao calibrar o dinamômetro, mover o cilindro e ajustar os recipientes durante as medições.",
          tipo: "habilidade manual",
        },
        {
          id: 3,
          nome: "Leitura e Interpretação do Roteiro Experimental",
          descricao:
            "Capacidade de compreender e seguir de maneira detalhada os procedimentos descritos no roteiro do laboratório virtual, identificando corretamente cada etapa, instrução e dica cognitiva, e aplicando esse conhecimento na execução do experimento.",
          tipo: "habilidade cognitiva",
        },
        {
          id: 4,
          nome: "Análise Crítica dos Resultados",
          descricao:
            "Habilidade para interpretar os dados coletados durante o experimento, comparar medições e identificar as variações causadas pelo empuxo. Isso envolve a capacidade de realizar cálculos, relacionar informações e justificar os resultados observados com base nos conceitos científicos estudados.",
          tipo: "habilidade cognitiva",
        },
        {
          id: 5,
          nome: "Aplicação dos Conceitos da Hidrostática",
          descricao:
            "Capacidade de empregar conhecimentos teóricos, como o princípio de Arquimedes e o conceito de empuxo, para explicar e prever o comportamento do cilindro imerso no líquido. Envolve o raciocínio científico necessário para relacionar teorias com as observações experimentais.",
          tipo: "habilidade cognitiva",
        },
      ],
    });
  }),
];
