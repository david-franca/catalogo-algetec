import { alertBox, infoBox, successBox } from './components/AlertBox';
import { contentCard } from './components/ContentCard';
import { footer } from './components/Footer';
import { header } from './components/Header';
import { image } from './components/Image';
import { imageBox } from './components/ImageBox';
import { listContent } from './components/ListContent';
import { script } from './components/Script';
import { textBox } from './components/TextBox';
import { title } from './components/Title';

export const editorButtons = {
  header,
  contentCard,
  footer,
  image,
  imageBox,
  listContent,
  textBox,
  title,
  alertBox,
  infoBox,
  successBox,
  script,
};

export const fonts = [
  'Andale Mono=andale mono,times',
  'Arial=arial,helvetica,sans-serif',
  'Arial Black=arial black,avant garde',
  'Book Antiqua=book antiqua,palatino',
  'Comic Sans MS=comic sans ms,sans-serif',
  'Courier New=courier new,courier',
  'Georgia=georgia,palatino',
  'Helvetica=helvetica',
  'Impact=impact,chicago',
  'Symbol=symbol',
  'Tahoma=tahoma,arial,helvetica,sans-serif',
  'Terminal=terminal,monaco',
  'Times New Roman=times new roman,times',
  'Trebuchet MS=trebuchet ms,geneva',
  'Verdana=verdana,geneva',
  'Webdings=webdings',
  'Wingdings=wingdings,zapf dingbats',
  'Lato=Lato, sans-serif',
  'Asap Condensed=Asap Condensed, sans-serif',
  'Inter=Inter, sans-serif',
]
  .sort((a, b) => a.localeCompare(b))
  .join('; ');
