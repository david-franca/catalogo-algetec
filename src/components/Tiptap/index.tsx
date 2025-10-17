import "./styles.css";
import "katex/dist/katex.min.css";

// load all languages with "all" or common languages with "common"
import { all, createLowlight } from "lowlight";

import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import FontFamily from "@tiptap/extension-font-family";
import Gapcursor from "@tiptap/extension-gapcursor";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, useImperativeHandle } from "react";
import Iframe from "./extension/iframe";

import { Toolbar } from "./Toolbar";

const lowlight = createLowlight(all);

// define your extension array
const extensions = [
  Blockquote,
  Bold,
  BulletList,
  CharacterCount,
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  Document,
  Dropcursor,
  Emoji.configure({
    emojis: gitHubEmojis,
  }),
  FontFamily.configure({
    types: [TextStyle.name, ListItem.name],
  }),
  Gapcursor,
  HardBreak,
  Heading,
  HorizontalRule,
  Iframe,
  Image,
  Link.configure({
    openOnClick: true,
    autolink: true,
    protocols: ["http", "https", "mailto"],
    linkOnPaste: true,
    defaultProtocol: "https",
  }),
  ListItem,
  Mathematics,
  OrderedList,
  Paragraph,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Subscript,
  Superscript,
  Table.configure({
    resizable: true,
  }),
  TableCell,
  TableHeader,
  TableRow,
  Text,
  TextAlign.configure({
    alignments: ["left", "center", "right", "justify"],
    types: ["paragraph", "heading"],
  }),
  TextStyle,
  Typography,
  Underline,
  Youtube.configure({
    nocookie: true,
  }),
];

// Clear marks
// Clear nodes

interface EditorRef {
  getEditorHtml: () => string;
}

interface TiptapProps {
  value?: string;
  readonly?: boolean;
}

export const Tiptap = forwardRef<EditorRef, TiptapProps>(
  ({ value, readonly = false }, ref) => {
    const editor = useEditor(
      {
        extensions,
        content: value,
        editable: !readonly,
        editorProps: { attributes: { spellcheck: "false" } },
      },
      [value, readonly]
    );

    useImperativeHandle(ref, () => ({
      getEditorHtml: () => editor?.getHTML() || "",
    }));

    if (!editor) {
      return null;
    }

    return (
      <>
        {readonly ? null : <Toolbar editor={editor} />}

        <EditorContent editor={editor} />
      </>
    );
  }
);
