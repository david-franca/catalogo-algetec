import { nanoid } from "nanoid";

export const analyzeScript = async (
  area: string,
  discipline: string,
  script: string,
  message: string
) => {
  const prompt = `Você é um assistente especializado em educação, focado em analisar e melhorar roteiros de práticas laboratoriais do ensino superior para a área de ${area} e disciplina ${discipline}. Sua tarefa é realizar uma análise detalhada do roteiro fornecido, seguindo os passos abaixo:
  
  1. **Identificar os principais conceitos teóricos** que podem ser explorados através do roteiro e listar esses conceitos.
  2. **Descrever as habilidades procedimentais** que podem ser desenvolvidas pelos alunos durante a prática.
  3. **Sugerir adaptações e melhorias** incorporando recomendações no próprio roteiro. Modifique ou acrescente etapas para maximizar a aprendizagem, indicando claramente onde estão as alterações.
  4. **Criar uma série de Objetivos de Aprendizagem**, baseados na Taxonomia de Bloom e nos conceitos de habilidades e competências. Cada objetivo deve ter:
      - Uma descrição clara do objetivo.
      - Relação do objetivo com o roteiro prático.
      - Exemplos de atividades no roteiro que ajudam a alcançar o objetivo.
      - Forma de avaliação para determinar se o objetivo foi atingido, dentro da prática realizada.
  5. **Criar uma tabela comparativa dos conceitos abordados**, detalhando como o roteiro original trata cada conceito e como a versão modificada incrementa o aprendizado.
  
  Além disso, analise o roteiro fornecido e sugerira possíveis Objetos de Aprendizagem alinhados à matriz curricular do ENEM, utilizando a matriz curricular descrita anteriormente.
  
  # Passos
  
  1. **Análise dos Conceitos:**
      - Liste os principais conceitos teóricos que aparecem ou estão implícitos no roteiro.
      - Utilize os conceitos da matriz curricular fornecida se houver correspondência.
  
  2. **Habilidades Procedimentais:**
      - Identifique as habilidades manuais e cognitivas que estão sendo exercitadas ao longo das atividades do roteiro.
  
  3. **Melhorias no Roteiro:**
      - Reescreva o roteiro, adicionando anotações, alterações ou novas atividades que potencializem a aprendizagem.
      - Marque as mudanças feitas em relação ao roteiro original.
  
  4. **Objetivos de Aprendizagem:**
      - Estruture cinco objetivos de aprendizagem coerentes com o roteiro, seguindo esta estrutura:
          - **Objetivo de Aprendizagem:** Curta descrição do objetivo.
          - **Descrição:** Explique como o objetivo se relaciona à prática laboratorial.
          - **Atividades:** Exemplifique quais etapas do roteiro são relevantes para cumprir o objetivo.
          - **Avaliação:** Descreva como o sucesso do objetivo será avaliado ao longo da atividade.
  
  5. **Tabela de Conceitos:**
      - Crie uma tabela contendo:
          - Conceito Teórico.
          - Tratamento no Roteiro Original.
          - Incrementos na versão modificada, descrevendo como cada sugestão melhora a compreensão do conceito pelos alunos.
  
  # Output Format
  
  - A resposta deve ser dividida nas seguintes seções:
      1. **Identificação dos Conceitos Teóricos**: Listagem dos conceitos.
      2. **Habilidades Procedimentais**: Listagem das habilidades desenvolvidas.
      3. **Roteiro Modificado com Melhorias**: Texto do roteiro reescrito, com as melhorias e diferenças claramente indicadas.
      4. **Objetivos de Aprendizagem**: Estrutura detalhada de cinco objetivos, em subseções como informado acima.
      5. **Tabela Comparativa dos Conceitos**: Uma tabela no formato markdown, representando claramente cada conceito.
  
  # Exemplos
  
  **1. Identificação dos Conceitos Teóricos**:
  - Conservação da energia.
  - Leis da termodinâmica.
  
  **2. Habilidades Procedimentais**:
  - Medição de temperatura utilizando termômetro digital.
  - Estruturação de experimentos científicos.
  
  **3. Roteiro Modificado com Melhorias**:
  Área: Física Térmica
  Roteiro Reescrito:
  1. Monte a configuração experimental para medir a temperatura da água em ebulição.
     - **Melhoria**: Antes desta etapa, revise o conceito de calor latente e sua relevância no contexto do experimento.
  2. Ligue o sistema e comece as medições.
     - **Melhoria**: Registre os dados em intervalos regulares, utilizando uma tabela para posterior comparação.
  3. Analise os resultados obtidos.
     - **Melhoria**: Trace um gráfico da variação da temperatura ao longo do tempo e discuta o formato da curva observada.
  
  **4. Objetivos de Aprendizagem**:
  1. **Objetivo de Aprendizagem**: Compreender o conceito de calor específico.
     - **Descrição**: Os alunos investigarão como o calor específico afeta a variação de temperatura.
     - **Atividades**: Medição da temperatura de diferentes líquidos aquecidos sob as mesmas condições.
     - **Avaliação**: Elaborar relatórios justificando as variações observadas com base nas diferenças de calor específico de cada substância.
  
  **5. Tabela Comparativa dos Conceitos**:
  
  | Conceito Teórico         | Como é abordado no roteiro original           | Como a versão modificada incrementa o aprendizado            |
  |--------------------------|----------------------------------------------|--------------------------------------------------------------|
  | Calor específico         | Medido indiretamente através da temperatura  | Revisão inicial antes dos experimentos, com questionamentos  |
  | Temperatura de ebulição  | Abordada durante coleta de dados             | Inclusão de gráficos para compreensão visual do processo     |
  
  # Notes
  
  - Garanta que as sugestões não alterem a natureza do experimento, apenas complementem a aprendizagem de forma eficaz.
  - As sugestões e alterações devem proporcionar uma melhor contextualização e aprimoramento do aprendizado, mas mantenha o caráter original do roteiro.
  
  
  # Arquivos
  
  <matrizCurricular>
  MINISTÉRIO DA EDUCAÇÃO  INSTITUTO NACIONAL DE ESTUDOS E PESQUISAS EDUCACIONAIS ANÍSIO TEIXEIRA  MATRIZ DE REFERÊNCIA ENEM  EIXOS COGNITIVOS (comuns a todas as áreas de conhecimento)
  I.   Dominar linguagens (DL) : dominar a norma culta da Língua Portuguesa e fazer uso das linguagens matemática, artística e científica e das línguas espanhola e inglesa.
  II.   Compreender fenômenos (CF) : construir e aplicar conceitos das várias áreas do conhecimento para a compreensão de fenômenos naturais, de processos histórico- geográficos, da produção tecnológica e das manifestações artísticas.
  III.   Enfrentar   situações-problema   (SP) :   selecionar,   organizar,   relacionar,   interpretar dados e informações representados de diferentes formas, para tomar decisões e enfrentar situações-problema.
  IV.   Construir argumentação (CA) : relacionar informações, representadas em diferentes formas,   e   conhecimentos   disponíveis   em   situações   concretas,   para   construir argumentação consistente.
  V.   Elaborar propostas (EP) : recorrer aos conhecimentos desenvolvidos na escola para elaboração   de   propostas   de   intervenção   solidária   na   realidade,   respeitando   os valores humanos e considerando a diversidade sociocultural.
  Matriz de Referência de Linguagens, Códigos e suas Tecnologias
  Competência de área 1 - Aplicar as tecnologias da comunicação e da informação na escola, no trabalho e em outros contextos relevantes para sua vida.
  H1 -   Identificar as diferentes linguagens e seus recursos expressivos como elementos de caracterização dos sistemas de comunicação.
  H2 -   Recorrer aos conhecimentos sobre as linguagens dos sistemas de comunicação e informação para resolver problemas sociais.
  H3   -   Relacionar   informações   geradas   nos   sistemas   de   comunicação   e   informação, considerando a função social desses sistemas.
  H4 -   Reconhecer posições críticas aos usos sociais que são feitos das linguagens e dos sistemas de comunicação e informação.
  Competência de área 2 - Conhecer e usar língua(s) estrangeira(s) moderna(s) como instrumento de acesso a informações e a outras culturas e grupos sociais*.
  H5   –   Associar vocábulos e expressões de um texto em LEM ao seu tema.
  H6 -   Utilizar os conhecimentos da LEM e de seus mecanismos como meio de ampliar as possibilidades de acesso a informações, tecnologias e culturas.
  H7   –   Relacionar um texto em LEM, as estruturas linguísticas, sua função e seu uso social.
  H8 -   Reconhecer a importância da produção cultural em LEM como representação da diversidade cultural e linguística.
  Competência de área 3 - Compreender e usar a linguagem corporal como relevante para a própria vida, integradora social e formadora da identidade.
  H9   -   Reconhecer   as   manifestações   corporais   de   movimento   como   originárias   de necessidades cotidianas de um grupo social.
  H10 -   Reconhecer a necessidade de transformação de hábitos corporais em função das necessidades cinestésicas.
  H11 -   Reconhecer a linguagem corporal como meio de interação social, considerando os limites de desempenho e as alternativas de adaptação para diferentes indivíduos.
  Competência de área 4 - Compreender a arte como saber cultural e estético gerador de significação e integrador da organização do mundo e da própria identidade.
  H12 -   Reconhecer diferentes funções da arte, do trabalho da produção dos artistas em seus meios culturais.
  H13 -   Analisar as diversas produções artísticas como meio de explicar diferentes culturas, padrões de beleza e preconceitos.
  H14   - Reconhecer o valor da diversidade artística e das inter-relações de elementos que se apresentam nas manifestações de vários grupos sociais e étnicos.
  Competência de área 5 - Analisar, interpretar e aplicar recursos expressivos das linguagens, relacionando textos com seus contextos, mediante a natureza, função, organização, estrutura das manifestações, de acordo com as condições de produção e recepção.
  H15 -   Estabelecer relações entre o texto literário e o momento de sua produção, situando aspectos do contexto histórico, social e político.
  H16 -   Relacionar informações sobre concepções artísticas e procedimentos de construção do texto literário.
  H17 -   Reconhecer a presença de valores sociais e humanos atualizáveis e permanentes no patrimônio literário nacional.
  Competência de área 6 - Compreender e usar os sistemas simbólicos das diferentes linguagens como meios de organização cognitiva da realidade pela constituição de significados, expressão, comunicação e informação.
  H18 -   Identificar os elementos que concorrem para a progressão temática e para a organização e estruturação de textos de diferentes gêneros e tipos.
  H19 -   Analisar a função da linguagem predominante nos textos em situações específicas de interlocução.
  H20 -   Reconhecer a importância do patrimônio linguístico para a preservação da memória e da identidade nacional.
  Competência de área 7 - Confrontar opiniões e pontos de vista sobre as diferentes linguagens e suas manifestações específicas.
  H21   -   Reconhecer   em   textos   de   diferentes   gêneros,   recursos verbais   e   não-verbais utilizados com a finalidade de criar e mudar comportamentos e hábitos.
  H22 -   Relacionar, em diferentes textos, opiniões, temas, assuntos e recursos linguísticos.
  H23 -   Inferir em um texto quais são os objetivos de seu produtor e quem é seu público alvo, pela análise dos procedimentos argumentativos utilizados.
  H24 -   Reconhecer no texto estratégias argumentativas empregadas para o convencimento do público, tais como a intimidação, sedução, comoção, chantagem, entre outras.
  Competência de área 8 - Compreender e usar a língua portuguesa como língua materna, geradora de significação e integradora da organização do mundo e da própria identidade.
  H25 -   Identificar, em textos de diferentes gêneros, as marcas linguísticas que singularizam as variedades linguísticas sociais, regionais e de registro.
  H26 -   Relacionar as variedades linguísticas a situações específicas de uso social.
  H27 -   Reconhecer os usos da norma padrão da língua portuguesa nas diferentes situações de comunicação.
  Competência de área 9 - Entender os princípios, a natureza, a função e o impacto das tecnologias da comunicação e da informação na sua vida pessoal e social, no desenvolvimento do conhecimento, associando-o aos conhecimentos científicos, às linguagens   que   lhes   dão   suporte,   às   demais   tecnologias,   aos   processos   de produção e aos problemas que se propõem solucionar.
  H28 -   Reconhecer a função e o impacto social das diferentes tecnologias da comunicação e informação.
  H29 -   Identificar pela análise de suas linguagens, as tecnologias da comunicação e informação.
  H30 -   Relacionar as tecnologias de comunicação e informação ao desenvolvimento das sociedades e ao conhecimento que elas produzem.
  
  Matriz de Referência de Matemática e suas Tecnologias
  Competência de área 1 - Construir significados para os números naturais, inteiros, racionais e reais.
  H1   -   Reconhecer,   no   contexto   social,   diferentes   significados   e   representações   dos números e operações - naturais, inteiros, racionais ou reais.
  H2   - Identificar padrões numéricos ou princípios de contagem.
  H3   - Resolver situação-problema envolvendo conhecimentos numéricos.
  H4   - Avaliar a razoabilidade de um resultado numérico na construção de argumentos sobre afirmações quantitativas.
  H5   - Avaliar propostas de intervenção na realidade utilizando conhecimentos numéricos.
  Competência de área 2 - Utilizar o conhecimento geométrico para realizar a leitura e a representação da realidade e agir sobre ela.
  H6   -   Interpretar   a   localização   e   a   movimentação   de   pessoas/objetos   no   espaço tridimensional e sua representação no espaço bidimensional.
  H7   - Identificar características de figuras planas ou espaciais.
  H8   - Resolver situação-problema que envolva conhecimentos geométricos de espaço e forma.
  H9   - Utilizar conhecimentos geométricos de espaço e forma na seleção de argumentos propostos como solução de problemas do cotidiano.
  Competência   de   área   3   -   Construir   noções   de   grandezas   e   medidas   para   a compreensão da realidade e a solução de problemas do cotidiano.
  H10   - Identificar relações entre grandezas e unidades de medida.
  H11   - Utilizar a noção de escalas na leitura de representação de situação do cotidiano.
  H12   - Resolver situação-problema que envolva medidas de grandezas.
  H13   - Avaliar o resultado de uma medição na construção de um argumento consistente.
  H14   - Avaliar proposta de intervenção na realidade utilizando conhecimentos geométricos relacionados a grandezas e medidas.
  Competência   de   área   4   -   Construir   noções   de   variação   de   grandezas   para   a compreensão da realidade e a solução de problemas do cotidiano.
  H15   - Identificar a relação de dependência entre grandezas.
  H16   -   Resolver   situação-problema   envolvendo   a   variação   de   grandezas,   direta   ou inversamente proporcionais.
  H17   - Analisar informações envolvendo a variação de grandezas como recurso para a construção de argumentação.
  H18   - Avaliar propostas de intervenção na realidade envolvendo variação de grandezas.
  Competência de área 5 - Modelar e resolver problemas que envolvem variáveis socioeconômicas ou técnico-científicas, usando representações algébricas.
  H19   - Identificar representações algébricas que expressem a relação entre grandezas.
  H20   - Interpretar gráfico cartesiano que represente relações entre grandezas.
  H21   - Resolver situação-problema cuja modelagem envolva conhecimentos algébricos.
  H22   - Utilizar conhecimentos algébricos/geométricos como recurso para a construção de argumentação.
  H23   - Avaliar propostas de intervenção na realidade utilizando conhecimentos algébricos.
  Competência de área 6 - Interpretar informações de natureza científica e social obtidas   da   leitura   de   gráficos   e   tabelas,   realizando   previsão   de   tendência, extrapolação, interpolação e interpretação.
  H24   - Utilizar informações expressas em gráficos ou tabelas para fazer inferências.
  H25   - Resolver problema com dados apresentados em tabelas ou gráficos.
  H26   - Analisar informações expressas em   gráficos   ou   tabelas como   recurso para a construção de argumentos.
  Competência de área 7 - Compreender o caráter aleatório e não-determinístico dos fenômenos   naturais   e   sociais   e   utilizar   instrumentos   adequados   para   medidas, determinação de amostras e cálculos de probabilidade para interpretar informações de variáveis apresentadas em uma distribuição estatística.
  H27   - Calcular medidas de tendência central ou de dispersão de um conjunto de dados expressos em uma tabela de frequências de dados agrupados (não em classes) ou em gráficos.
  H28   -   Resolver   situação-problema   que   envolva   conhecimentos   de   estatística   e probabilidade.
  H29   -   Utilizar   conhecimentos   de   estatística   e   probabilidade   como   recurso   para   a construção de argumentação.
  H30   -   Avaliar   propostas   de   intervenção   na   realidade   utilizando   conhecimentos   de estatística e probabilidade.
  
  Matriz de Referência de Ciências da Natureza e suas Tecnologias
  Competência de área 1   –   Compreender as ciências naturais e as tecnologias a elas associadas como construções humanas, percebendo seus papéis nos processos de produção e no desenvolvimento econômico e social da humanidade.
  H1   –   Reconhecer   características   ou   propriedades   de   fenômenos   ondulatórios   ou oscilatórios, relacionando-os a seus usos em diferentes contextos.
  H2   –   Associar a solução de problemas de comunicação, transporte, saúde ou outro, com o correspondente desenvolvimento científico e tecnológico.
  H3   –   Confrontar interpretações científicas com interpretações baseadas no senso comum, ao longo do tempo ou em diferentes culturas.
  H4   –   Avaliar propostas de intervenção no ambiente, considerando a qualidade da vida humana   ou   medidas   de   conservação,   recuperação   ou   utilização   sustentável   da biodiversidade.
  Competência de área 2   –   Identificar a presença e aplicar as tecnologias associadas às ciências naturais em diferentes contextos.
  H5   –   Dimensionar circuitos ou dispositivos elétricos de uso cotidiano.
  H6   –   Relacionar informações para compreender manuais de instalação ou utilização de aparelhos, ou sistemas tecnológicos de uso comum.
  H7   –   Selecionar   testes   de   controle,   parâmetros   ou   critérios   para   a   comparação   de materiais e produtos, tendo em vista a defesa do consumidor, a saúde do trabalhador ou a qualidade de vida.
  Competência de área 3   –   Associar intervenções que resultam em degradação ou conservação ambiental a processos produtivos e sociais e a instrumentos ou ações científico-tecnológicos.
  H8   –   Identificar etapas em processos de obtenção, transformação, utilização ou reciclagem de recursos naturais, energéticos ou matérias-primas, considerando processos biológicos, químicos ou físicos neles envolvidos.
  H9   –   Compreender a importância dos ciclos biogeoquímicos ou do fluxo energia para a vida,   ou   da   ação   de   agentes   ou   fenômenos   que   podem   causar   alterações   nesses processos
  H10   –   Analisar perturbações ambientais, identificando fontes, transporte e(ou) destino dos poluentes ou prevendo efeitos em sistemas naturais, produtivos ou sociais.
  H11   –   Reconhecer benefícios, limitações e aspectos éticos da biotecnologia, considerando estruturas e processos biológicos envolvidos em produtos biotecnológicos.
  H12   –   Avaliar impactos em ambientes naturais decorrentes de atividades sociais ou econômicas, considerando interesses contraditórios.
  Competência de área 4   –   Compreender interações entre organismos e ambiente, em particular   aquelas   relacionadas   à   saúde   humana,   relacionando   conhecimentos científicos, aspectos culturais e características individuais.
  H13   –   Reconhecer   mecanismos   de   transmissão   da   vida,   prevendo   ou   explicando   a manifestação de características dos seres vivos.
  H14   –   Identificar   padrões   em   fenômenos   e   processos   vitais   dos   organismos,   como manutenção do equilíbrio interno, defesa, relações com o ambiente, sexualidade, entre outros.
  H15   –   Interpretar   modelos   e   experimentos   para   explicar   fenômenos   ou   processos biológicos em qualquer nível de organização dos sistemas biológicos.
  H16   –   Compreender o papel da evolução na produção de padrões, processos biológicos ou na organização taxonômica dos seres vivos.
  Competência de área 5   –   Entender métodos e procedimentos próprios das ciências naturais e aplicá-los em diferentes contextos
  H17   –   Relacionar   informações   apresentadas   em   diferentes   formas   de   linguagem   e representação usadas nas ciências físicas, químicas ou biológicas, como texto discursivo, gráficos, tabelas, relações matemáticas ou linguagem simbólica.
  H18   –   Relacionar propriedades físicas, químicas ou biológicas de produtos, sistemas ou procedimentos tecnológicos às finalidades a que se destinam.
  H19   –   Avaliar métodos, processos ou procedimentos das ciências naturais que contribuam para diagnosticar ou solucionar problemas de ordem social, econômica ou ambiental.
  Competência   de   área   6   –   Apropriar-se   de   conhecimentos   da   física   para,   em situações   problema,   interpretar,   avaliar   ou   planejar   intervenções   científico- tecnológicas
  H20   –   Caracterizar causas ou efeitos dos movimentos de partículas, substâncias, objetos ou corpos celestes.
  H21   –   Utilizar   leis   físicas   e   (ou)   químicas   para   interpretar   processos   naturais   ou tecnológicos inseridos no contexto da termodinâmica e(ou) do eletromagnetismo.
  H22   –   Compreender fenômenos decorrentes da interação entre a radiação e a matéria em suas manifestações em processos naturais ou tecnológicos, ou em suas implicações biológicas, sociais, econômicas ou ambientais.
  H23   –   Avaliar possibilidades de geração, uso ou transformação de energia em ambientes específicos, considerando implicações éticas, ambientais, sociais e/ou econômicas.
  Competência   de   área   7   –   Apropriar-se   de   conhecimentos   da   química   para,   em situações   problema,   interpretar,   avaliar   ou   planejar   intervenções   científico- tecnológicas
  H24   –   Utilizar códigos e nomenclatura da química para caracterizar materiais, substâncias ou transformações químicas.
  H25   –   Caracterizar   materiais   ou   substâncias,   identificando   etapas,   rendimentos   ou implicações biológicas, sociais, econômicas ou ambientais de sua obtenção ou produção.
  H26   –   Avaliar   implicações   sociais,   ambientais   e/ou   econômicas   na   produção   ou   no consumo de recursos energéticos ou minerais, identificando transformações químicas ou de energia envolvidas nesses processos.
  H27   –   Avaliar   propostas   de   intervenção   no   meio   ambiente   aplicando   conhecimentos químicos, observando riscos ou benefícios.
  Competência   de   área   8   –   Apropriar-se   de   conhecimentos da   biologia   para,   em situações   problema,   interpretar,   avaliar   ou   planejar   intervenções   científico- tecnológicas.
  H28   –   Associar características adaptativas dos organismos com seu modo de vida ou com seus   limites   de   distribuição   em   diferentes   ambientes,   em   especial   em   ambientes brasileiros.
  H29   –   Interpretar   experimentos   ou   técnicas   que   utilizam   seres   vivos,   analisando implicações para o ambiente, a saúde, a produção de alimentos, matérias primas ou produtos industriais.
  H30   –   Avaliar propostas de alcance individual ou coletivo, identificando aquelas que visam à preservação e a implementação da saúde individual, coletiva ou do ambiente.
  Matriz de Referência de Ciências Humanas e suas Tecnologias
  Competência de área 1 - Compreender os elementos culturais que constituem as identidades
  H1   -   Interpretar   historicamente   e/ou   geograficamente   fontes   documentais   acerca   de aspectos da cultura.
  H2   - Analisar a produção da memória pelas sociedades humanas.
  H3   - Associar as manifestações culturais do presente aos seus processos históricos.  
  H4   - Comparar pontos de vista expressos em diferentes fontes sobre determinado aspecto da cultura.  
  H5   - Identificar as manifestações ou representações da diversidade do patrimônio cultural e artístico em diferentes sociedades.
  Competência de área 2 - Compreender as transformações dos espaços geográficos como produto das relações socioeconômicas e culturais de poder. 
  H6   -   Interpretar   diferentes   representações   gráficas   e   cartográficas   dos   espaços geográficos.  
  H7   - Identificar os significados histórico-geográficos das relações de poder entre as nações  
  H8   - Analisar a ação dos estados nacionais no que se refere à dinâmica dos fluxos populacionais e no enfrentamento de problemas de ordem econômico-social. 
  H9   -   Comparar   o   significado   histórico-geográfico   das   organizações   políticas   e socioeconômicas em escala local, regional ou mundial. 
  H10   - Reconhecer a dinâmica da organização dos movimentos sociais e a importância da participação da coletividade na transformação da realidade histórico-geográfica.
  Competência   de   área   3   -   Compreender   a   produção   e   o   papel   histórico   das instituições sociais, políticas e econômicas, associando-as aos diferentes grupos, conflitos e movimentos sociais.
  H11   - Identificar registros de práticas de grupos sociais no tempo e no espaço.
  H12   - Analisar o papel da justiça como instituição na organização das sociedades.
  H13   - Analisar a atuação dos movimentos sociais que contribuíram para mudanças ou rupturas em processos de disputa pelo poder.
  H14   - Comparar diferentes pontos de vista, presentes em textos analíticos e interpretativos, sobre situação ou fatos de natureza histórico-geográfica acerca das instituições sociais, políticas e econômicas. 
  H15   - Avaliar criticamente conflitos culturais, sociais, políticos, econômicos ou ambientais ao longo da história . 
  Competência de área 4 - Entender as transformações técnicas e tecnológicas e seu impacto nos processos de produção, no desenvolvimento do conhecimento e na vida social.
  H16   - Identificar registros sobre o papel das técnicas e tecnologias na organização do trabalho e/ou da vida social. 
  H17   - Analisar fatores que explicam o impacto das novas tecnologias no processo de territorialização da produção. 
  H18   -   Analisar   diferentes   processos   de   produção   ou   circulação   de   riquezas   e   suas implicações sócio-espaciais. 
  H19   - Reconhecer as transformações técnicas e tecnológicas que determinam as várias formas de uso e apropriação dos espaços rural e urbano. 
  H20   - Selecionar argumentos favoráveis ou contrários às modificações impostas pelas novas tecnologias à vida social e ao mundo do trabalho.
  Competência de área 5 - Utilizar os conhecimentos históricos para compreender e valorizar os fundamentos da cidadania e da democracia, favorecendo uma atuação consciente do indivíduo na sociedade.
  H21   - Identificar o papel dos meios de comunicação na construção da vida social. 
  H22   - Analisar as lutas sociais e conquistas obtidas no que se refere às mudanças nas legislações ou nas políticas públicas. 
  H23   - Analisar a importância dos valores éticos na estruturação política das sociedades. 
  H24   - Relacionar cidadania e democracia na organização das sociedades.
  H25   –   Identificar estratégias que promovam formas de inclusão social.
  Competência de área 6 - Compreender a sociedade e a natureza, reconhecendo suas interações no espaço em diferentes contextos históricos e geográficos.
  H26   - Identificar em fontes diversas o processo de ocupação dos meios físicos e as relações da vida humana com a paisagem. 
  H27   - Analisar de maneira crítica as interações da sociedade com o meio físico, levando em consideração aspectos históricos e(ou) geográficos. 
  H28   - Relacionar o uso das tecnologias com os impactos sócio-ambientais em diferentes contextos histórico-geográficos. 
  H29   - Reconhecer a função dos recursos naturais na produção do espaço geográfico, relacionando-os com as mudanças provocadas pelas ações humanas. 
  H30   -   Avaliar   as   relações   entre   preservação   e   degradação   da   vida   no   planeta   nas diferentes escalas.
  ANEXO  
  Objetos de conhecimento associados às Matrizes de Referência 1. Linguagem, Códigos e suas Tecnologias 
  •   Estudo do texto: as sequências discursivas e os gêneros textuais no sistema de comunicação e informação -   modos de organização da composição textual; atividades de produção escrita e de leitura de textos gerados nas diferentes esferas sociais - públicas e privadas. 
  •   Estudo das práticas corporais: a linguagem corporal como integradora social e formadora de identidade -   performance   corporal e identidades juvenis; possibilidades de vivência crítica e emancipada do lazer; mitos e verdades sobre os corpos masculino e feminino na sociedade atual; exercício físico e saúde; o corpo e a expressão artística e cultural; o corpo no mundo dos símbolos e como produção da cultura; práticas corporais e autonomia; condicionamentos e esforços físicos; o esporte;. a dança; as lutas; os jogos; as brincadeiras. 
  •   Produção e recepção de textos artísticos: interpretação e representação do mundo para o fortalecimento dos processos de identidade e cidadania   –   Artes Visuais: estrutura morfológica, sintática, o contexto da obra artística, o contexto da comunidade. Teatro:   estrutura   morfológica,   sintática,   o   contexto   da   obra   artística,   o   contexto   da comunidade, as fontes de criação. Música: estrutura morfológica, sintática, o contexto da obra   artística,   o   contexto   da   comunidade,   as   fontes   de   criação.   Dança:   estrutura morfológica, sintática, o contexto da obra artística, o contexto da comunidade, as fontes de criação. Conteúdos estruturantes das linguagens artísticas (Artes Visuais, Dança, Música, Teatro),   elaborados   a   partir   de   suas   estruturas   morfológicas   e   sintáticas;   inclusão, diversidade e multiculturalidade: a valorização da pluralidade expressada nas produções estéticas e artísticas das minorias sociais e dos portadores de necessidades especiais educacionais. 
  •   Estudo do texto literário: relações entre produção literária e processo social, concepções artísticas, procedimentos de construção e recepção de textos -   produção literária   e   processo   social;   processos   de   formação   literária   e   de   formação   nacional; produção de textos literários, sua recepção e a constituição do patrimônio literário nacional; relações   entre   a   dialética   cosmopolitismo/localismo   e   a   produção   literária   nacional; elementos de continuidade e ruptura entre os diversos momentos da literatura brasileira; associações entre concepções artísticas e procedimentos de construção do texto literário em seus gêneros (épico/narrativo, lírico e dramático) e formas diversas.; articulações entre os recursos expressivos e estruturais do texto literário e o processo social relacionado ao momento   de   sua   produção;   representação   literária:   natureza,   função,   organização   e estrutura do texto literário; relações entre literatura, outras artes e outros saberes. 
  •   Estudo dos aspectos linguísticos em diferentes textos: recursos expressivos da língua,   procedimentos   de   construção   e   recepção   de   textos   -   organização   da macroestrutura semântica e a articulação entre idéias e proposições (relações lógico- semânticas). 
  •   Estudo   do   texto   argumentativo,   seus   gêneros   e   recursos   linguísticos: argumentação: tipo, gêneros e usos em língua portuguesa -   formas de apresentação de   diferentes   pontos   de   vista;   organização   e   progressão   textual;   papéis   sociais   e comunicativos dos interlocutores, relação entre usos e propósitos comunicativos, função sociocomunicativa do gênero, aspectos da dimensão espaçotemporal em que se produz o texto. 
  •   Estudo dos aspectos linguísticos da língua portuguesa: usos da língua: norma culta e variação linguística -   uso dos recursos linguísticos em relação ao contexto em que o texto é constituído: elementos de referência pessoal, temporal, espacial, registro linguístico, grau de formalidade, seleção lexical, tempos e modos verbais; uso dos recursos linguísticos em processo de coesão textual: elementos de articulação das sequências dos textos ou à construção da micro estrutura do texto. 
  •   Estudo dos gêneros digitais: tecnologia da comunicação e informação: impacto e função social -   o texto literário típico da cultura de massa: o suporte textual em gêneros digitais; a caracterização dos interlocutores na comunicação   tecnológica; os recursos linguísticos e os gêneros digitais; a função social das novas tecnologias. 2. Matemática e suas Tecnologias 
  •   Conhecimentos   numéricos :   operações em   conjuntos   numéricos   (naturais,   inteiros, racionais   e   reais),   desigualdades,   divisibilidade,   fatoração,   razões   e   proporções, porcentagem   e   juros,   relações   de   dependência   entre   grandezas,   sequências   e progressões, princípios de contagem. 
  •   Conhecimentos   geométricos :   características   das   figuras   geométricas   planas   e espaciais; grandezas, unidades de medida e escalas; comprimentos, áreas e volumes; ângulos;   posições de retas;   simetrias de figuras planas ou   espaciais;   congruência   e semelhança   de   triângulos;   teorema   de   Tales;   relações   métricas   nos   triângulos; circunferências; trigonometria do ângulo agudo. 
  •   Conhecimentos de estatística e probabilidade : representação e análise de dados; medidas de tendência central (médias, moda e mediana); desvios e variância; noções de probabilidade. 
  •   Conhecimentos algébricos : gráficos e funções; funções algébricas do 1.º e do 2.º graus, polinomiais, racionais, exponenciais e logarítmicas; equações e inequações; relações no ciclo trigonométrico e funções trigonométricas. 
  •   Conhecimentos   algébricos/geométricos :   plano   cartesiano;   retas;   circunferências; paralelismo e perpendicularidade, sistemas de equações. 3. Ciências da Natureza e suas Tecnologias 3.1 Física 
  •   Conhecimentos básicos e fundamentais -   Noções de ordem de grandeza. Notação Científica. Sistema Internacional de Unidades. Metodologia de investigação: a procura de regularidades e de sinais na interpretação física do mundo. Observações e mensurações: representação de grandezas físicas como grandezas mensuráveis. Ferramentas básicas: gráficos e vetores. Conceituação de grandezas vetoriais e escalares. Operações básicas com vetores. 
  •   O movimento, o equilíbrio e a descoberta de leis físicas   –   Grandezas fundamentais da mecânica: tempo, espaço, velocidade e aceleração. Relação histórica entre força e movimento. Descrições do movimento e sua interpretação: quantificação do movimento e sua descrição matemática e gráfica. Casos especiais de movimentos e suas regularidades observáveis. Conceito de inércia. Noção de sistemas de referência inerciais e não inerciais. Noção dinâmica de massa e quantidade de movimento (momento linear). Força e variação da quantidade de movimento. Leis de Newton. Centro de massa e a idéia de ponto material. Conceito de forças externas e internas. Lei da conservação da quantidade de movimento (momento linear) e teorema do impulso. Momento de uma força (torque). Condições de equilíbrio estático de ponto material e de corpos rígidos. Força de atrito, força peso, força normal de contato e tração. Diagramas de forças. Identificação das forças que atuam nos movimentos circulares. Noção de força centrípeta e sua quantificação. A hidrostática: aspectos históricos e variáveis relevantes. Empuxo. Princípios de Pascal, Arquimedes e Stevin: condições de flutuação, relação entre diferença de nível e pressão hidrostática.  •   Energia, trabalho e potência -   Conceituação de trabalho, energia e potência. Conceito de energia potencial e de energia cinética. Conservação de energia mecânica e dissipação de   energia.   Trabalho   da   força   gravitacional   e   energia   potencial   gravitacional.   Forças conservativas e dissipativas.  
  •   A Mecânica e o funcionamento do Universo -   Força peso. Aceleração gravitacional. Lei da Gravitação Universal. Leis de Kepler. Movimentos de corpos celestes. Influência na Terra: marés e variações climáticas. Concepções históricas sobre a origem do universo e sua evolução.  
  •   Fenômenos Elétricos e Magnéticos -   Carga elétrica e corrente elétrica. Lei de Coulomb. Campo elétrico e potencial elétrico. Linhas de campo. Superfícies equipotenciais. Poder das pontas. Blindagem. Capacitores. Efeito Joule. Lei de Ohm. Resistência elétrica e resistividade. Relações entre grandezas elétricas: tensão, corrente, potência e energia. Circuitos   elétricos   simples.   Correntes   contínua   e   alternada.   Medidores   elétricos. Representação   gráfica   de   circuitos. Símbolos   convencionais. Potência e   consumo de energia em dispositivos elétricos. Campo magnético. Imãs permanentes. Linhas de campo magnético. Campo magnético terrestre.  
  •   Oscilações, ondas, óptica e radiação -   Feixes e frentes de ondas. Reflexão e refração. Óptica   geométrica:   lentes   e   espelhos.   Formação   de   imagens.   Instrumentos   ópticos simples. Fenômenos ondulatórios. Pulsos e ondas. Período, frequência, ciclo. Propagação: relação entre velocidade, frequência e comprimento de onda. Ondas em diferentes meios de propagação.  
  •   O calor e os fenômenos térmicos -   Conceitos de calor e de temperatura. Escalas termométricas. Transferência de calor e equilíbrio térmico. Capacidade calorífica e calor específico. Condução do calor. Dilatação térmica. Mudanças de estado físico e calor latente de transformação. Comportamento de Gases ideais. Máquinas térmicas. Ciclo de Carnot.   Leis   da   Termodinâmica.   Aplicações   e   fenômenos   térmicos   de   uso   cotidiano. Compreensão de fenômenos climáticos relacionados ao ciclo da água.  3.2 Química  
  •   Transformações Químicas -   Evidências de transformações químicas. Interpretando transformações químicas. Sistemas Gasosos: Lei dos gases. Equação geral dos gases ideais, Princípio de Avogadro, conceito de molécula; massa molar, volume molar dos gases. Teoria cinética dos gases. Misturas gasosas. Modelo   corpuscular da matéria. Modelo atômico de Dalton. Natureza elétrica da matéria: Modelo Atômico de Thomson, Rutherford, Rutherford-Bohr. Átomos e sua estrutura. Número atômico, número de massa, isótopos, massa atômica. Elementos químicos e Tabela Periódica. Reações químicas.  
  •   Representação das transformações químicas -   Fórmulas químicas. Balanceamento de equações químicas. Aspectos quantitativos das transformações químicas. Leis ponderais das reações químicas. Determinação de fórmulas químicas. Grandezas Químicas: massa, volume, mol, massa molar, constante de Avogadro. Cálculos estequiométricos.  
  •   Materiais, suas propriedades e usos -   Propriedades de materiais. Estados físicos de materiais. Mudanças de estado. Misturas: tipos e métodos de separação. Substâncias químicas: classificação e características gerais. Metais e Ligas metálicas. Ferro, cobre e alumínio.   Ligações   metálicas.   Substâncias   iônicas:   características   e   propriedades. Substâncias   iônicas   do   grupo:   cloreto,   carbonato,   nitrato   e   sulfato.   Ligação   iônica. Substâncias moleculares: características e propriedades. Substâncias moleculares: H 2 , O 2 , N 2 ,   Cl 2 ,   NH 3 ,   H 2 O,   HCl,   CH 4 .   Ligação   Covalente.   Polaridade   de   moléculas.   Forças intermoleculares. Relação entre estruturas, propriedade e aplicação das substâncias. 
  •   Água   -   Ocorrência   e   importância   na   vida   animal   e   vegetal.   Ligação,   estrutura   e propriedades. Sistemas em Solução Aquosa: Soluções verdadeiras, soluções coloidais e suspensões.   Solubilidade.   Concentração   das   soluções.   Aspectos   qualitativos   das propriedades   coligativas   das   soluções.   Ácidos,   Bases,   Sais   e   Óxidos:   definição, classificação, propriedades, formulação e nomenclatura.   Conceitos de ácidos e base. Principais propriedades dos ácidos e bases: indicadores, condutibilidade elétrica, reação com metais, reação de neutralização.  
  •   Transformações Químicas e Energia -   Transformações químicas e energia calorífica. Calor   de   reação.   Entalpia.   Equações   termoquímicas.   Lei   de   Hess.   Transformações químicas e energia elétrica. Reação de oxirredução. Potenciais padrão de redução. Pilha. Eletrólise.   Leis   de   Faraday.   Transformações   nucleares.   Conceitos   fundamentais   da radioatividade.   Reações   de   fissão   e   fusão   nuclear.   Desintegração   radioativa   e radioisótopos.  
  •   Dinâmica das Transformações Químicas -   Transformações Químicas e velocidade. Velocidade de reação. Energia de ativação. Fatores que alteram a velocidade de reação: concentração, pressão, temperatura e catalisador.  
  •   Transformação   Química   e   Equilíbrio   -   Caracterização   do   sistema   em   equilíbrio. Constante de equilíbrio. Produto iônico da água, equilíbrio ácido-base e pH. Solubilidade dos sais e hidrólise. Fatores que alteram o sistema em equilíbrio. Aplicação da velocidade e do equilíbrio químico no cotidiano.  
  •   Compostos de Carbono -   Características gerais dos compostos orgânicos. Principais funções orgânicas. Estrutura e propriedades de Hidrocarbonetos. Estrutura e propriedades de   compostos   orgânicos   oxigenados.   Fermentação.   Estrutura   e   propriedades   de compostos orgânicos nitrogenados. Macromoléculas naturais e sintéticas. Noções básicas sobre polímeros. Amido, glicogênio e celulose. Borracha natural e sintética. Polietileno, poliestireno,   PVC, Teflon, náilon.   Óleos e   gorduras,   sabões e detergentes sintéticos. Proteínas e enzimas.  
  •   Relações da Química com as Tecnologias, a Sociedade e o Meio Ambiente   -  Química no cotidiano. Química na agricultura e na saúde. Química nos alimentos. Química e ambiente. Aspectos científico-tecnológicos, socioeconômicos e ambientais associados à obtenção ou produção de substâncias químicas. Indústria Química: obtenção e utilização do   cloro,   hidróxido   de   sódio,   ácido   sulfúrico,   amônia   e   ácido   nítrico.   Mineração   e Metalurgia.   Poluição   e   tratamento   de   água.   Poluição   atmosférica.   Contaminação   e proteção do ambiente.  
  •   Energias Químicas no Cotidiano -   Petróleo, gás natural e carvão. Madeira e hulha. Biomassa.   Biocombustíveis.   Impactos   ambientais   de   combustíveis   fosseis.   Energia nuclear. Lixo atômico. Vantagens e desvantagens do uso de energia nuclear. 3.3 Biologia  
  •   Moléculas, células e tecidos -   Estrutura e fisiologia celular: membrana, citoplasma e núcleo. Divisão celular. Aspectos bioquímicos das estruturas celulares. Aspectos gerais do metabolismo celular. Metabolismo energético: fotossíntese e respiração. Codificação da informação genética. Síntese protéica. Diferenciação celular. Principais tecidos animais e vegetais.   Origem   e   evolução   das   células.   Noções   sobre   células-tronco,   clonagem   e tecnologia do DNA recombinante. Aplicações de biotecnologia na produção de alimentos, fármacos e componentes biológicos. Aplicações de tecnologias relacionadas ao DNA a investigações   científicas,   determinação   da   paternidade,   investigação   criminal   e identificação   de   indivíduos.   Aspectos   éticos   relacionados   ao   desenvolvimento biotecnológico. Biotecnologia e sustentabilidade. 
  •   Hereditariedade e diversidade da vida -   Princípios básicos que regem a transmissão de características   hereditárias.   Concepções   pré-mendelianas   sobre   a   hereditariedade. Aspectos genéticos do funcionamento do corpo humano. Antígenos e anticorpos. Grupos sanguíneos, transplantes e doenças auto-imunes. Neoplasias e a influência de fatores ambientais. Mutações gênicas e cromossômicas. Aconselhamento genético. Fundamentos genéticos da evolução. Aspectos genéticos da formação e manutenção da diversidade biológica. 
  •   Identidade dos seres vivos -   Níveis de organização dos seres vivos. Vírus, procariontes e eucariontes. Autótrofos e heterótrofos. Seres unicelulares e pluricelulares. Sistemática e as grandes linhas da evolução dos seres vivos. Tipos de ciclo de vida. Evolução e padrões anatômicos e fisiológicos observados nos seres vivos. Funções vitais dos seres vivos e sua relação   com   a   adaptação   desses   organismos   a   diferentes   ambientes.   Embriologia, anatomia e fisiologia humana. Evolução humana. Biotecnologia e sistemática. 
  •   Ecologia e ciências ambientais -   Ecossistemas. Fatores bióticos e abióticos. Habitat e nicho ecológico. A comunidade biológica: teia alimentar, sucessão e comunidade clímax. Dinâmica de populações. Interações entre os seres vivos. Ciclos biogeoquímicos. Fluxo de energia no ecossistema. Biogeografia. Biomas brasileiros. Exploração e uso de recursos naturais.   Problemas   ambientais:   mudanças   climáticas,   efeito   estufa;   desmatamento; erosão; poluição da água, do solo e do ar. Conservação e recuperação de ecossistemas. Conservação da biodiversidade. Tecnologias ambientais. Noções de saneamento básico. Noções de legislação ambiental: água, florestas, unidades de conservação; biodiversidade. 
  •   Origem e evolução da vida -   A biologia como ciência: história, métodos, técnicas e experimentação. Hipóteses sobre a origem do Universo, da Terra e dos seres vivos. Teorias de evolução. Explicações pré-darwinistas para a modificação das espécies. A teoria evolutiva de Charles Darwin. Teoria sintética da evolução. Seleção artificial e seu impacto sobre ambientes naturais e sobre populações humanas. 
  •   Qualidade de vida das populações humanas -   Aspectos biológicos da pobreza e do desenvolvimento   humano.   Indicadores   sociais,   ambientais   e   econômicos.   Índice   de desenvolvimento   humano.   Principais   doenças   que   afetam   a   população   brasileira: caracterização,   prevenção   e   profilaxia.   Noções   de   primeiros   socorros.   Doenças sexualmente   transmissíveis.   Aspectos   sociais   da   biologia:   uso   indevido   de   drogas; gravidez na adolescência; obesidade. Violência e segurança pública. Exercícios físicos e vida   saudável.   Aspectos   biológicos   do   desenvolvimento   sustentável.   Legislação   e cidadania. 4. Ciências Humanas e suas Tecnologias 
  •   Diversidade cultural, conflitos e vida em sociedade  o   Cultura Material e imaterial; patrimônio e diversidade cultural no Brasil.  o   A Conquista da América. Conflitos entre europeus e indígenas na América colonial. A escravidão e formas de resistência indígena e africana na América.  o   História cultural dos povos africanos. A luta dos negros no Brasil e o negro na formação da sociedade brasileira.  o   História dos povos indígenas e a formação sócio-cultural brasileira.  o   Movimentos culturais no mundo ocidental e seus impactos na vida política e social. 
  •   Formas de organização social, movimentos sociais, pensamento político e ação do Estado  o   Cidadania e democracia na Antiguidade; Estado e direitos do cidadão a partir da Idade Moderna; democracia direta, indireta e representativa.  o   Revoluções sociais e políticas na Europa Moderna.  o   Formação   territorial   brasileira;   as   regiões   brasileiras;   políticas   de   reordenamento territorial.  o   As lutas pela conquista da independência política das colônias da América.  o   Grupos sociais em conflito no Brasil imperial e a construção da nação.  o   O desenvolvimento do pensamento liberal na sociedade capitalista e seus críticos nos séculos XIX e XX.  o   Políticas de colonização, migração, imigração e emigração no Brasil nos séculos XIX e XX.  o   A atuação dos grupos sociais e os grandes processos revolucionários do século XX: Revolução Bolchevique, Revolução Chinesa, Revolução Cubana.  o   Geopolítica e conflitos entre os séculos XIX e XX: Imperialismo, a ocupação da Ásia e da África, as Guerras Mundiais e a Guerra Fria. o   Os sistemas totalitários na Europa do século XX: nazi-fascista, franquismo, salazarismo e stalinismo. Ditaduras políticas na América Latina: Estado Novo no Brasil e ditaduras na América.  o   Conflitos político-culturais pós-Guerra Fria, reorganização política internacional e os organismos multilaterais nos séculos XX e XXI.  o   A luta pela conquista de direitos pelos cidadãos: direitos civis, humanos, políticos e sociais. Direitos sociais nas constituições brasileiras. Políticas afirmativas.  o   Vida urbana: redes e hierarquia nas cidades, pobreza e segregação espacial. 
  •   Características e transformações das estruturas produtivas  o   Diferentes   formas   de   organização   da   produção:   escravismo   antigo,   feudalismo, capitalismo, socialismo e suas diferentes experiências.  o   Economia agro-exportadora brasileira: complexo açucareiro; a mineração no período colonial; a economia cafeeira; a borracha na Amazônia.  o   Revolução Industrial: criação do sistema de fábrica na Europa e transformações no processo   de   produção.   Formação   do   espaço   urbano-industrial.   Transformações   na estrutura produtiva no século XX: o fordismo, o toyotismo, as novas técnicas de produção e seus impactos.  o   A industrialização brasileira, a urbanização e as transformações sociais e trabalhistas.  o   A globalização e as novas tecnologias de telecomunicação e suas consequências econômicas, políticas e sociais.  o   Produção   e   transformação   dos   espaços   agrários.   Modernização   da   agricultura   e estruturas agrárias tradicionais. O agronegócio, a agricultura familiar, os assalariados do campo e as lutas sociais no campo. A relação campo-cidade. 
  •   Os domínios naturais e a relação do ser humano com o ambiente  o   Relação homem-natureza, a apropriação dos recursos naturais pelas sociedades ao longo   do   tempo.   Impacto   ambiental   das   atividades   econômicas   no   Brasil.   Recursos minerais e energéticos: exploração e impactos. Recursos hídricos; bacias hidrográficas e seus aproveitamentos.  o   As questões ambientais contemporâneas: mudança climática, ilhas de calor, efeito estufa,   chuva   ácida,   a   destruição   da   camada   de   ozônio.   A   nova   ordem   ambiental internacional; políticas territoriais ambientais; uso e conservação dos recursos naturais, unidades de conservação, corredores ecológicos, zoneamento ecológico e econômico.  o   Origem e evolução do conceito de sustentabilidade.  o   Estrutura interna da terra. Estruturas do solo e do relevo; agentes internos e externos modeladores do relevo.  o   Situação geral da atmosfera e classificação climática. As características climáticas do território brasileiro.  o   Os grandes domínios da vegetação no Brasil e no mundo. 
  •   Representação espacial  o   Projeções cartográficas; leitura de mapas temáticos, físicos e políticos; tecnologias modernas aplicadas à cartografia.
  </matrizCurricular>
  <roteiro>${script}</roteiro>
  `;

  const messages = [
    {
      role: "system",
      content: prompt,
      createAt: Date.now(),
      updateAt: Date.now(),
      id: nanoid(),
    },
    {
      role: "user",
      content: message,
      createAt: Date.now(),
      updateAt: Date.now(),
      id: nanoid(),
    },
  ];

  return messages;
};

