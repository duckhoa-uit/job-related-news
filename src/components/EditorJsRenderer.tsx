import { OutputData } from '@editorjs/editorjs'
import editorJsHtml from 'editorjs-html'
const EditorJsToHtml = editorJsHtml()

type Props = {
  data: OutputData
}
type ParsedContent = string | JSX.Element

const EditorJsRenderer = ({ data }: Props) => {
  if (!data) return <></>

  const html = EditorJsToHtml.parse(data) as ParsedContent[]
  console.log(
    '🚀 ~ file: EditorJsRenderer.tsx:14 ~ EditorJsRenderer ~ html:',
    html
  )
  return (
    <div className="prose max-w-full ">
      {html.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          )
        }
        return item
      })}
    </div>
  )
}

export default EditorJsRenderer
