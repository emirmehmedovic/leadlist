'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { 
  Home, 
  Users, 
  FolderOpen, 
  LogOut, 
  User, 
  Settings,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Klijenti', href: '/leads', icon: Users },
    { name: 'Kategorije', href: '/categories', icon: FolderOpen },
  ];

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2 group"
            >
              <div className="w-8 h-8 bg-apple-blue rounded-apple flex items-center justify-center shadow-apple group-hover:shadow-apple-lg transition-all duration-200">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold text-gradient-blue">LeadList</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-white/30 rounded-apple transition-all duration-200 group"
                >
                  <Icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-white/20 rounded-apple transition-all duration-200">
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-white/20 rounded-apple transition-all duration-200 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-white/20 rounded-apple transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-apple-purple rounded-full flex items-center justify-center shadow-soft group-hover:shadow-apple transition-all duration-200">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden lg:block">{user?.name}</span>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-card rounded-apple-lg shadow-apple-lg z-50 animate-slide-down">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                    <p className="text-xs text-neutral-500">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-white/20 transition-colors duration-200">
                      <User className="h-4 w-4 mr-3" />
                      Profil
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-white/20 transition-colors duration-200">
                      <Settings className="h-4 w-4 mr-3" />
                      Postavke
                    </button>
                    <hr className="my-2 border-white/10" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Odjavi se
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-white/20 rounded-apple transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 pt-4 pb-3 animate-slide-down">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-white/20 rounded-apple transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile User Section */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center px-3 py-2">
                <div className="w-10 h-10 bg-apple-purple rounded-full flex items-center justify-center shadow-soft">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-neutral-900">{user?.name}</p>
                  <p className="text-sm text-neutral-500">{user?.email}</p>
                </div>
              </div>
              
              <div className="mt-3 space-y-1">
                <button className="flex items-center w-full px-3 py-2 text-base font-medium text-neutral-700 hover:bg-white/20 rounded-apple transition-all duration-200">
                  <User className="h-5 w-5 mr-3" />
                  Profil
                </button>
                <button className="flex items-center w-full px-3 py-2 text-base font-medium text-neutral-700 hover:bg-white/20 rounded-apple transition-all duration-200">
                  <Settings className="h-5 w-5 mr-3" />
                  Postavke
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50/50 rounded-apple transition-all duration-200"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Odjavi se
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdown */}
      {(isProfileMenuOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => {
            setIsProfileMenuOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
} 