import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { extractRawText } from "mammoth";
import { fromError } from "zod-validation-error";

const { origin } = window.location;

// Configura o worker do PDF.js
GlobalWorkerOptions.workerSrc = `${origin}/pdf.worker.mjs`;

/**
 * Lê o conteúdo de um arquivo PDF e extrai o texto de todas as páginas.
 *
 * @param {File} file - O arquivo PDF a ser lido.
 * @returns {Promise<string>} Uma Promise que retorna com o texto extraído do PDF.
 * @throws {Error} Se ocorrer um erro ao ler o arquivo ou processar o PDF.
 *
 * @example
 * // Exemplo de uso:
 * const fileInput = document.querySelector('input[type="file"]');
 * fileInput.addEventListener('change', async (event) => {
 *   const file = event.target.files[0];
 *   try {
 *     const text = await readPDF(file);
 *     console.log('Texto extraído:', text);
 *   } catch (error) {
 *     console.error('Erro ao ler o PDF:', error);
 *   }
 * });
 */
export const readPDF = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await getDocument(typedArray).promise;

        const maxPages = pdf.numPages;
        const text = await Promise.all(
          Array.from({ length: maxPages }, async (_, index) => {
            try {
              const page = await pdf.getPage(index + 1);
              const textContent = await page.getTextContent();

              return textContent.items
                .map((item) => {
                  if ("str" in item) {
                    return item.str;
                  }
                  return "";
                })
                .join(" ");
            } catch (error) {
              console.error(`Erro ao processar a página ${index + 1}:`, error);
              return ""; // Retorna uma string vazia em caso de erro na página
            }
          })
        );

        resolve(text.join(" "));
      } catch (error) {
        console.error("Erro ao processar o PDF:", error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error("Erro ao ler o arquivo:", error);
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });

const readDOCX = async (
  file: File & { name: string; size: number }
): Promise<string> => {
  try {
    const reader = new FileReader();
    const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
    const extractedText = await extractRawText({ arrayBuffer });
    return extractedText.value;
  } catch (err) {
    return fromError(err).message;
  }
};

const readTXT = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });

export const readFileContent = async (file: File) => {
  const fileType = file.type;

  if (fileType === "application/pdf") {
    return readPDF(file);
  }
  if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return readDOCX(file);
  }
  if (fileType === "text/plain") {
    return readTXT(file);
  }
  throw new Error("Unsupported file type");
};
