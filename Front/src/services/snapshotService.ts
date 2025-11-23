import { ApiResponse, Snapshot } from '../types';

const API_BASE_URL = 'http://localhost:8080/api/snapshot';

export const snapshotService = {
  // Create a new snapshot (for auto-save or manual save)
  createSnapshot: async (content: string, description?: string): Promise<ApiResponse<Snapshot>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, description }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create snapshot',
      };
    }
  },

  // Get list of all snapshots
  listSnapshots: async (): Promise<ApiResponse<Snapshot[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/list`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to list snapshots',
      };
    }
  },

  // Restore from a specific snapshot
  restoreSnapshot: async (id: string): Promise<ApiResponse<string>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/restore/${id}`, {
        method: 'POST',
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to restore snapshot',
      };
    }
  },

  // Delete a snapshot
  deleteSnapshot: async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete snapshot',
      };
    }
  },
};