export const readRoteiro = (roteiro: string) => {
  const prompt = `Você é uma IA experiente em processamento de linguagem natural. Sua tarefa agora é extrair informações estruturadas de um **roteiro de atividade de laboratório** fornecido, produzindo uma saída em formato JSON **exatamente** conforme o esquema especificado, sem adicionar ou remover conteúdo do texto original.

**Instruções Importantes:**
- **Siga o esquema JSON abaixo rigorosamente**, usando as mesmas chaves e estrutura aninhada:
  - \`reasoning\`: raciocínio prévio da análise das etapas e do roteiro fornecido.
  - \`necessary_materials\`: lista de objetos, cada um com \`id\` (número sequencial começando em 1) e \`item\` (texto do material necessário, exatamente como no roteiro).
  - \`procedures\`: lista de objetos para cada passo do procedimento, cada qual com:
    - \`id\` (número do passo, sequência começando em 1),
    - \`procedure\` (texto **apenas do título do procedimento**, exatamente como no roteiro, sem incluir o restante do passo),
    - \`cognitive_hint\` (texto de qualquer dica ou pergunta reflexiva associada ao passo, ou string vazia se não houver),
    - \`intermediate_text\` (texto subsequente ao título do procedimento, contendo a descrição detalhada ou observacional, exatamente como no roteiro; utilize string vazia se não houver).
  - \`result_analysis\`: lista de objetos com \`id\` (número da pergunta, sequência começando em 1) e \`question\` (texto completo da pergunta de análise de resultados, fiel ao original).
- **Não modifique o texto original** nos campos extraídos. Copie exatamente como está no roteiro de entrada (mesma grafia, unidades, etc.), apenas removendo identificadores de lista (números, bullets) que serão substituídos pelos campos \`id\`.
- **Complete todos os campos do esquema**. Se algum conteúdo estiver ausente no roteiro:
  - Use lista vazia \`[]\` para \`necessary_materials\` ou \`result_analysis\` se essas seções não existirem.
  - Use \`""\` (string vazia) para \`cognitive_hint\` ou \`intermediate_text\` em um determinado passo se não houver conteúdo correspondente.
- **Raciocine passo a passo (Chain of Thought)**: Para garantir precisão, analise o texto em etapas lógicas, identifique claramente cada seção (materiais, passos, perguntas) e cada componente dentro dos passos. Insira esse raciocínio no campo \`reasoning\`.
- **Verifique duas vezes** antes de responder se o JSON está bem formatado e válido (chaves/colchetes balanceados, vírgulas, aspas) e se todos os campos necessários estão presentes segundo o esquema.

**Exemplo de Formato (para referência)** – Dado um trecho de roteiro e a extração esperada:
Entrada:
\`\`\`
Materiais:
- Item A
- Item B

Procedimento:
1. SEGURANÇA DO EXPERIMENTO - Inicialmente, coloque os equipamentos de proteção individual localizados no “Armário de EPIs”.
2. INOCULANDO A AMOSTRA EM CULTURA - Em seguida, identifique as placas e pressione ligeiramente o dedo antes de lavar na superfície do meio do ágar simples. (Dica: lembre de higienizar o dedo) Após essa ação, lave o polegar com sabão e pressione o dedo novamente sobre outra região do mesmo ágar.

Análise:
1. Pergunta 1?
2. Pergunta 2?
\`\`\`
Saída JSON:
\`\`\`json
{
  "reasoning": "Raciocínio prévio aqui...",
  "necessary_materials": [
    { "id": 1, "item": "Item A" },
    { "id": 2, "item": "Item B" }
  ],
  "procedures": [
    {
      "id": 1,
      "procedure": "SEGURANÇA DO EXPERIMENTO",
      "cognitive_hint": "",
      "intermediate_text": "Inicialmente, coloque os equipamentos de proteção individual localizados no “Armário de EPIs”."
    },
    {
      "id": 2,
      "procedure": "INOCULANDO A AMOSTRA EM CULTURA",
      "cognitive_hint": "Dica: lembre de higienizar o dedo",
      "intermediate_text": "Em seguida, identifique as placas e pressione ligeiramente o dedo antes de lavar na superfície do meio do ágar simples. Após essa ação, lave o polegar com sabão e pressione o dedo novamente sobre outra região do mesmo ágar."
    }
  ],
  "result_analysis": [
    { "id": 1, "question": "Pergunta 1?" },
    { "id": 2, "question": "Pergunta 2?" }
  ]
}
\`\`\`
*(Use este exemplo apenas como guia de formato; o conteúdo exato varia conforme o roteiro.)*

* IMPORTANTE: Não altere o texto do roteiro ao fazer a extração. Não crie mais passos além daqueles que que existem nem exclua ou altere a ordem. O intermediate_text é o todo o texto que vem após o título do passo do procedimento. Eventualmente, pode haver um parágrafo adicional de dica cognitiva.

Agora, **a seguir está o roteiro de atividade de laboratório para processar**. Aplique as instruções acima para extrair os dados e forneça **apenas o JSON final** como resposta:

[**Início do Roteiro**]

${roteiro}

[**Fim do Roteiro**]`;

  return prompt;
};
