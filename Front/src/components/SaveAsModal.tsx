import React, { useState } from 'react';
import { SaveFormat } from '../types';
import '../styles/Modal.css';

interface SaveAsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (filename: string, format: SaveFormat) => void;
}

const SaveAsModal: React.FC<SaveAsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [filename, setFilename] = useState('document');
  const [format, setFormat] = useState<SaveFormat>('txt');

  const handleSave = () => {
    if (filename.trim() === '') {
      alert('Please enter a filename');
      return;
    }
    onSave(filename, format);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Save As</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="filename">Filename:</label>
            <input
              type="text"
              id="filename"
              className="form-input"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter filename..."
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="format">Format:</label>
            <select
              id="format"
              className="form-select"
              value={format}
              onChange={(e) => setFormat(e.target.value as SaveFormat)}
            >
              <option value="txt">Text (.txt)</option>
              <option value="md">Markdown (.md)</option>
              <option value="html">HTML (.html)</option>
            </select>
          </div>

          <div className="format-info">
            {format === 'txt' && (
              <p>💡 Plain text format - Simple and universal</p>
            )}
            {format === 'md' && (
              <p>💡 Markdown format - Bold/italic will be converted to **bold**/*italic*</p>
            )}
            {format === 'html' && (
              <p>💡 HTML format - Full HTML document with proper tags</p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="button button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="button button-primary" onClick={handleSave}>
            💾 Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveAsModal;
