import ReactDomServer from 'react-dom/server';

export default function ImageBox() {
  return (
    <>
      <div className="algetec-platform-componentes-container mceNonEditable">
        <div className="algetec-platform-media-grid mceEditable">
          <figure className="image">
            <img
              src="https://placehold.jp/30/3d4070/ffffff/300x300.png?text=Imagem+exemplo"
              alt="Exemplo"
              width="300"
              height="300"
            />
            <figcaption>Título da imagem</figcaption>
          </figure>
          <figure className="image">
            <img
              src="https://placehold.jp/30/3d4070/ffffff/300x300.png?text=Imagem+exemplo"
              alt="Exemplo"
              width="300"
              height="300"
            />
            <figcaption>Título da imagem</figcaption>
          </figure>
          <figure className="image">
            <img
              src="https://placehold.jp/30/3d4070/ffffff/300x300.png?text=Imagem+exemplo"
              alt="Exemplo"
              width="300"
              height="300"
            />
            <figcaption>Título da imagem</figcaption>
          </figure>
          <figure className="image">
            <img
              src="https://placehold.jp/30/3d4070/ffffff/300x300.png?text=Imagem+exemplo"
              alt="Exemplo"
              width="300"
              height="300"
            />
            <figcaption>Título da imagem</figcaption>
          </figure>
        </div>
      </div>
      <br />
    </>
  );
}

export const imageBox = ReactDomServer.renderToString(<ImageBox />);
