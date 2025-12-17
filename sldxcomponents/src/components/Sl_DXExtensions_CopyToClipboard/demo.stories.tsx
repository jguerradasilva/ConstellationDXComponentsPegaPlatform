import type { StoryObj } from '@storybook/react';
import CopyToClipboard from './index';
import { pyReviewRaw, storyBookStyles } from './mock';

export default {
  title: 'Fields/Copy to Clipboard',
  component: CopyToClipboard,
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label'
    },
    value: {
      control: 'text',
      description: 'Text value to be copied'
    },
    hideLabel: {
      control: 'boolean',
      description: 'Hide the label'
    },
    buttonPosition: {
      control: 'select',
      options: ['right', 'left'],
      description: 'Position of the copy button'
    },
    showIcon: {
      control: 'boolean',
      description: 'Show emoji icon or text'
    },
    successMessage: {
      control: 'text',
      description: 'Message shown on successful copy'
    },
    errorMessage: {
      control: 'text',
      description: 'Message shown on copy failure'
    }
  }
};

const render = (args: any) => {
  return (
    <div style={storyBookStyles}>
      <CopyToClipboard {...args} />
    </div>
  );
};

type Story = StoryObj<typeof CopyToClipboard>;

export const Default: Story = {
  render,
  args: pyReviewRaw
};

export const ProtocolNumber: Story = {
  render,
  args: {
    label: 'Protocol Number',
    value: 'PROT-2025-789456',
    hideLabel: false,
    buttonPosition: 'right',
    showIcon: true,
    successMessage: 'Protocol copied!',
    errorMessage: 'Failed to copy protocol'
  }
};

export const EmailAddress: Story = {
  render,
  args: {
    label: 'Email',
    value: 'customer.support@company.com',
    hideLabel: false,
    buttonPosition: 'right',
    showIcon: true,
    successMessage: 'Email copied!',
    errorMessage: 'Failed to copy'
  }
};

export const CPFDocument: Story = {
  render,
  args: {
    label: 'CPF',
    value: '123.456.789-00',
    hideLabel: false,
    buttonPosition: 'right',
    showIcon: true,
    successMessage: 'CPF copiado!',
    errorMessage: 'Falha ao copiar'
  }
};

export const ButtonOnLeft: Story = {
  render,
  args: {
    label: 'Transaction ID',
    value: 'TXN-2025-123456789',
    hideLabel: false,
    buttonPosition: 'left',
    showIcon: true,
    successMessage: 'Copied!',
    errorMessage: 'Failed to copy'
  }
};

export const WithoutIcon: Story = {
  render,
  args: {
    label: 'Reference Code',
    value: 'REF-ABC-XYZ-123',
    hideLabel: false,
    buttonPosition: 'right',
    showIcon: false,
    successMessage: 'Copied!',
    errorMessage: 'Failed to copy'
  }
};

export const NoLabel: Story = {
  render,
  args: {
    label: 'Hidden Label',
    value: 'HIDDEN-LABEL-VALUE-123',
    hideLabel: true,
    buttonPosition: 'right',
    showIcon: true,
    successMessage: 'Copied!',
    errorMessage: 'Failed to copy'
  }
};

export const EmptyValue: Story = {
  render,
  args: {
    label: 'Empty Field',
    value: '',
    hideLabel: false,
    buttonPosition: 'right',
    showIcon: true,
    successMessage: 'Copied!',
    errorMessage: 'No value to copy'
  }
};

export const LongValue: Story = {
  render,
  args: {
    label: 'Long Token',
    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
    hideLabel: false,
    buttonPosition: 'right',
    showIcon: true,
    successMessage: 'Token copied!',
    errorMessage: 'Failed to copy'
  }
};
