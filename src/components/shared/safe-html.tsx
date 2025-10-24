import React from "react";

import parse, {
  type DOMNode,
  domToReact,
  Element,
  type HTMLReactParserOptions,
  Text,
} from "html-react-parser";

export interface SafeHTMLProps {
  /** O conteúdo HTML em formato de string a ser renderizado de forma segura. */
  html?: string | null;
}

/**
 * Um componente que renderiza uma string de HTML como componentes React,
 * aplicando estilos do Tailwind CSS a tags comuns e limpando elementos vazios.
 *
 * @component
 * @param {SafeHTMLProps} props - As propriedades do componente.
 * @param {string} props.html - A string HTML a ser parseada e renderizada.
 * @returns {React.ReactElement} Um elemento `div` contendo o HTML renderizado e estilizado.
 *
 * @example
 * const myHtml = "<h2>Título</h2><p>Este é um parágrafo com <strong>negrito</strong>.</p>";
 * return <SafeHTML html={myHtml} />;
 *
 * @see https://github.com/remarkablemark/html-react-parser
 */
export const SafeHTML = ({ html }: SafeHTMLProps): React.ReactElement => {
  // Opções de configuração para o parser de HTML.
  const options: HTMLReactParserOptions = {
    /**
     * A função `replace` é chamada para cada nó no HTML.
     * Ela nos permite substituir um nó HTML por um componente React customizado.
     */
    replace: (node) => {
      // Verifica se o nó é um elemento HTML (ex: <p>, <h1>), e não um texto ou comentário.
      if (node instanceof Element) {
        const { name, attribs, children } = node;

        // Converte os filhos do nó atual para o tipo esperado pela função `domToReact`.
        const domNode = children as DOMNode[];

        // Lista de tags que serão verificadas para remoção caso estejam vazias.
        const tagsToClean = [
          "p",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "li",
          "ul",
          "ol",
        ];

        // Lógica para limpar tags "vazias" (ex: <p>&nbsp;</p> ou <p><br></p>).
        if (tagsToClean.includes(name)) {
          // Verifica se o nó não tem filhos ou se todos os filhos são "inúteis" (quebras de linha ou texto vazio).
          const isNodeEmpty = domNode.every((child) => {
            // Considera <br> como um filho "inútil" no contexto de um parágrafo vazio.
            if (child instanceof Element && child.name === "br") {
              return true;
            }
            // Considera um nó de texto que só contém espaços em branco como "inútil".
            if (child instanceof Text && !child.data.trim()) {
              return true;
            }
            // Se for qualquer outro tipo de conteúdo (texto real, outra tag), o nó não é considerado vazio.
            return false;
          });

          // Se o nó for considerado vazio, retorna um fragmento vazio para removê-lo da árvore final.
          if (domNode.length === 0 || isNodeEmpty) {
            return <></>;
          }
        }

        // O `switch` aplica estilos do Tailwind CSS para cada tipo de tag HTML suportada.
        // `domToReact(domNode, options)` é chamado recursivamente para processar os filhos da tag atual,
        // garantindo que todo o aninhamento de tags seja estilizado corretamente.
        switch (name) {
          case "h1":
            return (
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {domToReact(domNode, options)}
              </h1>
            );
          case "h2":
            return (
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                {domToReact(domNode, options)}
              </h2>
            );
          case "h3":
            return (
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-white mt-4 mb-2">
                {domToReact(domNode, options)}
              </h3>
            );
          case "h4":
            return (
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white mt-4 mb-2">
                {domToReact(domNode, options)}
              </h3>
            );
          case "h5":
            return (
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white mt-4 mb-2">
                {domToReact(domNode, options)}
              </h3>
            );
          case "p":
            return (
              <p className="text-gray-700 dark:text-white leading-relaxed mb-4">
                {domToReact(domNode, options)}
              </p>
            );
          case "strong":
            return (
              <strong className="font-semibold text-gray-900 dark:text-white">
                {domToReact(domNode, options)}
              </strong>
            );
          case "em":
            return (
              <em className="italic text-gray-800 dark:text-white">
                {domToReact(domNode, options)}
              </em>
            );
          case "ul":
            return (
              <ul className="list-disc list-inside space-y-1 pl-5 mb-4">
                {domToReact(domNode, options)}
              </ul>
            );
          case "ol":
            return (
              <ol className="list-decimal list-inside pl-5 mb-4">
                {domToReact(domNode, options)}
              </ol>
            );
          case "li":
            return (
              <li className="text-gray-700 dark:text-white">
                {domToReact(domNode, options)}
              </li>
            );
          case "a":
            return (
              <a
                href={attribs?.href}
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {domToReact(domNode, options)}
              </a>
            );
          case "blockquote":
            return (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                {domToReact(domNode, options)}
              </blockquote>
            );
          case "code":
            return (
              <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono text-gray-800">
                {domToReact(domNode, options)}
              </code>
            );
          case "pre":
            return (
              <pre className="bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto mb-4 text-sm">
                {domToReact(domNode, options)}
              </pre>
            );
          case "img": {
            const src = attribs?.src;

            // Verifica se o src existe e é um link absoluto (http, https) ou base64 (data:)
            if (src && (src.startsWith("http") || src.startsWith("data:"))) {
              // Se for válido, renderiza a imagem (com alguns estilos)
              return (
                <img
                  {...attribs} // Passa todos os atributos (src, alt, etc.)
                  className="max-w-full h-auto rounded-lg my-4"
                />
              );
            }
            return <></>;
          }
        }
      }
    },
  };

  if (!html) {
    return <></>;
  }

  // A `div` externa usa a classe `prose` do Tailwind Typography para aplicar estilos base
  // a elementos de texto, e `max-w-none` para remover a restrição de largura padrão do `prose`.
  // A função `parse` executa a conversão da string HTML para componentes React com as opções definidas.
  return <div className="prose max-w-none">{parse(html, options)}</div>;
};
