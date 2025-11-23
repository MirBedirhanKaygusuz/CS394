import { ApiResponse, Command, FormatType } from '../types';

const API_BASE_URL = 'http://localhost:8080/api/editor';

export const editorService = {
  // Insert text at specific position
  insertText: async (position: number, text: string): Promise<ApiResponse<string>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position, text }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to insert text',
      };
    }
  },

  // Delete text at specific position
  deleteText: async (position: number, length: number): Promise<ApiResponse<string>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position, length }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete text',
      };
    }
  },

  // Replace text at specific position
  replaceText: async (position: number, oldText: string, newText: string): Promise<ApiResponse<string>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/replace`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position, oldText, newText }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to replace text',
      };
    }
  },

  // Undo last command
  undo: async (): Promise<ApiResponse<string>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/undo`, {
        method: 'POST',
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to undo',
      };
    }
  },

  // Redo last undone command
  redo: async (): Promise<ApiResponse<string>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/redo`, {
        method: 'POST',
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to redo',
      };
    }
  },

  // Format text (bold, italic, underline)
  formatText: async (formatType: FormatType): Promise<ApiResponse<string>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/format`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatType),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to format text',
      };
    }
  },

  // Get current document content
  getContent: async (): Promise<ApiResponse<string>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/content`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get content',
      };
    }
  },
};
