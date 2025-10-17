import { Card, Col, Result, Row, Spin } from "antd";
import { useMemo } from "react";
import { toast } from "sonner";

import { useTheme } from "@/hooks";
import { useDocument } from "@/services/documents.service";
import { useUploadImage } from "@/services/image.service";
import { Editor } from "@tinymce/tinymce-react";

import { editorButtons, fonts } from "./components";
import { getConvertedClasses } from "@/utils/tailwindToCss";

interface TinyEditorProps {
  value?: string;
  onChange: (content: string) => void;
}

const { origin } = window.location;

export function TinyEditor({ value, onChange }: TinyEditorProps) {
  const { theme } = useTheme();

  const { data: document69, isLoading: document69Loading } = useDocument(69);
  const { data: document71, isLoading: document71Loading } = useDocument(71);

  const { mutateAsync: uploadImage } = useUploadImage();

  const fileUpload = (file: File) => {
    const formData = new FormData();
    formData.append("images", file);

    return uploadImage(formData)
      .then((res) => {
        const [link] = res.links;
        return link;
      })
      .catch((error) => {
        toast.error(error.data.message);
        return "";
      });
  };

  const convertElementStyles = (element: string) => {
    return element.replace(/class="([^"]*)"/g, (_match, classes: string) => {
      const estilos = classes
        .split(/\s+/)
        .map((classe) => getConvertedClasses(classe) || "")
        .join(" ");
      return `style="${estilos.trim()}"`;
    });
  };

  const isLoading = useMemo(
    () => document69Loading || document71Loading,
    [document69Loading, document71Loading]
  );

  if (isLoading) {
    return (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card className="w-full">
            <Result title="Carregando..." extra={<Spin size="large" />} />
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Editor
        tinymceScriptSrc={`${origin}/tinymce/tinymce.min.js`}
        value={value}
        onEditorChange={onChange}
        init={{
          noneditable_class: "mceNonEditable",
          editable_class: "mceEditable",
          image_caption: true,
          promotion: false,
          font_family_formats: fonts,
          min_height: 500,
          autoresize_bottom_margin: 50,
          paste_preprocess: async (editor, args) => {
            const { content } = args;
            const isImg = content.includes("<img");

            if (isImg) {
              const contentCopy = content.slice();

              const src = contentCopy.match(/src="([^"]*)"/);

              if (src) {
                const [url] = src;

                args.content = "";

                const [, link] = url.split('"');

                try {
                  const response = await fetch(link);

                  if (!response.ok) {
                    throw new Error();
                  }
                  const blob = await response.blob();
                  const file = new File([blob], "image.png", {
                    type: "image/png",
                  });
                  const newLink = await fileUpload(file);

                  if (!newLink) {
                    throw new Error();
                  }

                  const validateLink = await fetch(newLink);

                  if (!validateLink.ok) {
                    throw new Error();
                  }

                  const newContent = contentCopy.replace(link, newLink);
                  args.content = newContent;
                  editor.insertContent(`<p>${newContent}</p>`);
                } catch {
                  toast.error("Erro ao fazer processar a imagem");
                }
              }
            }
          },
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Asap+Condensed:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap')",
          plugins:
            "autoresize preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons accordion tiny_mce_wiris",
          menu: {
            custom: {
              title: "Componentes",
              items:
                "alerts texts images card algetecHeader algetecFooter algetecScript",
            },
          },
          menubar: "file edit view insert format tools table help custom",
          toolbar:
            "undo redo | basicTitle titleWithImage | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | print | pagebreak anchor codesample | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry  | ltr rtl | convert_tailwind",
          draggable_modal: true,
          extended_valid_elements: "*[.*]",
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          toolbar_mode: "wrap",
          toolbar_sticky: true,
          contextmenu: "link image table",
          language: "pt_BR",
          language_url: `${origin}/langs/pt_BR.cjs`,
          mathTypeParameters: {
            editorParameters: { language: "pt_BR" },
          },
          skin: theme === "dark" ? "oxide-dark" : "oxide",
          content_css: [
            theme === "dark" ? "dark" : "default",
            `${origin}/styles/editor.css`,
          ],
          file_picker_types: "image",
          file_picker_callback: (cb) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = () => {
              const file = input.files?.[0];
              if (!file) return;
              fileUpload(file)
                .then((link) => cb(link, { title: file.name }))
                .catch(() => {
                  toast.error("Erro ao fazer upload da imagem");
                });
            };
            input.click();
          },
          setup(editor) {
            editor.ui.registry.addNestedMenuItem("alerts", {
              text: "Alertas",
              getSubmenuItems: () => [
                {
                  type: "menuitem",
                  text: "Sucesso",
                  onAction: () =>
                    editor.insertContent(editorButtons.successBox),
                },
                {
                  type: "menuitem",
                  text: "Informação",
                  onAction: () => editor.insertContent(editorButtons.infoBox),
                },
                {
                  type: "menuitem",
                  text: "Erro",
                  onAction: () => editor.insertContent(editorButtons.alertBox),
                },
              ],
            });
            editor.ui.registry.addNestedMenuItem("texts", {
              text: "Textos",
              getSubmenuItems: () => [
                {
                  type: "menuitem",
                  text: "Título",
                  onAction: () => editor.insertContent(editorButtons.title),
                },
                {
                  type: "menuitem",
                  text: "Caixa de Texto",
                  onAction: () => editor.insertContent(editorButtons.textBox),
                },
                {
                  type: "menuitem",
                  text: "Caixa de Texto com cabeçalho",
                  onAction: () =>
                    editor.insertContent(editorButtons.listContent),
                },
              ],
            });
            editor.ui.registry.addNestedMenuItem("images", {
              text: "Imagens",
              getSubmenuItems: () => [
                {
                  type: "menuitem",
                  text: "Imagem",
                  onAction: () => editor.insertContent(editorButtons.image),
                },
                {
                  type: "menuitem",
                  text: "Caixa de Imagem",
                  onAction: () => editor.insertContent(editorButtons.imageBox),
                },
              ],
            });
            editor.ui.registry.addMenuItem("card", {
              text: "Card",
              onAction: () => editor.insertContent(editorButtons.contentCard),
            });
            editor.ui.registry.addMenuItem("algetecHeader", {
              text: "Cabeçalho",
              onAction: () => editor.insertContent(editorButtons.header),
            });
            editor.ui.registry.addMenuItem("algetecFooter", {
              text: "Rodapé",
              onAction: () => editor.insertContent(editorButtons.footer),
            });
            editor.ui.registry.addNestedMenuItem("algetecScript", {
              text: "Templates",
              getSubmenuItems: () => [
                {
                  type: "menuitem",
                  text: "Português",
                  onAction: () =>
                    editor.insertContent(
                      document69 ? document69.content : editorButtons.script
                    ),
                },
                {
                  type: "menuitem",
                  text: "Espanhol",
                  onAction: () =>
                    editor.insertContent(
                      document71 ? document71.content : editorButtons.script
                    ),
                },
              ],
            });
            editor.ui.registry.addIcon(
              "tailwind_icon",
              '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="auto" viewBox="0 0 24 24"><path d="M23.395 7.081c-.488-.207-1.053-.002-1.29.472-.224.448-.523.723-.914.838-.612.183-1.343-.052-1.685-.253-.451-.265-.974-.667-1.527-1.092C16.214 5.688 14.018 4 11 4 8.586 4 7.346 5.239 5.293 7.293 4.902 7.684 4.899 8.32 5.29 8.71 5.67 9.092 6.28 9.104 6.672 8.74c.01-.009.02-.019.03-.028.552-.426 4.03-.012 5.55 1.196C14.511 11.703 16.142 13 18 13c2.659 0 4.879-1.741 5.94-4.658C24.121 7.844 23.882 7.291 23.395 7.081zM18.395 14.081c-.488-.207-1.053-.002-1.29.472-.224.448-.523.723-.914.838-.612.18-1.343-.052-1.685-.253-.451-.265-.974-.667-1.527-1.092C11.214 12.688 9.018 11 6 11c-2.414 0-3.654 1.239-5.707 3.293-.391.391-.394 1.027-.003 1.417.38.382.991.395 1.383.03.01-.009.02-.019.03-.028.551-.426 4.031-.012 5.55 1.196C9.511 18.703 11.142 20 13 20c2.659 0 4.879-1.741 5.94-4.658C19.121 14.844 18.882 14.291 18.395 14.081z"></path></svg>'
            );
            editor.ui.registry.addButton("convert_tailwind", {
              tooltip: "Converter classes Tailwind para CSS inline",
              icon: "tailwind_icon",

              onAction: () => {
                const content = editor.getContent();
                const converted = convertElementStyles(content);
                editor.setContent(converted);
              },
            });
          },
        }}
      />
    </>
  );
}
