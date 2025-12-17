import { useState } from 'react';
import type { PConnFieldProps } from './PConnProps';
import {
  StyledCopyToClipboardWrapper,
  StyledLabel,
  StyledFieldContainer,
  StyledValueText,
  StyledCopyButton,
  StyledTooltip
} from './styles';

interface CopyToClipboardProps extends PConnFieldProps {
  label?: string;
  value?: string;
  hideLabel?: boolean;
  buttonPosition?: 'right' | 'left';
  showIcon?: boolean;
  successMessage?: string;
  errorMessage?: string;
  testId?: string;
}

export default function CopyToClipboard(props: CopyToClipboardProps) {
  const {
    label = 'Copy Field',
    value = '',
    hideLabel = false,
    buttonPosition = 'right',
    showIcon = true,
    successMessage = 'Copied!',
    errorMessage = 'Failed to copy',
    testId
  } = props;

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState(successMessage);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleCopy = async () => {
    try {
      if (!value) {
        setTooltipMessage('No value to copy');
        setIsSuccess(false);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
        return;
      }

      await navigator.clipboard.writeText(value);
      setTooltipMessage(successMessage);
      setIsSuccess(true);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      setTooltipMessage(errorMessage);
      setIsSuccess(false);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <StyledCopyToClipboardWrapper data-testid={testId}>
      {!hideLabel && label && <StyledLabel>{label}</StyledLabel>}
      
      <StyledFieldContainer buttonPosition={buttonPosition}>
        {buttonPosition === 'left' && (
          <StyledCopyButton 
            onClick={handleCopy}
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
          >
            {showIcon ? '📋' : 'Copy'}
            {showTooltip && (
              <StyledTooltip isSuccess={isSuccess}>
                {tooltipMessage}
              </StyledTooltip>
            )}
          </StyledCopyButton>
        )}

        <StyledValueText isEmpty={!value}>
          {value || 'No value'}
        </StyledValueText>

        {buttonPosition === 'right' && (
          <StyledCopyButton 
            onClick={handleCopy}
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
          >
            {showIcon ? '📋' : 'Copy'}
            {showTooltip && (
              <StyledTooltip isSuccess={isSuccess}>
                {tooltipMessage}
              </StyledTooltip>
            )}
          </StyledCopyButton>
        )}
      </StyledFieldContainer>
    </StyledCopyToClipboardWrapper>
  );
}
