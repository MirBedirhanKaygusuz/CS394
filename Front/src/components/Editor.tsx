import React, { useRef } from 'react';
import '../styles/Editor.css';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  onSelectionChange?: (start: number, end: number) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange, onSelectionChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleSelect = () => {
    if (textareaRef.current && onSelectionChange) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      onSelectionChange(start, end);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Tab key to insert actual tab instead of changing focus
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textareaRef.current?.selectionStart || 0;
      const end = textareaRef.current?.selectionEnd || 0;
      const newContent = content.substring(0, start) + '\t' + content.substring(end);
      onChange(newContent);

      // Set cursor position after tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }
      }, 0);
    }
  };

  return (
    <div className="editor-container">
      <textarea
        ref={textareaRef}
        className="editor-textarea"
        value={content}
        onChange={handleChange}
        onSelect={handleSelect}
        onKeyDown={handleKeyDown}
        placeholder="Start typing your document here..."
        spellCheck={true}
      />
    </div>
  );
};

export default Editor;
