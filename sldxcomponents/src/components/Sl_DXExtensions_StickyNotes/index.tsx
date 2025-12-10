import { useState, useEffect } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
import type { PConnProps } from './PConnProps';
import './create-nonce';
import StyledSlDxExtensionsStickyNotesWrapper from './styles';

// Note interface matching .StickyNotes Page List (@baseclass)
interface Note {
  pyNote?: string;             // Note text content
  pxCreateOperator?: string;   // Created by operator (standard)
  pxCreateDateTime?: string;   // Created date/time (standard)
  pyDescription?: string;      // Color description (standard)
  pyGUID?: string;             // Unique identifier (standard)
}

// Component props interface
interface SlDxExtensionsStickyNotesProps extends PConnProps {
  label?: string;
  value?: any;
  readOnly?: boolean;
  testId?: string;
}

// Available colors for sticky notes
const AVAILABLE_COLORS = [
  '#FFE082', // Yellow
  '#A5D6A7', // Green
  '#90CAF9', // Blue
  '#F48FB1', // Pink
  '#CE93D8', // Purple
  '#FFAB91'  // Orange
];

// Component
function SlDxExtensionsStickyNotes(props: SlDxExtensionsStickyNotesProps) {
  const { 
    label = 'Sticky Notes',
    value = [],
    readOnly = false,
    testId,
    getPConnect
  } = props;
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);

  // Initialize notes from props.value (using .StickyNotes Page List)
  useEffect(() => {
    if (Array.isArray(value)) {
      setNotes(value);
    } else if (value && typeof value === 'object') {
      // Handle .StickyNotes Page List structure
      const notesArray = value.StickyNotes || [];
      setNotes(Array.isArray(notesArray) ? notesArray : []);
    }
  }, [value]);

  // Get PConnect actions
  const pConn = getPConnect();
  const actionsApi = pConn?.getActionsApi ? pConn.getActionsApi() : null;

  // Get current user info
  const getCurrentUser = () => {
    try {
      if (window.PCore && window.PCore.getUserApi) {
        const userApi = window.PCore.getUserApi() as any;
        return userApi.getOperatorName?.() || 'System';
      }
    } catch (error) {
      console.warn('Could not retrieve user info:', error);
    }
    return 'System';
  };

  // Publish results to Pega Runtime (using .StickyNotes Page List)
  const publishToPega = (updatedNotes: Note[]) => {
    try {
      if (actionsApi && actionsApi.updateFieldValue) {
        // Update .StickyNotes Page List
        actionsApi.updateFieldValue('.StickyNotes', updatedNotes);
      }
      
      // Trigger field change event
      if (actionsApi && actionsApi.triggerFieldChange) {
        actionsApi.triggerFieldChange('.StickyNotes', updatedNotes);
      }
    } catch (error) {
      console.error('Error publishing to Pega:', error);
    }
  };

  // Add new note using .StickyNotes structure
  const handleAddNote = () => {
    const newNote: Note = {
      pyNote: '',
      pxCreateOperator: getCurrentUser(),
      pxCreateDateTime: new Date().toISOString(),
      pyDescription: AVAILABLE_COLORS[0],
      pyGUID: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setEditingNoteIndex(updatedNotes.length - 1);
    publishToPega(updatedNotes);
  };

  // Update note text using pyNote property
  const handleNoteTextChange = (index: number, text: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = {
      ...updatedNotes[index],
      pyNote: text
    };
    setNotes(updatedNotes);
    publishToPega(updatedNotes);
  };

  // Update note color using pyDescription property
  const handleColorChange = (index: number, color: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = {
      ...updatedNotes[index],
      pyDescription: color
    };
    setNotes(updatedNotes);
    publishToPega(updatedNotes);
  };

  // Delete note
  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    if (editingNoteIndex === index) {
      setEditingNoteIndex(null);
    }
    publishToPega(updatedNotes);
  };

  // Format date for display
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <StyledSlDxExtensionsStickyNotesWrapper data-testid={testId}>
      <div className="sticky-notes-header">
        <h3>{label}</h3>
        {!readOnly && (
          <button 
            className="add-note-button" 
            onClick={handleAddNote}
            type="button"
            title="Click to add a new sticky note"
          >
            <span className="button-icon">📝</span>
            <span className="button-text">Add Note</span>
          </button>
        )}
      </div>

      {notes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p>No notes yet</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Click &quot;Add Note&quot; to create your first sticky note
          </p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note, index) => (
            <div key={note.pyGUID || `note-${note.pxCreateDateTime}-${index}`} className="sticky-note">
              <div 
                className="note-color-strip" 
                style={{ backgroundColor: note.pyDescription || AVAILABLE_COLORS[0] }}
              />
              
              <div className="note-header">
                <div className="color-picker-container">
                  {!readOnly && AVAILABLE_COLORS.map((color) => (
                    <div
                      key={color}
                      className={`color-option ${note.pyDescription === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(index, color)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
                
                {!readOnly && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteNote(index)}
                    type="button"
                    aria-label="Delete note"
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>

              <div className="note-content">
                {!readOnly ? (
                  <textarea
                    value={note.pyNote || ''}
                    onChange={(e) => handleNoteTextChange(index, e.target.value)}
                    onFocus={() => setEditingNoteIndex(index)}
                    onBlur={() => setEditingNoteIndex(null)}
                    placeholder="Type your note here..."
                    disabled={readOnly}
                  />
                ) : (
                  <div className="note-text-display">
                    {note.pyNote || '(Empty note)'}
                  </div>
                )}
              </div>

              <div className="note-footer">
                <div className="note-metadata">
                  <span className="created-by">{note.pxCreateOperator}</span>
                  <span className="created-on">{formatDate(note.pxCreateDateTime)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </StyledSlDxExtensionsStickyNotesWrapper>
  );
}

export default withConfiguration(SlDxExtensionsStickyNotes);
