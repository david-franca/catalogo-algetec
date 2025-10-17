import ReactDomServer from 'react-dom/server';

function ListContent() {
  return (
    <>
      <div className="algetec-platform-componentes-container mceNonEditable">
        <div className="algetec-bg-gold algetec-box-shadow-card">
          <h2 className="algetec-component-title mceEditable">✔ DESBRAVANDO MEU LABORATÓRIO</h2>
          <div className="algetec-component-text mceEditable">
            <ul>
              <li>O principal equipamento utilizado na microscopia é o microscópio;</li>
              <li>
                Os microscópios têm a finalidade de ampliar a imagem do objeto que se deseja estudar, com níveis de
                ampliação que podem variar de 2 vezes até centenas de milhares de vezes o tamanho do objeto original;
              </li>
              <li>Os microscópios ópticos utilizam a luz como princípio de funcionamento;</li>
              <li>As objetivas são lentes fixadas ao revólver com diferentes níveis de ampliação: 4X, 10X E 40X;</li>
              <li>
                Para se calcular o nível total de ampliação da imagem pelo microscópio deve-se multiplicar o aumento
                indicado pela objetiva pelo indicado na ocular.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export const listContent = ReactDomServer.renderToString(<ListContent />);
