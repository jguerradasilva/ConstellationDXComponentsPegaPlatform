import { useState, useEffect } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
import type { PConnProps } from './PConnProps';
import './create-nonce';
import StyledSlDxExtensionsDigitalClockWrapper from './styles';

// interface for props
interface SlDxExtensionsDigitalClockProps extends PConnProps {
  format24Hour?: boolean;
  showSeconds?: boolean;
  showDate?: boolean;
  backgroundColor1?: string;
  backgroundColor2?: string;
  textColor?: string;
  testId?: string;
}

// Component
function SlDxExtensionsDigitalClock(props: SlDxExtensionsDigitalClockProps) {
  const { 
    format24Hour = false, 
    showSeconds = true, 
    showDate = true, 
    backgroundColor1 = '#667eea',
    backgroundColor2 = '#764ba2',
    textColor = '#ffffff',
    testId 
  } = props;
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    let timeString = '';
    let ampm = '';
    
    if (format24Hour) {
      timeString = `${hours.toString().padStart(2, '0')}:${minutes}`;
      if (showSeconds) {
        timeString += `:${seconds}`;
      }
    } else {
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      timeString = `${hours}:${minutes}`;
      if (showSeconds) {
        timeString += `:${seconds}`;
      }
      timeString += ` ${ampm}`;
    }
    
    return timeString;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <StyledSlDxExtensionsDigitalClockWrapper 
      data-testid={testId}
      $backgroundColor1={backgroundColor1}
      $backgroundColor2={backgroundColor2}
      $textColor={textColor}
    >
      <div className="clock-time">{formatTime(currentTime)}</div>
      {showDate && <div className="clock-date">{formatDate(currentTime)}</div>}
    </StyledSlDxExtensionsDigitalClockWrapper>
  );
}

export default withConfiguration(SlDxExtensionsDigitalClock);
