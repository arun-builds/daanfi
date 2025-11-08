import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  logo?: React.ReactNode;
  logoText?: string;
  navItems?: NavItem[];
  className?: string;
}
export const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoText = "Daanfi",
  navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],
  className = ""
}) => {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <nav className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {logo ? (
              logo
            ) : (
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
            )}
            <span className="text-xl font-semibold text-gray-800">{logoText}</span>
          </div>

          {/* Desktop/Tablet Navigation - Centered */}
          <div className="hidden sm:flex items-center absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => (  
              <React.Fragment key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setActiveItem(item.label)}
                  className={`text-sm font-medium transition-colors relative pb-1 whitespace-nowrap px-2 ${
                    activeItem === item.label
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {activeItem === item.label && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gray-900"></span>
                  )}
                </a>
                {index < navItems.length - 1 && (
                  <span className="text-gray-400 mx-2">-</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden ml-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveItem(item.label)}
                      className={`text-base font-medium transition-colors px-4 py-2 rounded-md ${
                        activeItem === item.label
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
