/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react';

import SlDxExtensionsStickyNotes from './index';

import { configProps, mockNotesList } from './mock';

const meta: Meta<typeof SlDxExtensionsStickyNotes> = {
  title: 'SlDxExtensionsStickyNotes',
  component: SlDxExtensionsStickyNotes,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof SlDxExtensionsStickyNotes>;

if (!window.PCore) {
  window.PCore = {} as any;
}

window.PCore.getLocaleUtils = () => {
  return {
    getLocaleValue: (value: any) => {
      return value;
    }
  } as any;
};

window.PCore.getUserApi = () => {
  return {
    getOperatorName: () => {
      return 'john.doe@company.com';
    }
  } as any;
};

export const BaseSlDxExtensionsStickyNotes: Story = (args: any) => {

  const props = {
    label: configProps.label,
    value: mockNotesList,
    readOnly: configProps.readOnly,

    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: (field: string, value: any) => {
              console.log('updateFieldValue called:', field, value);
            },
            triggerFieldChange: (field: string, value: any) => {
              console.log('triggerFieldChange called:', field, value);
            }
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
  };

  return (
    <>
      <SlDxExtensionsStickyNotes {...props} {...args} />
    </>
  );
};

BaseSlDxExtensionsStickyNotes.args = {
  label: configProps.label,
  readOnly: configProps.readOnly
};

export const EmptyState: any = (args: any) => {

  const props = {
    label: 'My Notes',
    value: [],
    readOnly: false,

    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: (field: string, value: any) => {
              console.log('updateFieldValue called:', field, value);
            },
            triggerFieldChange: (field: string, value: any) => {
              console.log('triggerFieldChange called:', field, value);
            }
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
  };

  return (
    <>
      <SlDxExtensionsStickyNotes {...props} {...args} />
    </>
  );
};

export const ReadOnlyMode: any = (args: any) => {

  const props = {
    label: 'Sticky Notes (Read Only)',
    value: mockNotesList,
    readOnly: true,

    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: (field: string, value: any) => {
              console.log('updateFieldValue called:', field, value);
            },
            triggerFieldChange: (field: string, value: any) => {
              console.log('triggerFieldChange called:', field, value);
            }
          };
        },
        ignoreSuggestion: () => {/* nothing */},
        acceptSuggestion: () => {/* nothing */},
        setInheritedProps: () => {/* nothing */},
        resolveConfigProps: () => {/* nothing */}
      };
    }
  };

  return (
    <>
      <SlDxExtensionsStickyNotes {...props} {...args} />
    </>
  );
};
