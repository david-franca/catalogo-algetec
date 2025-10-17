import { http, HttpResponse, delay } from "msw";
import { baseURL } from "../baseURL";

export const conceptsHandler = [
  http.post(baseURL("document-designer/concepts"), async () => {
    await delay(1000);
    return HttpResponse.json({
      conceitos: [
        {
          id: 1,
          nome: "Princípio de Arquimedes",
          descricao:
            "Estabelece que um corpo total ou parcialmente imerso em um fluido sofre uma força para cima igual ao peso do fluido deslocado. Esse conceito teórico fundamenta a explicação para a aparente diminuição do peso do objeto quando submerso e é a base para o cálculo do empuxo.",
          tipo: "conceito teórico",
          ja_abordado: true,
        },
        {
          id: 2,
          nome: "Empuxo",
          descricao:
            "Representa a força que atua para cima em um corpo imerso em um fluido, sendo igual ao peso do fluido deslocado pelo corpo. Esse conceito é utilizado para explicar a diferença entre o peso real e o peso aparente medido durante o experimento.",
          tipo: "conceito teórico",
          ja_abordado: true,
        },
        {
          id: 3,
          nome: "Peso Aparente",
          descricao:
            "É o valor do peso medido de um objeto quando imerso em um fluido, o qual é menor que o seu peso real devido à ação do empuxo. Esse conceito teórico é explorado através da comparação dos valores medidos antes e depois da imersão do objeto.",
          tipo: "conceito teórico",
          ja_abordado: true,
        },
        {
          id: 4,
          nome: "Calibração do Dinamômetro",
          descricao:
            "Procedimento prático essencial para assegurar que as medições de força sejam precisas. A calibração do dinamômetro garante que o ponto de referência esteja correto, permitindo a comparação confiável do peso do objeto em diferentes condições experimentais.",
          tipo: "conceito prático",
          ja_abordado: true,
        },
        {
          id: 5,
          nome: "Volume de Líquido Deslocado",
          descricao:
            "Refere-se à quantidade de fluido deslocada pelo corpo imerso, a qual é diretamente proporcional à magnitude do empuxo gerado. Esse conceito teórico é importante para a compreensão da relação entre o volume do corpo, a densidade do fluido e a força de empuxo medida.",
          tipo: "conceito teórico",
          ja_abordado: true,
        },
        {
          id: 6,
          nome: "Utilização do Dinamômetro na Medição de Forças",
          descricao:
            "Envolve a aplicação prática do dinamômetro para medir o peso e as variações de força sobre um objeto em diferentes condições, como fora e dentro de um fluido. Este conceito prático é demonstrado claramente no roteiro experimental através da sequência de medição e comparação dos valores.",
          tipo: "conceito prático",
          ja_abordado: true,
        },
      ],
    });
  }),
];
