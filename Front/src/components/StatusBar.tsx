import React, { useEffect, useState } from 'react';
import { StatusInfo } from '../types';
import '../styles/StatusBar.css';

interface StatusBarProps {
  content: string;
  lastSaved?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ content, lastSaved }) => {
  const [stats, setStats] = useState<StatusInfo>({
    wordCount: 0,
    charCount: 0,
    lineCount: 0,
  });

  useEffect(() => {
    // Calculate statistics (Observer Pattern - this component observes content changes)
    const calculateStats = () => {
      const trimmedContent = content.trim();

      // Character count
      const charCount = content.length;

      // Word count (split by whitespace and filter empty strings)
      const words = trimmedContent === '' ? [] : trimmedContent.split(/\s+/);
      const wordCount = words.length;

      // Line count
      const lineCount = content === '' ? 0 : content.split('\n').length;

      setStats({ wordCount, charCount, lineCount });
    };

    calculateStats();
  }, [content]);

  return (
    <footer className="status-bar">
      <div className="status-left">
        <span className="status-item">
          <strong>Lines:</strong> {stats.lineCount}
        </span>
        <span className="status-separator">|</span>
        <span className="status-item">
          <strong>Words:</strong> {stats.wordCount}
        </span>
        <span className="status-separator">|</span>
        <span className="status-item">
          <strong>Characters:</strong> {stats.charCount}
        </span>
      </div>

      <div className="status-right">
        {lastSaved && (
          <span className="status-item last-saved">
            💾 Last saved: {lastSaved}
          </span>
        )}
      </div>
    </footer>
  );
};

export default StatusBar;
