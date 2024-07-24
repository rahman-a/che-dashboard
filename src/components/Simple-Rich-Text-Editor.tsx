'use client'
import * as React from 'react'
import sanitizeHtml from 'sanitize-html'
import {
  BtnBold,
  BtnItalic,
  BtnBulletList,
  BtnClearFormatting,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  BtnUnderline,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg'

export interface ISimpleRichTextEditorProps {
  html: string
  setHTML: (html: string) => void
}

export function SimpleRichTextEditor({
  html,
  setHTML,
}: ISimpleRichTextEditorProps) {
  const toolbarRef = React.useRef<HTMLDivElement>(null)
  function onChange(e: ContentEditableEvent) {
    const cleanHtml = sanitizeHtml(e.target.value)
    setHTML(cleanHtml)
  }
  return (
    <EditorProvider>
      <Editor value={html} onChange={onChange} className='hidden'>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <Separator />
          <BtnBulletList />
          <BtnClearFormatting />
        </Toolbar>
      </Editor>
    </EditorProvider>
  )
}
