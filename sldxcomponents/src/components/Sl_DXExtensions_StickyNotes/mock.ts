export const configProps = {
  label: 'Sticky Notes',
  value: '.StickyNotes',
  readOnly: false,
  hideLabel: false,
  key: '_sticky_notes_1',
  displayMode: 'LABELS_LEFT'
};

export const mockNotesList = [
  {
    pyNote: 'Remember to review the requirements document',
    pxCreateOperator: 'john.doe@company.com',
    pxCreateDateTime: '2025-12-10T10:30:00.000Z',
    pyDescription: '#FFE082',
    pyGUID: 'note_mock_001'
  },
  {
    pyNote: 'Team meeting at 3 PM tomorrow',
    pxCreateOperator: 'jane.smith@company.com',
    pxCreateDateTime: '2025-12-10T11:15:00.000Z',
    pyDescription: '#A5D6A7',
    pyGUID: 'note_mock_002'
  },
  {
    pyNote: 'Follow up with client about project status',
    pxCreateOperator: 'john.doe@company.com',
    pxCreateDateTime: '2025-12-10T14:00:00.000Z',
    pyDescription: '#90CAF9',
    pyGUID: 'note_mock_003'
  }
];

export const fieldMetadata = {
  classID: 'Work-MyCase',
  label: 'Sticky Notes',
  name: 'StickyNotes',
  type: 'Page List'
};
