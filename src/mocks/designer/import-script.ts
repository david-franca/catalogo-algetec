import { http, HttpResponse, delay } from "msw";

export const importScriptHandler = [
  http.post("https://api.openai.com/v2/chat/completions", async () => {
    await delay(1000);
    return HttpResponse.json({
      id: "chatcmpl-B8nTqUbi45bOuWVFNtvtalWvQ9s38",
      object: "chat.completion",
      created: 1741436526,
      model: "o3-mini-2025-01-31",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content:
              '{\n  "reasoning": "Analisamos o roteiro e identificamos as seções de Materiais, Procedimentos e Análise de Resultados. Observamos que os Materiais Necessários aparecem em duas partes, mas como são idênticos, optamos por extraí-los uma vez na ordem original: \'Béquer\', \'Água\', \'Suporte universal\', \'Dinamômetro\', \'Cilindro de Arquimedes\' e \'Recipiente transparente\'. Nos Procedimentos, decidimos extrair a versão do \'Roteiro refeito\' que apresenta os títulos dos passos seguidos das descrições e das Dicas Cognitivas, separando o título (campo procedure), a descrição (campo intermediate_text) e a dica (campo cognitive_hint), conforme o texto original. Por fim, para a Análise de Resultados, extraímos as perguntas listadas na seção \'Análise de Resultados\' do roteiro refeito, mantendo a formatação original e a ordem dos itens.",\n  "necessary_materials": [\n    { "id": 1, "item": "Béquer" },\n    { "id": 2, "item": "Água" },\n    { "id": 3, "item": "Suporte universal" },\n    { "id": 4, "item": "Dinamômetro" },\n    { "id": 5, "item": "Cilindro de Arquimedes" },\n    { "id": 6, "item": "Recipiente transparente" }\n  ],\n  "procedures": [\n    {\n      "id": 1,\n      "procedure": "Preparação do Experimento:",\n      "cognitive_hint": "Lembre-se de que a calibração inicial é essencial para garantir a precisão nas medições.",\n      "intermediate_text": "Coloque o cilindro de Arquimedes na mesa e calibre o dinamômetro."\n    },\n    {\n      "id": 2,\n      "procedure": "Verificando o Peso do Cilindro:",\n      "cognitive_hint": "Este valor será usado como referência para comparar os pesos em diferentes etapas do experimento.",\n      "intermediate_text": "Suspenda o cilindro no dinamômetro e registre seu peso."\n    },\n    {\n      "id": 3,\n      "procedure": "Imersão do Cilindro no Béquer com Água:",\n      "cognitive_hint": "Observe como a força de empuxo age para reduzir o peso aparente do cilindro.",\n      "intermediate_text": "Coloque o cilindro no béquer preenchido com água. Registre o peso aparente indicado no dinamômetro."\n    },\n    {\n      "id": 4,\n      "procedure": "Medindo a Força de Empuxo:",\n      "cognitive_hint": "Relacione o empuxo calculado ao volume de líquido deslocado, conforme o Princípio de Arquimedes.",\n      "intermediate_text": "Calcule o empuxo usando a fórmula:E=PCFL−PACDLE = PCFL - PACDLOnde:PCFLPCFL: Peso do corpo fora do líquido PACDLPACDL: Peso aparente do corpo dentro do líquido"\n    },\n    {\n      "id": 5,\n      "procedure": "Avaliando Cenários com Diferentes Volumes de Líquido:",\n      "cognitive_hint": "Lembre-se de que o empuxo depende diretamente do volume deslocado pelo corpo imerso.",\n      "intermediate_text": "Alterne o volume de líquido no béquer e registre os efeitos na força aparente e no empuxo."\n    }\n  ],\n  "result_analysis": [\n    {\n      "question": "Explique a aparente redução no peso do cilindro ao ser imerso na água.",\n      "id": 1\n    },\n    {\n      "question": "Justifique o motivo pelo qual o peso marcado retorna ao valor inicial ao preencher o recipiente com água.",\n      "id": 2\n    },\n    {\n      "question": "Discuta como o volume do recipiente impacta o comportamento do dinamômetro.",\n      "id": 3\n    },\n    {\n      "question": "Determine a força de empuxo utilizando os valores registrados no experimento.",\n      "id": 4\n    },\n    {\n      "question": "Explique por que usamos o termo \\"aparente diminuição sofrida pelo peso do corpo\\" ao invés de \\"diminuição do peso do corpo\\".",\n      "id": 5\n    }\n  ]\n}',
            refusal: null,
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 2802,
        completion_tokens: 12554,
        total_tokens: 15356,
        prompt_tokens_details: {
          cached_tokens: 0,
          audio_tokens: 0,
        },
        completion_tokens_details: {
          reasoning_tokens: 11584,
          audio_tokens: 0,
          accepted_prediction_tokens: 0,
          rejected_prediction_tokens: 0,
        },
      },
      service_tier: "default",
      system_fingerprint: "fp_42bfad963b",
    });
  }),
];
