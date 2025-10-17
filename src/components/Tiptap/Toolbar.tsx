/* eslint-disable react-hooks/rules-of-hooks */
import {
  Card,
  ColorPicker,
  Divider,
  Dropdown,
  Flex,
  MenuProps,
  Popover,
  Select,
  SelectProps,
  Typography,
} from "antd";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Code2Icon,
  CodeXmlIcon,
  EllipsisVerticalIcon,
  FileCode2Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  Link2OffIcon,
  ListEndIcon,
  ListIcon,
  ListOrderedIcon,
  LucideProps,
  MinusIcon,
  Redo2Icon,
  SquareCodeIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  Table2Icon,
  TextIcon,
  TextQuoteIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import {
  ForwardRefExoticComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useDisclosure, useTheme } from "@/hooks";
import { YoutubeOutlined } from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { Level } from "@tiptap/extension-heading";

import { ToolbarButton } from "./components/ToolbarButton";
import { IFrameModal } from "./modal/IFrameModal";
import { ImageModal } from "./modal/ImageModal";
import { SourceModal } from "./modal/SourceModal";
import { YoutubeModal } from "./modal/Youtube";

import type { Editor } from "@tiptap/react";
import { ManageImagesModal } from "./modal/ManageImagesModal";
const { Text: AntText } = Typography;

type IconType =
  | ForwardRefExoticComponent<Omit<AntdIconProps, "ref">>
  | ForwardRefExoticComponent<LucideProps>;
type MenuItem = Required<MenuProps>["items"][number];
type SelectItem = Required<SelectProps>["options"][number];

function CustomDivider() {
  return <Divider type="vertical" />;
}

function ColoredIcon({
  isActive,
  icon,
  disabled,
}: {
  isActive: boolean;
  icon: IconType;
  disabled: boolean;
}) {
  const { theme } = useTheme();
  const Icon = icon;
  const color = useMemo(() => {
    if (isActive || theme === "dark") {
      return "white";
    }
    return "black";
  }, [isActive, theme]);

  if (!icon) return null;

  return <Icon width={16} height={16} color={disabled ? "gray" : color} />;
}

