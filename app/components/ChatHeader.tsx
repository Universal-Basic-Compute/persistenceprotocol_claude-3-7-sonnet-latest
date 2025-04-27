import React from 'react';
import Button from './Button';
import { BASE_REPO_URL } from '../api/config';

interface ChatHeaderProps {
  modelName: string;
  modelId: string;
  repoSuffix?: string;
  menuOpen: boolean;
  isFullscreen: boolean;
  toggleChatMenu: () => void;
  toggleFullscreen: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  modelName, 
  modelId,
  repoSuffix,
  menuOpen, 
  isFullscreen, 
  toggleChatMenu, 
  toggleFullscreen 
}) => {
  return (
    <div className="chat-header p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 flex flex-col">
      <div className="flex items-center">
        <h2 className="font-semibold">{modelName}</h2>
        <div className="flex ml-auto gap-3">
        <button 
          className="chat-menu-button" 
          onClick={(e) => {
            e.stopPropagation();
            toggleChatMenu();
          }}
          aria-label="Chat menu"
        >
          ⋮
        </button>
        <Button 
          variant="ghost"
          size="sm"
          className="fullscreen-button" 
          onClick={(e) => {
            e.stopPropagation();
            toggleFullscreen();
          }}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
            </svg>
          )}
        </Button>
        </div>
      </div>
      {repoSuffix && (
        <div className="repo-indicator text-xs text-gray-500 flex items-center mt-1">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-1"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
          <a 
            href={`${BASE_REPO_URL}-${repoSuffix}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {`persistenceprotocol-${repoSuffix}`}
          </a>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
