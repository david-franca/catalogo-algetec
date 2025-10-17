import ReactDomServer from 'react-dom/server';

function Image() {
  return (
    <>
      <div className="algetec-platform-componentes-container mceNonEditable">
        <div className="algetec-image-component mceEditable">
          <figure className="image mceEditable">
            <img src="https://algetec-catalogo-app.grupoa.education/yYK4JFesoNQw@imagemDefault.png" alt="Exemplo" />
            <figcaption>Título da imagem</figcaption>
          </figure>
        </div>
      </div>
      <br />
    </>
  );
}

export const image = ReactDomServer.renderToString(<Image />);
