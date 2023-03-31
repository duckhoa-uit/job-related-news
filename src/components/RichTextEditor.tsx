// ** Next Import
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(
  () => import('../components/Editor/editor').then((mod) => mod.default),
  {
    ssr: false,
  }
)

export default RichTextEditor
