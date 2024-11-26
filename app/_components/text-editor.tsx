// Componente TextEditor
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

// Estilos dos botões e da área de texto
const buttonStyle = "p-1 border rounded-md mx-1 cursor-pointer text-xs";
const toolbarStyle = "mb-2 flex flex-wrap gap-2";
const textareaStyle = "w-full p-2 border rounded-md min-h-[200px] mt-2";

// Componente de editor de texto com barra de ferramentas
interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit], // Adiciona as extensões básicas do Tiptap
    content: value, // O conteúdo inicial do editor
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Atualiza o valor do campo sempre que o conteúdo mudar
    },
  });

  return (
    <div>
      {/* Barra de ferramentas com botões de formatação */}
      <div className={toolbarStyle}>
        <button
          type="button" // Definindo como tipo 'button' para evitar o envio do formulário
          className={buttonStyle}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          S
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() => editor?.chain().focus().setParagraph().run()}
        >
          Para
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          H4
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          H5
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          H6
        </button>
      </div>

      {/* Área de visualização do texto */}
      <div className={textareaStyle}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
