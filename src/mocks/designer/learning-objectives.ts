import { http, HttpResponse, delay } from "msw";
import { baseURL } from "../baseURL";

export const learningObjectivesHandler = [
  http.post(baseURL("document-designer/learning-objectives"), async () => {
    await delay(1000);
    return HttpResponse.json({
      objetivos_de_aprendizagem: [
        {
          id: 1,
          tipo: "Lembrar",
          descricao:
            "Identificar e recordar os instrumentos de laboratório e os procedimentos básicos utilizados no experimento, tais como a calibração do dinamômetro, medição do peso do cilindro em repouso e a correta utilização dos recipientes.",
          relacao_com_a_pratica:
            "Este objetivo permite que o aluno se familiarize com os equipamentos e etapas iniciais do experimento, possibilitando o reconhecimento e a memorização das ações necessárias para a consecução das medições e para a condução adequada do procedimento experimental.",
          procedimentos_relacionados: [1, 6, 7],
          avaliacao_do_objetivo:
            "Será avaliado por meio de questionamentos durante o experimento e na seção de avaliação dos resultados, onde os alunos deverão identificar corretamente os instrumentos de medição e descrever as etapas executadas, bem como responder questões que remetam à identificação das práticas laboratoriais.",
        },
        {
          id: 2,
          tipo: "Compreender",
          descricao:
            "Compreender os conceitos teóricos do Princípio de Arquimedes e empuxo, relacionando-os com as observações experimentais, de modo a explicar a aparente diminuição do peso do cilindro quando imerso em água.",
          relacao_com_a_pratica:
            "Ao associar a teoria à prática, o aluno conecta os conceitos de peso aparente, empuxo e volume de líquido deslocado com as medições realizadas durante o experimento, facilitando a interpretação dos fenômenos observados.",
          procedimentos_relacionados: [8, 9, 10],
          avaliacao_do_objetivo:
            "A avaliação será realizada através da resolução de questões discursivas no roteiro de avaliação dos resultados e pela análise das discussões realizadas em sala ou em fóruns, onde os alunos deverão justificar as variações observadas com base nos princípios teóricos estudados.",
        },
        {
          id: 3,
          tipo: "Aplicar",
          descricao:
            "Aplicar conhecimentos práticos para a calibração do dinamômetro e a realização de medições precisas do peso do cilindro, tanto em condições normais quanto quando imerso em água.",
          relacao_com_a_pratica:
            "A execução deste objetivo envolve a prática de manipulação correta dos equipamentos, o que é fundamental para obter medidas confiáveis. A aplicação cuidadosa das etapas descritas no roteiro garante que os resultados experimentais possam ser comparados e analisados posteriormente.",
          procedimentos_relacionados: [1, 2, 6, 7, 8],
          avaliacao_do_objetivo:
            "Através da observação direta durante o experimento e a verificação dos registros das medições, a precisão na calibração e no uso do dinamômetro será avaliada, possibilitando a identificação de possíveis erros e a correção dos procedimentos.",
        },
        {
          id: 4,
          tipo: "Analisar",
          descricao:
            "Analisar criticamente os dados coletados durante o experimento para calcular a força de empuxo e interpretar a influência do volume de água deslocado sobre o peso aparente do cilindro.",
          relacao_com_a_pratica:
            "Este objetivo estimula a investigação dos resultados obtidos, onde o aluno utiliza as medições e cálculos (como a diferença entre o peso real e o peso aparente) para identificar padrões e relações entre os parâmetros medidos, reforçando o entendimento da dinâmica dos fluidos.",
          procedimentos_relacionados: [9, 10],
          avaliacao_do_objetivo:
            "Será avaliado por meio da análise dos cálculos efetuados e das justificativas apresentadas nas respostas às questões do roteiro de avaliação, onde os alunos deverão demonstrar capacidade de relacionar os dados experimentais com os conceitos teóricos de empuxo e volume de líquido deslocado.",
        },
        {
          id: 5,
          tipo: "Avaliar",
          descricao:
            "Avaliar criticamente a relação entre os resultados experimentais e os conceitos teóricos, formulando hipóteses e justificativas para as variações observadas nas medições de peso aparente e empuxo.",
          relacao_com_a_pratica:
            "Este objetivo contribui para o desenvolvimento do pensamento crítico e científico, onde o aluno não apenas executa o experimento, mas também reflete sobre os resultados obtidos e sua consistência com os modelos teóricos estudados, incentivando a discussão e a autoavaliação dos procedimentos realizados.",
          procedimentos_relacionados: [4, 5],
          avaliacao_do_objetivo:
            "A avaliação ocorrerá na fase de análise dos resultados, por meio de discussões, elaboração de relatórios e respostas às questões presentes na seção 'Avaliação de Resultados', contando com a análise da capacidade do aluno em articular os dados experimentais aos conceitos teóricos de forma coerente e fundamentada.",
        },
      ],
    });
  }),
];
