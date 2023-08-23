import React, { useEffect, useRef } from 'react'

function Editor ({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef()
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      // Italic: require('@ckeditor/ckeditor5-basic-styles/src/italic'),
      // Essentials: require('@ckeditor/ckeditor5-essentials/src').Essentials,
      // Paragraph: require('@ckeditor/ckeditor5-paragraph/src').Paragraph
    }
  }, [])
  return (
    <div>

      {editorLoaded
        ? (
          <CKEditor
            type=''
            name={name}
            editor={ClassicEditor}
            data={value}
            config={{
              toolbar: ['bold', 'italic']
            }}
            onChange={(event, editor) => {
              const data = editor.getData()
              // console.log({ event, editor, data })
              onChange(data)
            }}
          />
          )
        : (
          <div>Editor loading</div>
          )}
    </div>
  )
}

export default Editor
