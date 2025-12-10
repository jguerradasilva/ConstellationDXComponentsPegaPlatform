import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    width: 100%;
    padding: 16px;
    
    .sticky-notes-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e0e0e0;
      
      h3 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #333;
      }
      
      .add-note-button {
        padding: 8px 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 6px;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        &:active {
          transform: translateY(0);
        }
        
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
      }
    }
    
    .notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 16px;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
    
    .sticky-note {
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      transition: all 0.2s ease;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }
      
      .note-color-strip {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 8px;
        border-radius: 8px 8px 0 0;
      }
      
      .note-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 8px;
        margin-bottom: 12px;
        
        .color-picker-container {
          display: flex;
          gap: 6px;
          
          .color-option {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.2s ease;
            
            &:hover {
              transform: scale(1.1);
              border-color: #666;
            }
            
            &.selected {
              border-color: #333;
              box-shadow: 0 0 0 2px white, 0 0 0 4px #333;
            }
          }
        }
        
        .delete-button {
          background: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
          
          &:hover {
            background: #d32f2f;
            transform: scale(1.05);
          }
        }
      }
      
      .note-content {
        flex: 1;
        
        textarea {
          width: 100%;
          min-height: 80px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 8px;
          font-family: inherit;
          font-size: 14px;
          resize: vertical;
          transition: border-color 0.2s ease;
          
          &:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
          }
          
          &:disabled {
            background-color: #f5f5f5;
            cursor: not-allowed;
          }
        }
        
        .note-text-display {
          font-size: 14px;
          line-height: 1.5;
          color: #333;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      }
      
      .note-footer {
        margin-top: 12px;
        padding-top: 8px;
        border-top: 1px solid #e0e0e0;
        
        .note-metadata {
          font-size: 11px;
          color: #999;
          
          .created-by {
            font-weight: 500;
            color: #666;
          }
          
          .created-on {
            margin-left: 8px;
          }
        }
      }
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #999;
      
      .empty-icon {
        font-size: 64px;
        margin-bottom: 16px;
        opacity: 0.3;
      }
      
      p {
        font-size: 16px;
        margin: 8px 0;
      }
    }
  `;
});
