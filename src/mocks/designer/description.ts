import { http, HttpResponse, delay } from "msw";
import { baseURL } from "../baseURL";

export const descriptionHandler = [
  http.post(baseURL("document-designer/description"), async () => {
    await delay(1000);
    return HttpResponse.json({
      descricao_do_experimento:
        'O experimento "Empuxo de Arquimedes" consiste em uma investigação prática do princípio de Arquimedes, permitindo aos participantes observar e medir a força de empuxo sobre um cilindro imerso em água. Durante o desenvolvimento do experimento, os alunos utilizarão um conjunto de materiais que inclui béquer, água, dinamômetro, suporte universal, cilindro de Arquimedes e recipiente transparente. O procedimento inicia com a calibração do dinamômetro, seguido da verificação do peso do cilindro em repouso e, depois, da medição do peso aparente do cilindro ao ser imerso em água. Ao manipular diferentes volumes de líquidos e observar as variações na força aparente, os participantes poderão relacionar as medições com a teoria do empuxo, permitindo uma compreensão prática dos conceitos envolvidos na hidrostática.\n\nA metodologia aplicada envolve etapas sistemáticas que guiam o pesquisador ou estudante a registrar parâmetros essenciais e a refletir criticamente sobre os resultados observados. Cada passo do roteiro, que inclui desde a preparação e verificação das medições iniciais até a análise dos resultados e respostas às questões elaboradas, busca incentivar um olhar investigativo e uma análise conceitual sobre os fenômenos relacionados à imersão de corpos em fluidos. O experimento também enfatiza a importância da calibração e da precisão das medidas para garantir a validade dos resultados e a correlação com as teorias científicas estabelecidas.',
      objetivo_geral:
        "O objetivo geral deste experimento é proporcionar uma compreensão aprofundada do princípio de Arquimedes por meio de uma abordagem prática e experimental, permitindo aos alunos observar a ação da força de empuxo quando um corpo é imerso em um líquido. Ao comparar o peso do cilindro fora e dentro da água, os participantes serão capazes de identificar e quantificar a aparente diminuição do peso, entendendo que tal redução é resultado da força de empuxo exercida pelo líquido. \n\nAlém disso, o experimento tem como finalidade desenvolver a habilidade de realizar medições precisas e análises críticas, relacionando os conceitos teóricos da hidrostática com a realidade experimental. Dessa forma, os estudantes poderão discutir as implicações dos resultados, compreender a importância dos parâmetros experimentais (como o volume de água deslocado) e estabelecer uma conexão entre a prática laboratorial e os princípios fundamentais das Ciências da Natureza, sobretudo na área de Física.",
    });
  }),
];
