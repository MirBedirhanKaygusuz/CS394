# SmartEdit - Text Editor Frontend

A modern text editor built with React + TypeScript that demonstrates 7 design patterns through integration with a Java Spring Boot backend.

## 🎯 Design Patterns (Backend-Implemented)

This frontend integrates with a backend that implements the following design patterns:

1. **Command Pattern** - Undo/Redo functionality
2. **Memento Pattern** - Auto-save & Restore points
3. **Strategy Pattern** - Save in different formats (txt, md, html)
4. **Observer Pattern** - Status bar updates (word/char count)
5. **Singleton Pattern** - Editor manager
6. **Factory Method Pattern** - Document creation
7. **Decorator Pattern** - Text formatting (bold, italic, underline)

## 🚀 Features

- ✏️ **Rich Text Editor** - Clean, distraction-free writing experience
- ↶ **Undo/Redo** - Command pattern implementation (Ctrl+Z / Ctrl+Y)
- 💾 **Auto-Save** - Automatic snapshots every 30 seconds
- 🕒 **Restore Points** - View and restore previous versions
- 📄 **Multiple Formats** - Save as TXT, Markdown, or HTML
- ⌨️ **Keyboard Shortcuts** - Full keyboard support
- 📊 **Status Bar** - Real-time word, character, and line count
- 🎨 **Text Formatting** - Bold, Italic, Underline (Ctrl+B/I/U)

## 📁 Project Structure

```
Front/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # App header with navigation
│   │   ├── Toolbar.tsx      # Formatting toolbar
│   │   ├── Editor.tsx       # Main text editor
│   │   ├── StatusBar.tsx    # Status information
│   │   ├── SaveAsModal.tsx  # Save dialog
│   │   └── RestorePointsModal.tsx  # Restore dialog
│   ├── services/            # API service layer
│   │   ├── editorService.ts # Editor operations
│   │   ├── fileService.ts   # File operations
│   │   └── snapshotService.ts # Snapshot operations
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   ├── styles/              # Component styles
│   ├── App.tsx              # Main application
│   └── main.tsx             # Entry point
└── package.json
```

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:8080`

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run on `http://localhost:3000`

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+B` | Bold (requires text selection) |
| `Ctrl+I` | Italic (requires text selection) |
| `Ctrl+U` | Underline (requires text selection) |
| `Ctrl+S` | Open Save dialog |
| `Tab` | Insert tab character |

## 🔌 Backend API Integration

The frontend expects the following backend endpoints:

### Editor Operations
- `POST /api/editor/insert` - Insert text
- `POST /api/editor/delete` - Delete text
- `POST /api/editor/replace` - Replace text
- `POST /api/editor/undo` - Undo last command
- `POST /api/editor/redo` - Redo last undone command
- `POST /api/editor/format` - Format text (bold/italic/underline)
- `GET /api/editor/content` - Get current content

### File Operations
- `POST /api/file/new` - Create new document
- `POST /api/file/save` - Save document in specified format
- `GET /api/file/load` - Load document

### Snapshot Operations
- `POST /api/snapshot/create` - Create snapshot
- `GET /api/snapshot/list` - List all snapshots
- `POST /api/snapshot/restore/{id}` - Restore snapshot
- `DELETE /api/snapshot/delete/{id}` - Delete snapshot

## 🎨 Components Overview

### Header
- App branding
- Navigation buttons (New, Save As, Restore)

### Toolbar
- Undo/Redo buttons
- Text formatting buttons (Bold, Italic, Underline)

### Editor
- Main textarea for content
- Selection tracking for formatting
- Tab character support

### StatusBar
- Real-time word count
- Character count
- Line count
- Last saved timestamp

### SaveAsModal
- Format selection (TXT, MD, HTML)
- Filename input
- Format descriptions

### RestorePointsModal
- List of all snapshots
- Preview of snapshot content
- Restore and delete actions

## 🔄 Auto-Save Feature

The editor automatically creates snapshots every **30 seconds** when there's content to save. These snapshots appear in the "Restore Points" modal.

## 🎯 Usage

1. **Start writing** - Type directly in the editor
2. **Format text** - Select text and use toolbar buttons or keyboard shortcuts
3. **Save document** - Click "Save As" and choose format
4. **Restore versions** - Click "Restore" to view and restore previous snapshots
5. **Undo/Redo** - Use toolbar buttons or Ctrl+Z/Ctrl+Y

## 🌐 Backend Connection

Make sure your backend server is running on `http://localhost:8080` before starting the frontend. The API base URLs are configured in the service files:

- `src/services/editorService.ts`
- `src/services/fileService.ts`
- `src/services/snapshotService.ts`

To change the backend URL, update the `API_BASE_URL` constant in each service file.

## 🏗️ Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Development

```bash
# Run development server with hot reload
npm run dev

# Type checking
npm run type-check

# Lint code
npm run lint
```

## 📝 Notes

- This is the **frontend only** - backend must be implemented separately
- All business logic and design pattern implementations are in the backend
- Frontend is responsible for UI and API calls only
- Auto-save creates snapshots every 30 seconds
- Format operations require text selection

## 🤝 Contributing

This project is part of CS394 coursework demonstrating design patterns in software development.

## 📄 License

Educational project for CS394 course.
