import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const StyledCopyToClipboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  font-family: 'Open Sans', sans-serif;
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

export const StyledFieldContainer = styled.div<{ buttonPosition: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: row;
  background-color: #f5f5f5;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 8px 12px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
  }
`;

export const StyledValueText = styled.span<{ isEmpty: boolean }>`
  flex: 1;
  font-size: 14px;
  color: ${props => props.isEmpty ? '#999' : '#333'};
  font-style: ${props => props.isEmpty ? 'italic' : 'normal'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: all;
  padding: 4px 0;
`;

export const StyledCopyButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  height: 36px;

  &:hover {
    background-color: #0052a3;
    animation: ${pulse} 0.3s ease;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
  }
`;

export const StyledTooltip = styled.div<{ isSuccess: boolean }>`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.isSuccess ? '#28a745' : '#dc3545'};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  animation: ${fadeIn} 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: ${props => props.isSuccess ? '#28a745' : '#dc3545'};
  }
`;
