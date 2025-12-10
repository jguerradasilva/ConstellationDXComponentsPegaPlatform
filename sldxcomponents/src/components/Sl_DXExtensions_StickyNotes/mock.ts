export const configProps = {
  label: 'Sticky Notes',
  value: '.NotesList',
  readOnly: false,
  hideLabel: false,
  key: '_sticky_notes_1',
  displayMode: 'LABELS_LEFT'
};

export const mockNotesList = [
  {
    NoteText: 'Remember to review the requirements document',
    CreatedBy: 'john.doe@company.com',
    CreatedOn: '2025-12-10T10:30:00.000Z',
    Color: '#FFE082',
    pyGUID: 'note_mock_001'
  },
  {
    NoteText: 'Team meeting at 3 PM tomorrow',
    CreatedBy: 'jane.smith@company.com',
    CreatedOn: '2025-12-10T11:15:00.000Z',
    Color: '#A5D6A7',
    pyGUID: 'note_mock_002'
  },
  {
    NoteText: 'Follow up with client about project status',
    CreatedBy: 'john.doe@company.com',
    CreatedOn: '2025-12-10T14:00:00.000Z',
    Color: '#90CAF9',
    pyGUID: 'note_mock_003'
  }
];

export const fieldMetadata = {
  classID: 'Work-MyCase',
  label: 'Notes List',
  name: 'NotesList',
  type: 'Page List'
};
