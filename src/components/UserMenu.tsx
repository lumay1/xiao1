import React, { useState } from 'react';
import { User, History, ShoppingBag, LogOut } from 'lucide-react';

interface UserMenuProps {
  username: string;
  onLogout: () => void;
  onOpenHistory: () => void;
  onOpenStore: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ username, onLogout, onOpenHistory, onOpenStore }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <div className="absolute top-4 right-4 text-white">
      <button
        className="flex items-center hover:text-yellow-300 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User size={24} className="mr-2" />
        {username}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={onOpenHistory}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <History className="inline-block mr-2" size={18} />
              历史
            </button>
            <button
              onClick={onOpenStore}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <ShoppingBag className="inline-block mr-2" size={18} />
              商店
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <LogOut className="inline-block mr-2" size={18} />
              退出
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;