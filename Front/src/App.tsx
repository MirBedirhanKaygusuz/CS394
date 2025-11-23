import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';
import StatusBar from './components/StatusBar';
import SaveAsModal from './components/SaveAsModal';
import RestorePointsModal from './components/RestorePointsModal';
import { editorService } from './services/editorService';
import { fileService } from './services/fileService';
import { snapshotService } from './services/snapshotService';
import { SaveFormat } from './types';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [lastSaved, setLastSaved] = useState<string>('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const autoSaveIntervalRef = useRef<number>();

  // Auto-save functionality (every 30 seconds)
  useEffect(() => {
    autoSaveIntervalRef.current = window.setInterval(async () => {
      if (content.trim() !== '') {
        const result = await snapshotService.createSnapshot(content, 'Auto-save');
        if (result.success) {
          const now = new Date().toLocaleTimeString();
          setLastSaved(now);
        }
      }
    }, 30000); // 30 seconds

    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, [content]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            if (!e.shiftKey) {
              e.preventDefault();
              handleUndo();
            }
            break;
          case 'y':
            e.preventDefault();
            handleRedo();
            break;
          case 'b':
            e.preventDefault();
            handleBold();
            break;
          case 'i':
            e.preventDefault();
            handleItalic();
            break;
          case 'u':
            e.preventDefault();
            handleUnderline();
            break;
          case 's':
            e.preventDefault();
            setShowSaveModal(true);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selection]);

  const handleUndo = async () => {
    const result = await editorService.undo();
    if (result.success && result.data) {
      setContent(result.data);
    } else {
      console.error('Undo failed:', result.error);
    }
  };

  const handleRedo = async () => {
    const result = await editorService.redo();
    if (result.success && result.data) {
      setContent(result.data);
    } else {
      console.error('Redo failed:', result.error);
    }
  };

  const handleBold = async () => {
    if (selection.start === selection.end) {
      alert('Please select text to format');
      return;
    }
    const result = await editorService.formatText({
      type: 'bold',
      start: selection.start,
      end: selection.end,
    });
    if (result.success && result.data) {
      setContent(result.data);
    }
  };

  const handleItalic = async () => {
    if (selection.start === selection.end) {
      alert('Please select text to format');
      return;
    }
    const result = await editorService.formatText({
      type: 'italic',
      start: selection.start,
      end: selection.end,
    });
    if (result.success && result.data) {
      setContent(result.data);
    }
  };

  const handleUnderline = async () => {
    if (selection.start === selection.end) {
      alert('Please select text to format');
      return;
    }
    const result = await editorService.formatText({
      type: 'underline',
      start: selection.start,
      end: selection.end,
    });
    if (result.success && result.data) {
      setContent(result.data);
    }
  };

  const handleNewDocument = async () => {
    if (content.trim() !== '' && !confirm('Create new document? Unsaved changes will be lost.')) {
      return;
    }
    const result = await fileService.newDocument();
    if (result.success) {
      setContent('');
      setLastSaved('');
    } else {
      alert(result.error || 'Failed to create new document');
    }
  };

  const handleSave = async (filename: string, format: SaveFormat) => {
    const fullFilename = `${filename}.${format}`;
    const result = await fileService.saveDocument(content, format, fullFilename);
    if (result.success) {
      alert(`File saved successfully as ${fullFilename}`);
      const now = new Date().toLocaleTimeString();
      setLastSaved(now);
    } else {
      alert(result.error || 'Failed to save file');
    }
  };

  const handleRestore = async (snapshotId: string) => {
    const result = await snapshotService.restoreSnapshot(snapshotId);
    if (result.success && result.data) {
      setContent(result.data);
      const now = new Date().toLocaleTimeString();
      setLastSaved(now);
    } else {
      alert(result.error || 'Failed to restore snapshot');
    }
  };

  const handleSelectionChange = (start: number, end: number) => {
    setSelection({ start, end });
  };

  return (
    <div className="app">
      <Header
        onNewDocument={handleNewDocument}
        onSave={() => setShowSaveModal(true)}
        onRestore={() => setShowRestoreModal(true)}
      />

      <Toolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        onBold={handleBold}
        onItalic={handleItalic}
        onUnderline={handleUnderline}
      />

      <Editor
        content={content}
        onChange={setContent}
        onSelectionChange={handleSelectionChange}
      />

      <StatusBar content={content} lastSaved={lastSaved} />

      <SaveAsModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSave}
      />

      <RestorePointsModal
        isOpen={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        onRestore={handleRestore}
      />
    </div>
  );
}

export default App;
