import { TinyMCE } from "tinymce";
import { twi } from "tw-to-css";
declare global {
  interface Window {
    tinymce: TinyMCE;
    twi: typeof twi;
  }
}
