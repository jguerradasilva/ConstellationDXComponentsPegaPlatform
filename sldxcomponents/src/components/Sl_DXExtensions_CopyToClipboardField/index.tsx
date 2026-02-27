import { useState } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
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
  buttonPosition?: 'right' | 'left';
  readOnly?: boolean;
  disabled?: boolean;
  testId?: string;
}

function CopyToClipboard(props: CopyToClipboardProps) {
  const {
    label = '',
    value = '',
    buttonPosition = 'right',
    readOnly = true,
    disabled = false,
    testId,
    getPConnect
  } = props;

  // Get the resolved value from PConnect (automatically resolves the property reference)
  const pConn = getPConnect && getPConnect();
  const resolvedValue = pConn ? pConn.resolveConfigProps(pConn.getConfigProps())?.value || value : value;
  const displayValue = resolvedValue || value;

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
    <StyledCopyToClipboardWrapper data-testid={testId} className={readOnly ? 'read-only' : ''}>
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

export default withConfiguration(CopyToClipboard);
