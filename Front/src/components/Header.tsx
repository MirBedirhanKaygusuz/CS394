import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  onNewDocument: () => void;
  onSave: () => void;
  onRestore: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewDocument, onSave, onRestore }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-title">SmartEdit</h1>
        <span className="app-subtitle">Text Editor with Design Patterns</span>
      </div>

      <nav className="header-nav">
        <button className="nav-button" onClick={onNewDocument} title="New Document">
          📄 New
        </button>
        <button className="nav-button" onClick={onSave} title="Save As...">
          💾 Save As
        </button>
        <button className="nav-button" onClick={onRestore} title="Restore Points">
          🕒 Restore
        </button>
      </nav>
    </header>
  );
};

export default Header;
