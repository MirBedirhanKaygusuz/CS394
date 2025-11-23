import React from 'react';
import '../styles/Toolbar.css';

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onUndo,
  onRedo,
  onBold,
  onItalic,
  onUnderline,
  canUndo = true,
  canRedo = true,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button
          className="toolbar-button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          ↶ Undo
        </button>
        <button
          className="toolbar-button"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          ↷ Redo
        </button>
      </div>

      <div className="toolbar-separator"></div>

      <div className="toolbar-group">
        <button
          className="toolbar-button format-button"
          onClick={onBold}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          className="toolbar-button format-button"
          onClick={onItalic}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          className="toolbar-button format-button"
          onClick={onUnderline}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
