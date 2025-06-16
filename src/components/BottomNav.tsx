import React from 'react';
import { useState } from 'react';
import { Home, Calendar, User, Shield } from 'lucide-react';
import { TranslatableText } from './TranslatableText';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the active tab based on the current route
  const getActiveTab = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.startsWith('/events')) return 'events';
    if (location.pathname.startsWith('/artist')) return 'profile';
    return '';
  };

  const activeTab = getActiveTab();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-[#903603]/10 z-50">
      <div className="flex items-center justify-around p-2 max-w-lg mx-auto">
        <button 
          onClick={()=> navigate('/')}
          className={`relative flex flex-col items-center gap-1 p-2 text-[#903603] active:scale-95 transition-all ${
            activeTab === 'home' ? 'text-[#903603]' : 'text-[#903603]/60'
          }`}
        >
          {activeTab === 'home' && (
            <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#903603] animate-bounce" />
          )}
          <Home className="w-6 h-6" />
          <TranslatableText 
            text="होम"
            className="text-xs font-medium"
          />
        </button>
        
        {/*
        <button 
          onClick={onPrivacyPolicyClick}
          className={`relative flex flex-col items-center gap-1 p-2 text-[#903603] active:scale-95 transition-all ${
            activeTab === 'privacy' ? 'text-[#903603]' : 'text-[#903603]/60'
          }`}
        >
          {activeTab === 'privacy' && (
            <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#903603] animate-bounce" />
          )}
          <Shield className="w-6 h-6" />
          <TranslatableText 
            text="Privacy"
            className="text-xs font-medium"
          />
        </button>*/}
        
        <button 
          onClick={() => {
             navigate('/events')
          }}
          className={`relative flex flex-col items-center gap-1 p-2 text-[#903603] active:scale-95 transition-all ${
            activeTab === 'events' ? 'text-[#903603]' : 'text-[#903603]/60'
          }`}
        >
          {activeTab === 'events' && (
            <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#903603] animate-bounce" />
          )}
          <Calendar className="w-6 h-6" />
          <TranslatableText 
            text="कार्यक्रम"
            className="text-xs font-medium"
          />
        </button>
        
        <button 
          onClick = {() => {
            navigate('/artist')
            }}
          className={`relative flex flex-col items-center gap-1 p-2 text-[#903603] active:scale-95 transition-all ${
            activeTab === 'profile' ? 'text-[#903603]' : 'text-[#903603]/60'
          }`}
        >
          {activeTab === 'profile' && (
            <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#903603] animate-bounce" />
          )}
          <User className="w-6 h-6" />
          <TranslatableText 
            text="कलाकार"
            className="text-xs font-medium"
          />
        </button>
      </div>
    </div>
  );
};

export default BottomNav;