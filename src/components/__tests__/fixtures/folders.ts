export const mockFolders = [
  {
    id: 'fold1',
    name: 'Folder 1',
    records: [
      {
        id: 'rec1',
        type: 'note',
        content: {
          text: 'This is note'
        }
      },
      {
        id: 'rec2',
        type: 'code',
        content: {
          code: '<p>This is paragraph</p>'
        }
      }
    ]
  },
  {
    id: 'fold2',
    name: 'Folder 2',
    records: [
      {
        id: 'rec1',
        type: 'note',
        content: {
          text: 'This is note'
        }
      }
    ]
  },
  { id: 'fold3', name: 'Folder 3', records: [] }
];
