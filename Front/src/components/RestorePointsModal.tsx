import React, { useEffect, useState } from 'react';
import { Snapshot } from '../types';
import { snapshotService } from '../services/snapshotService';
import '../styles/Modal.css';

interface RestorePointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (snapshotId: string) => void;
}

const RestorePointsModal: React.FC<RestorePointsModalProps> = ({ isOpen, onClose, onRestore }) => {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadSnapshots();
    }
  }, [isOpen]);

  const loadSnapshots = async () => {
    setLoading(true);
    setError(null);
    const result = await snapshotService.listSnapshots();

    if (result.success && result.data) {
      setSnapshots(result.data);
    } else {
      setError(result.error || 'Failed to load snapshots');
    }
    setLoading(false);
  };

  const handleRestore = async (snapshotId: string) => {
    if (confirm('Are you sure you want to restore this version? Current changes will be lost.')) {
      onRestore(snapshotId);
      onClose();
    }
  };

  const handleDelete = async (snapshotId: string) => {
    if (confirm('Are you sure you want to delete this snapshot?')) {
      const result = await snapshotService.deleteSnapshot(snapshotId);
      if (result.success) {
        loadSnapshots(); // Reload the list
      } else {
        alert(result.error || 'Failed to delete snapshot');
      }
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
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
          <h2>Restore Points</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {loading && (
            <div className="empty-state">
              <div className="empty-state-icon">⏳</div>
              <p>Loading snapshots...</p>
            </div>
          )}

          {error && (
            <div className="empty-state">
              <div className="empty-state-icon">⚠️</div>
              <p style={{ color: '#e53e3e' }}>{error}</p>
              <button className="button button-primary" onClick={loadSnapshots} style={{ marginTop: '1rem' }}>
                Retry
              </button>
            </div>
          )}

          {!loading && !error && snapshots.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p>No snapshots yet</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Snapshots are created automatically every 30 seconds
              </p>
            </div>
          )}

          {!loading && !error && snapshots.length > 0 && (
            <div className="snapshot-list">
              {snapshots.map((snapshot) => (
                <div key={snapshot.id} className="snapshot-item">
                  <div className="snapshot-header">
                    <span className="snapshot-time">
                      🕒 {formatTime(snapshot.timestamp)}
                    </span>
                    <div className="snapshot-actions">
                      <button
                        className="snapshot-button"
                        onClick={() => handleRestore(snapshot.id)}
                      >
                        ↶ Restore
                      </button>
                      <button
                        className="snapshot-button"
                        onClick={() => handleDelete(snapshot.id)}
                        style={{ color: '#e53e3e' }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  {snapshot.description && (
                    <div style={{ fontSize: '0.85rem', color: '#718096', marginTop: '0.25rem' }}>
                      {snapshot.description}
                    </div>
                  )}
                  <div className="snapshot-preview">
                    {snapshot.content.substring(0, 100)}
                    {snapshot.content.length > 100 && '...'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="button button-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestorePointsModal;
