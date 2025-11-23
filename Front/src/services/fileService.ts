import { ApiResponse, SaveFormat, Document } from '../types';

const API_BASE_URL = 'http://localhost:8080/api/file';

export const fileService = {
  // Create new document
  newDocument: async (type: SaveFormat = 'txt'): Promise<ApiResponse<Document>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create new document',
      };
    }
  },

  // Save document in specific format
  saveDocument: async (content: string, format: SaveFormat, filename: string): Promise<ApiResponse<string>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, format, filename }),
      });

      // If the response is a file download, handle it differently
      if (response.headers.get('Content-Disposition')) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        return {
          success: true,
          message: 'File downloaded successfully',
        };
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save document',
      };
    }
  },

  // Load document
  loadDocument: async (filename: string): Promise<ApiResponse<Document>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/load?filename=${encodeURIComponent(filename)}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load document',
      };
    }
  },
};
