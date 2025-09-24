import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  ArrowUp, 
  Github, 
  Mail, 
  FileText,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface FloatingActionMenuProps {
  onChatToggle: () => void;
  isChatOpen: boolean;
}

export default function FloatingActionMenu({ onChatToggle, isChatOpen }: FloatingActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: MessageSquare,
      label: 'AI Chat',
      action: onChatToggle,
      color: 'from-blue-500 to-purple-600',
      isActive: isChatOpen
    },
    {
      icon: ArrowUp,
      label: 'Scroll to Top',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Github,
      label: 'GitHub Profile',
      action: () => window.open('https://github.com/dino65-dev', '_blank'),
      color: 'from-gray-600 to-gray-800'
    },
    {
      icon: Mail,
      label: 'Contact Me',
      action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: FileText,
      label: 'Download Resume',
      action: () => {
        // Add resume download logic here
        console.log('Resume download would be implemented here');
      },
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col-reverse items-center gap-3">
      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ 
              delay: index * 0.05,
              type: 'spring',
              stiffness: 500,
              damping: 30
            }}
            className="group relative"
          >
            <Button
              size="lg"
              onClick={item.action}
              className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-r ${item.color} hover:opacity-90 ${
                item.isActive ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
            </Button>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-popover text-popover-foreground px-2 py-1 rounded text-sm whitespace-nowrap shadow-lg border">
                {item.label}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-popover"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          size="lg"
          onClick={toggleMenu}
          className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:scale-105 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          <Plus className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
        </Button>
        
        {/* Pulse Animation when closed */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full -z-10"
          />
        )}
      </motion.div>
    </div>
  );
}