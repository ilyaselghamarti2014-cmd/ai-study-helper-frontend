'use client';

import { Bell, Search, Menu, Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 right-0 left-0 lg:left-72 z-40 glass border-b border-gray-200 dark:border-gray-700/50"
    >
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors button-scale"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="hidden md:block font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              QuickLearn
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-96 hover-lift">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white flex-1 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full button-scale"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-full relative button-scale">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full pulse" />
          </Button>

          {/* User avatar */}
          {user && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold hover-lift cursor-pointer">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
