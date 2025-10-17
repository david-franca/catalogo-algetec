import ReactDomServer from 'react-dom/server';

function TextBox() {
  return (
    <>
      <div className="algetec-platform-componentes-container mceNonEditable">
        <div className="algetec-flex-col-gap">
          <h2 className="algetec-component-title mceEditable">Estróbilos</h2>
          <div className="algetec-component-text">
            <p className="mceEditable">
              Porem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
              tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit
              sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
              scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
              bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
            </p>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export const textBox = ReactDomServer.renderToString(<TextBox />);