export function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const { isEditable } = editor;

  if (!isEditable) return null;

  const youtubeDisclosure = useDisclosure();
  const linkDisclosure = useDisclosure();
  const imageDisclosure = useDisclosure();
  const manageImageDisclosure = useDisclosure();
  const iframeDisclosure = useDisclosure();
  const sourceDisclosure = useDisclosure();
  const [imageSource, setImageSource] = useState<"local" | "network">("local");

  const addImage = useCallback(
    (src: string) => {
      if (src) editor.chain().focus().setImage({ src }).run();

      imageDisclosure.onClose();
    },
    [editor, imageDisclosure]
  );

  const setLink = useCallback(() => {
    const href = window.prompt("URL");
    // cancelled
    if (!href) {
      return;
    }

    // empty
    if (href === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();

    linkDisclosure.onClose();
  }, [editor, linkDisclosure]);

  const setIframe = useCallback(
    (url: string) => {
      // cancelled
      if (!url) {
        return;
      }

      // update iframe
      editor.chain().focus().setIframe({ src: url }).run();

      iframeDisclosure.onClose();
    },
    [editor, iframeDisclosure]
  );

  const setDataSource = useCallback(
    (source: string) => {
      editor.commands.setContent(source);
      sourceDisclosure.onClose();
    },
    [editor, sourceDisclosure]
  );

  const listItems: MenuItem[] = [
    {
      key: "1",
      label: "Dividir item da lista",
      onClick: () => editor.chain().focus().splitListItem("listItem").run(),
      disabled: !editor.can().chain().focus().splitListItem("listItem").run(),
    },
    {
      key: "2",
      label: "Abaixar item da lista",
      onClick: () => editor.chain().focus().sinkListItem("listItem").run(),
      disabled: !editor.can().chain().focus().sinkListItem("listItem").run(),
    },
    {
      key: "3",
      label: "Elevar item da lista",
      onClick: () => editor.chain().focus().liftListItem("listItem").run(),
      disabled: !editor.can().chain().focus().liftListItem("listItem").run(),
    },
  ];

  const imageItems: MenuItem[] = [
    {
      key: "1",
      label: "Adicionar do computador",
      onClick: () => {
        setImageSource("local");
        imageDisclosure.onOpen();
      },
      disabled: false,
    },
    {
      key: "2",
      label: "Adicionar da internet",
      onClick: () => {
        setImageSource("network");
        imageDisclosure.onOpen();
      },
      disabled: false,
    },
    {
      key: "3",
      label: "Gerenciar imagens",
      onClick: manageImageDisclosure.onOpen,
      disabled: true,
    },
  ];

  const tableItems: MenuItem[] = [
    {
      key: "1",
      label: "Adicionar linha abaixo",
      onClick: () => editor.chain().focus().addRowAfter().run(),
      disabled: !editor.can().chain().focus().addRowAfter().run(),
    },
    {
      key: "2",
      label: "Adicionar linha acima",
      onClick: () => editor.chain().focus().addRowBefore().run(),
      disabled: !editor.can().chain().focus().addRowBefore().run(),
    },
    {
      key: "3",
      label: "Adicionar coluna à direita",
      onClick: () => editor.chain().focus().addColumnAfter().run(),
      disabled: !editor.can().chain().focus().addColumnAfter().run(),
    },
    {
      key: "4",
      label: "Adicionar coluna à esquerda",
      onClick: () => editor.chain().focus().addColumnBefore().run(),
      disabled: !editor.can().chain().focus().addColumnBefore().run(),
    },
    {
      key: "5",
      label: "Remover linha",
      onClick: () => editor.chain().focus().deleteRow().run(),
      disabled: !editor.can().chain().focus().deleteRow().run(),
    },
    {
      key: "6",
      label: "Remover coluna",
      onClick: () => editor.chain().focus().deleteColumn().run(),
      disabled: !editor.can().chain().focus().deleteColumn().run(),
    },
    {
      key: "7",
      label: "Remover tabela",
      onClick: () => editor.chain().focus().deleteTable().run(),
      disabled: !editor.can().chain().focus().deleteTable().run(),
    },
    {
      key: "8",
      label: "Mesclar células",
      onClick: () => editor.chain().focus().mergeCells().run(),
      disabled: !editor.can().chain().focus().mergeCells().run(),
    },
    {
      key: "9",
      label: "Dividir células",
      onClick: () => editor.chain().focus().splitCell().run(),
      disabled: !editor.can().chain().focus().splitCell().run(),
    },
    {
      key: "10",
      label: "Alternar cabeçalho nas colunas",
      onClick: () => editor.chain().focus().toggleHeaderColumn().run(),
      disabled: !editor.can().chain().focus().toggleHeaderColumn().run(),
    },
    {
      key: "11",
      label: "Alternar cabeçalho nas linhas",
      onClick: () => editor.chain().focus().toggleHeaderRow().run(),
      disabled: !editor.can().chain().focus().toggleHeaderRow().run(),
    },
    {
      key: "12",
      label: "Alternar cabeçalho na célula",
      onClick: () => editor.chain().focus().toggleHeaderCell().run(),
      disabled: !editor.can().chain().focus().toggleHeaderCell().run(),
    },
  ];

  const fontFamilyItems = useMemo<SelectItem[]>(
    () =>
      [
        "Arial",
        "Arial Black",
        "Courier New",
        "Georgia",
        "Helvetica",
        "Impact",
        "Lucida Console",
        "Lucida Sans Unicode",
        "Tahoma",
        "Times New Roman",
        "Verdana",
      ].map((fontFamily, id) => ({
        key: String(id + 1),
        label: (
          <Typography.Text style={{ fontFamily }}>{fontFamily}</Typography.Text>
        ),
        value: fontFamily,
        disabled: !editor.can().chain().focus().setFontFamily(fontFamily).run(),
      })),
    [editor] // Recalculate only when `editor` changes);
  );

  const levelItems = useMemo<Level[]>(
    () => Array.from({ length: 6 }, (_, i) => (i + 1) as Level),
    []
  );

  const getYoutubeData = useCallback(
    (url: string, height: number, width: number) => {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, width) || 640,
        height: Math.max(180, height) || 480,
      });

      youtubeDisclosure.onClose();
    },
    [editor, youtubeDisclosure]
  );

  const cancel = useCallback(() => {
    youtubeDisclosure.onClose();
    linkDisclosure.onClose();
    imageDisclosure.onClose();
    iframeDisclosure.onClose();
    sourceDisclosure.onClose();
    manageImageDisclosure.onClose();
  }, [
    youtubeDisclosure,
    linkDisclosure,
    imageDisclosure,
    iframeDisclosure,
    sourceDisclosure,
    manageImageDisclosure,
  ]);

  const characters = parseInt(editor?.storage.characterCount.characters(), 10);
  const words = parseInt(editor?.storage.characterCount.words(), 10);
  const source = useMemo(
    () =>
      sourceDisclosure.isOpen || manageImageDisclosure.isOpen
        ? editor?.getHTML()
        : "",
    [editor, sourceDisclosure, manageImageDisclosure]
  );

  useEffect(() => {
    if (!characters) {
      editor.commands.setFontFamily("Helvetica");
      editor.commands.setColor("#000");
    }
  }, [characters, editor]);

  return (
    <Card
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        background: "#f2f2f2",
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        border: "none",
      }}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Flex align="center" gap={4} wrap="wrap" style={{ margin: "1rem" }}>
        {/* Estilo */}
        <ToolbarButton
          title="Negrito"
          icon={BoldIcon}
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          title="Itálico"
          icon={ItalicIcon}
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          title="Tachado"
          icon={StrikethroughIcon}
          isActive={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        />
        <ToolbarButton
          title="Subscrito"
          icon={SubscriptIcon}
          isActive={editor.isActive("subscript")}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          disabled={!editor.can().chain().focus().toggleSubscript().run()}
        />
        <ToolbarButton
          title="Sobrescrito"
          icon={SuperscriptIcon}
          isActive={editor.isActive("superscript")}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          disabled={!editor.can().chain().focus().toggleSuperscript().run()}
        />
        <ToolbarButton
          title="Sublinhado"
          icon={UnderlineIcon}
          isActive={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        />

        <CustomDivider />
        {/* Formatação */}
        <ToolbarButton
          title="Alinhado a esquerda"
          icon={AlignLeftIcon}
          isActive={editor.isActive("left")}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          disabled={!editor.can().chain().focus().setTextAlign("left").run()}
        />
        <ToolbarButton
          title="Alinhado ao centro"
          icon={AlignCenterIcon}
          isActive={editor.isActive("center")}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          disabled={!editor.can().chain().focus().setTextAlign("center").run()}
        />
        <ToolbarButton
          title="Alinhado a direita"
          icon={AlignRightIcon}
          isActive={editor.isActive("right")}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          disabled={!editor.can().chain().focus().setTextAlign("right").run()}
        />
        <ToolbarButton
          title="Justificado"
          icon={AlignJustifyIcon}
          isActive={editor.isActive("justify")}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          disabled={!editor.can().chain().focus().setTextAlign("justify").run()}
        />

        <CustomDivider />

        {/* Parágrafo */}
        <ToolbarButton
          title="Parágrafo"
          icon={TextIcon}
          isActive={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
          disabled={false}
        />

        {/* Cabeçalhos */}
        {levelItems.map((level) => (
          <ToolbarButton
            key={level}
            title={`Cabeçalho ${level}`}
            icon={
              {
                1: Heading1Icon,
                2: Heading2Icon,
                3: Heading3Icon,
                4: Heading4Icon,
                5: Heading5Icon,
                6: Heading6Icon,
              }[level]
            }
            isActive={editor.isActive("heading", { level })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            disabled={
              !editor.can().chain().focus().toggleHeading({ level }).run()
            }
          />
        ))}
        <CustomDivider />

        {/* Fontes */}
        <Popover content="Seletor de fontes">
          <Select
            options={fontFamilyItems}
            onChange={(value) =>
              editor.chain().focus().setFontFamily(value).run()
            }
            value={editor.getAttributes("textStyle").fontFamily}
            disabled={!editor.can().chain().focus().setFontFamily("").run()}
            placeholder="Fonte"
            style={{ width: 200 }}
          />
        </Popover>

        <Popover content="Seletor de cores">
          <ColorPicker
            value={editor.getAttributes("textStyle").color}
            onChange={(value) =>
              editor.chain().focus().setColor(value.toHexString()).run()
            }
            disabled={!editor.can().chain().focus().setColor("").run()}
            allowClear
          />
        </Popover>

        <CustomDivider />

        {/* Código */}
        <ToolbarButton
          title="Código"
          icon={Code2Icon}
          isActive={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
        />
        <ToolbarButton
          title="Bloco de código"
          icon={SquareCodeIcon}
          isActive={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        />

        <CustomDivider />

        {/* Listas */}
        <Popover content="Lista não ordenada">
          <Dropdown.Button
            type={editor.isActive("bulletList") ? "primary" : "default"}
            icon={
              <ColoredIcon
                icon={EllipsisVerticalIcon}
                isActive={editor.isActive("bulletList")}
                disabled={
                  !editor.can().chain().focus().toggleBulletList().run()
                }
              />
            }
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            menu={{ items: listItems }}
            style={{ width: "fit-content" }}
          >
            <Flex align="center">
              <ColoredIcon
                icon={ListIcon}
                isActive={false}
                disabled={
                  !editor.can().chain().focus().toggleBulletList().run()
                }
              />
            </Flex>
          </Dropdown.Button>
        </Popover>
        <Popover content="Lista ordenada">
          <Dropdown.Button
            type={editor.isActive("orderedList") ? "primary" : "default"}
            icon={
              <ColoredIcon
                icon={EllipsisVerticalIcon}
                isActive={editor.isActive("orderedList")}
                disabled={
                  !editor.can().chain().focus().toggleOrderedList().run()
                }
              />
            }
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            menu={{ items: listItems }}
            style={{ width: "fit-content" }}
          >
            <Flex align="center">
              <ColoredIcon
                icon={ListOrderedIcon}
                isActive={editor.isActive("bulletList")}
                disabled={
                  !editor.can().chain().focus().toggleBulletList().run()
                }
              />
            </Flex>
          </Dropdown.Button>
        </Popover>
        <Popover content="Tabela">
          <Dropdown.Button
            type="default"
            icon={<EllipsisVerticalIcon width={16} height={16} />}
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            menu={{ items: tableItems }}
            style={{ width: "fit-content" }}
          >
            <Flex align="center">
              <Table2Icon width={16} height={16} />
            </Flex>
          </Dropdown.Button>
        </Popover>

        <CustomDivider />

        {/* Citações */}
        <ToolbarButton
          title="Citação"
          icon={TextQuoteIcon}
          isActive={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        />

        {/* Elementos diversos */}
        <ToolbarButton
          title="Linha horizontal"
          icon={MinusIcon}
          isActive={false}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={!editor.can().chain().focus().setHorizontalRule().run()}
        />
        <ToolbarButton
          title="Quebra de linha"
          icon={ListEndIcon}
          isActive={false}
          onClick={() => editor.chain().focus().setHardBreak().run()}
          disabled={!editor.can().chain().focus().setHardBreak().run()}
        />
        <CustomDivider />

        {/* Undo/Redo */}
        <ToolbarButton
          title="Desfazer"
          icon={Undo2Icon}
          isActive={false}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        />
        <ToolbarButton
          title="Refazer"
          icon={Redo2Icon}
          isActive={false}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        />

        <CustomDivider />

        <ToolbarButton
          title="Link"
          icon={Link2Icon}
          isActive={editor.isActive("link")}
          onClick={setLink}
          disabled={!editor.can().chain().focus().unsetLink().run()}
        />
        <ToolbarButton
          title="Remover link"
          icon={Link2OffIcon}
          isActive={editor.isActive("link")}
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.can().chain().focus().unsetLink().run()}
        />
        <CustomDivider />

        {/* Imagens */}
        <Popover content="Imagens">
          <Dropdown.Button
            type="default"
            icon={
              <ColoredIcon
                icon={EllipsisVerticalIcon}
                isActive={false}
                disabled={false}
              />
            }
            menu={{ items: imageItems }}
            style={{ width: "fit-content" }}
          >
            <Flex align="center">
              <ColoredIcon icon={ImageIcon} isActive={false} disabled={false} />
            </Flex>
          </Dropdown.Button>
        </Popover>

        <CustomDivider />
        <ToolbarButton
          title="Adicionar vídeo do YouTube"
          icon={YoutubeOutlined}
          onClick={youtubeDisclosure.onOpen}
          disabled={false}
          isActive={false}
        />
        <ToolbarButton
          title="Adicionar IFrame"
          icon={FileCode2Icon}
          onClick={iframeDisclosure.onOpen}
          isActive={false}
          disabled={false}
        />
        <ToolbarButton
          title="Código Fonte"
          icon={CodeXmlIcon}
          onClick={sourceDisclosure.onOpen}
          isActive={sourceDisclosure.isOpen}
          disabled={false}
        />

        <Flex align="center" justify="end" style={{ marginLeft: "auto" }}>
          <AntText type="secondary" strong>
            {characters} caracteres
          </AntText>
          <Divider type="vertical" style={{ borderColor: "#ccc" }} />
          <AntText type="secondary">{words} palavras</AntText>
        </Flex>
      </Flex>
      {youtubeDisclosure.isOpen && (
        <YoutubeModal
          isOpen={youtubeDisclosure.isOpen}
          onOk={getYoutubeData}
          onCancel={cancel}
        />
      )}
      {imageDisclosure.isOpen && (
        <ImageModal
          isOpen={imageDisclosure.isOpen}
          onOk={addImage}
          onCancel={cancel}
          source={imageSource}
        />
      )}
      {manageImageDisclosure.isOpen && (
        <ManageImagesModal
          isOpen={manageImageDisclosure.isOpen}
          onOk={manageImageDisclosure.onClose}
          onCancel={cancel}
          dataSource={source}
        />
      )}
      {iframeDisclosure.isOpen && (
        <IFrameModal
          isOpen={iframeDisclosure.isOpen}
          onOk={setIframe}
          onCancel={cancel}
        />
      )}
      {sourceDisclosure.isOpen && (
        <SourceModal
          isOpen={sourceDisclosure.isOpen}
          onOk={setDataSource}
          onCancel={cancel}
          dataSource={source}
        />
      )}

      <CustomDivider />
    </Card>
  );
}
