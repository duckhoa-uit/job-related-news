import React, { memo, useEffect, useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import { EDITOR_TOOLS } from './tools'

//props
type Props = {
  data?: OutputData
  onChange(val: OutputData): void
  holder: string
}

const Editor = ({ data, onChange, holder }: Props) => {
  //add a reference to editor
  const ref = useRef<EditorJS>()

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder,
        data,
        tools: EDITOR_TOOLS,
        async onChange(api) {
          const data = await api.saver.save()
          onChange(data)
        },
        hideToolbar: false,
      })
      ref.current = editor
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
      }
    }
  }, [])

  return <div id={holder} className="prose" />
}

export default memo(Editor)
