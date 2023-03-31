import Code from "@editorjs/code"
import Embed from "@editorjs/embed"
import Header from "@editorjs/header"
import Image from '@editorjs/image'
import InlineCode from "@editorjs/inline-code"
import LinkTool from "@editorjs/link"
import List from "@editorjs/list"
import Marker from "@editorjs/marker"
import Paragraph from "@editorjs/paragraph"
import Quote from "@editorjs/quote"
import Table from "@editorjs/table"

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    inlineToolbar: ["link"],
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  embed: Embed,
  table: Table,
  // warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media/uploadEditorImage`,
        // byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      }
    }
  },
  // raw: Raw,
  quote: Quote,
  marker: Marker,
  // checklist: CheckList,
  // delimiter: Delimiter,
  inlineCode: InlineCode,
  // simpleImage: SimpleImage,
}
