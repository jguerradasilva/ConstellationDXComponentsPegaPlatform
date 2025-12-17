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
  fieldReference?: string;
  buttonPosition?: 'right' | 'left';
  disabled?: boolean;
  testId?: string;
}

export default function CopyToClipboard(props: CopyToClipboardProps) {
  const {
    label = '',
    value = '',
    fieldReference = '',
    buttonPosition = 'right',
    disabled = false,
    testId,
    getPConnect
  } = props;

  // Get value from field reference if provided, otherwise use direct value
  const displayValue = fieldReference && getPConnect 
    ? getPConnect().getValue(fieldReference) || value
    : value;

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('Copied!');
  const [isSuccess, setIsSuccess] = useState(true);

  const handleCopy = async () => {
    if (disabled) return;
    
    try {
      if (!displayValue) {
        setTooltipMessage('No value to copy');
        setIsSuccess(false);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
        return;
      }

      await navigator.clipboard.writeText(displayValue);
      setTooltipMessage('Copied!');
      setIsSuccess(true);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      setTooltipMessage('Failed to copy');
      setIsSuccess(false);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <StyledCopyToClipboardWrapper data-testid={testId}>
      {label && <StyledLabel>{label}</StyledLabel>}
      
      <StyledFieldContainer buttonPosition={buttonPosition}>
        {buttonPosition === 'left' && (
          <StyledCopyButton 
            onClick={handleCopy}
            disabled={disabled}
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
          >
            📋
            {showTooltip && (
              <StyledTooltip isSuccess={isSuccess}>
                {tooltipMessage}
              </StyledTooltip>
            )}
          </StyledCopyButton>
        )}

        <StyledValueText isEmpty={!displayValue}>
          {displayValue || 'No value'}
        </StyledValueText>

        {buttonPosition === 'right' && (
          <StyledCopyButton 
            onClick={handleCopy}
            disabled={disabled}
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
          >
            📋
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
