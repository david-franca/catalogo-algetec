import ReactDomServer from 'react-dom/server';

function Footer() {
  return (
    <>
      <footer className="algetec-componente-footer mceNonEditable">
        <p className="mceEditable">
          ALGETEC – SOLUÇÕES TECNOLÓGICAS EM EDUCAÇÃO CEP: 40260-215 | Fone: 71 3272-3504 E-mail: contato@algetec.com.br
          | Site: www.algetec.com.br
        </p>
      </footer>
      <br />
    </>
  );
}

export const footer = ReactDomServer.renderToString(<Footer />);
