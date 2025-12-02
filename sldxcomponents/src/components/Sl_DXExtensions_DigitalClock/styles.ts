import styled, { css } from 'styled-components';

interface StyledProps {
  $backgroundColor1?: string;
  $backgroundColor2?: string;
  $textColor?: string;
}

export default styled.div<StyledProps>(({ $backgroundColor1 = '#667eea', $backgroundColor2 = '#764ba2', $textColor = '#ffffff' }) => {
  return css`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 20px;
    background: linear-gradient(135deg, ${$backgroundColor1} 0%, ${$backgroundColor2} 100%);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    width: fit-content;
    min-width: 200px;
    
    .clock-time {
      font-size: 32px;
      font-weight: bold;
      color: ${$textColor};
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      letter-spacing: 2px;
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
      margin-bottom: 4px;
      white-space: nowrap;
    }
    
    .clock-date {
      font-size: 14px;
      color: ${$textColor};
      opacity: 0.9;
      font-weight: 300;
      text-align: center;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      white-space: nowrap;
    }
  `;
});
