/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react';

import SlDxExtensionsDigitalClock from './index';

import { configProps, operatorDetails } from './mock';

const meta: Meta<typeof SlDxExtensionsDigitalClock> = {
  title: 'SlDxExtensionsDigitalClock',
  component: SlDxExtensionsDigitalClock,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof SlDxExtensionsDigitalClock>;

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
    getOperatorDetails: () => {
      return new Promise(resolve => {
        resolve(operatorDetails);
      });
    }
  } as any;
};

export const BaseSlDxExtensionsDigitalClock: Story = (args: any) => {

  const props = {
    label: configProps.label,
    createOperator: configProps.createOperator,
    updateOperator: configProps.updateOperator,
    createDateTime: configProps.createDateTime,
    updateDateTime: configProps.updateDateTime,

    getPConnect: () => {
      return {
        getActionsApi: () => {
          return {
            updateFieldValue: () => {/* nothing */},
            triggerFieldChange: () => {/* nothing */}
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
      <SlDxExtensionsDigitalClock {...props} {...args} />
    </>
  );
};

BaseSlDxExtensionsDigitalClock.args = {
  createLabel: configProps.createLabel,
  updateLabel: configProps.updateLabel,
  hideLabel: configProps.hideLabel
};
