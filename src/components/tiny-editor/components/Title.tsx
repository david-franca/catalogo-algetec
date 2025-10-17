import ReactDomServer from 'react-dom/server';

function Title() {
  return (
    <>
      <div className="algetec-platform-componentes-container mceNonEditable">
        <h2 className="algetec-component-title mceEditable">Estróbilos</h2>
      </div>
      <br />
    </>
  );
}

export const title = ReactDomServer.renderToString(<Title />);
