import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  progress?: number;
}

export default function LoadingScreen({ isLoading, progress = 0 }: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (progress > displayProgress) {
      const interval = setInterval(() => {
        setDisplayProgress(prev => {
          if (prev >= progress) {
            clearInterval(interval);
            return progress;
          }
          return prev + 1;
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [progress, displayProgress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-4xl font-bold text-primary mb-2">
                <span className="text-accent">dino65</span>-dev
              </div>
              <div className="text-muted-foreground">Portfolio Loading</div>
            </motion.div>

            {/* Loading Animation */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
              />
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-2 border-2 border-transparent border-r-accent rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 mx-auto">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Loading assets...</span>
                <span>{displayProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${displayProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </div>

            {/* Loading Text Animation */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mt-8 text-muted-foreground"
            >
              Preparing your experience...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}