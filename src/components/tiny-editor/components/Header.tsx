import ReactDomServer from 'react-dom/server';

function Header() {
  return (
    <>
      <div className="algetec-header-title mceNonEditable">
        <span className="mceEditable">Estróbilos, Flores e Inflorescências</span>
      </div>
      <br />
    </>
  );
}

export const header = ReactDomServer.renderToString(<Header />);
