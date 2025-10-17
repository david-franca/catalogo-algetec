import { useMemo } from 'react';
import ReactDomServer from 'react-dom/server';

interface AlertBoxProps {
  type: 'info' | 'success' | 'alert';
}

function AlertBox({ type }: AlertBoxProps) {
  const image = useMemo<string>(() => {
    switch (type) {
      case 'alert':
        return 'https://algetec-catalogo-app.grupoa.education/TwujI0juLY4Z@alert.png';
      case 'info':
        return 'https://algetec-catalogo-app.grupoa.education/AFQMzqz-E5vM@info.png';
      case 'success':
        return 'https://algetec-catalogo-app.grupoa.education/FqShTwgyHvVz@success.png';
      default:
        return '#';
    }
  }, [type]);

  return (
    <>
      <div className="algetec-platform-componentes-container mceNonEditable">
        <div className="algetec-flex-col-gap algetec-center mceNonEditable">
          <div className={`algetec-notification algetec-box-shadow-card mceNonEditable ${type}`}>
            <div className="algetec-notification-icon mceNonEditable">
              <img className="mceNonEditable" src={image} alt="Alert Icon" width={35} height={35} />
            </div>
            <div>
              <div className="algetec-notification-content mceNonEditable">
                <span className="mceEditable">Saiba mais!</span>
                <p className="mceEditable">
                  Interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export const alertBox = ReactDomServer.renderToString(<AlertBox type="alert" />);

export const infoBox = ReactDomServer.renderToString(<AlertBox type="info" />);

export const successBox = ReactDomServer.renderToString(<AlertBox type="success" />);
