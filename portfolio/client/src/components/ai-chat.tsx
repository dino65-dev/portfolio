import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Loader2, MessageCircle, Send, X, Sparkles, User, Maximize2, Minimize2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AIChat({ isOpen, onToggle }: AIChatProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Dinmay's AI assistant. I can tell you about his background, projects, skills, research work, and answer any questions you have about him. I can also search the web for the latest information. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        buffer += chunk;

        // Process complete lines from buffer
        const lines = buffer.split('\n');
        
        // Keep the last (potentially incomplete) line in the buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') break;
            
            // Skip empty data lines
            if (!data) continue;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setMessages(prev => prev.map(msg => 
                  msg.id === assistantMessage.id 
                    ? { ...msg, content: msg.content + parsed.content }
                    : msg
                ));
              }
            } catch (e) {
              // Log parsing errors for debugging (only in development)
              if (process.env.NODE_ENV === 'development') {
                console.warn('Failed to parse streaming data:', data, e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your message. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  const chatWindowClass = isMaximized 
    ? "fixed inset-4 z-50" 
    : "fixed bottom-6 right-6 z-50";
  
  const cardClass = isMaximized 
    ? "w-full h-full shadow-2xl border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" 
    : "w-96 h-[600px] shadow-2xl border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 resize overflow-hidden";

  return (
    <div className={chatWindowClass}>
      <Card className={cardClass} style={{ resize: isMaximized ? 'none' : 'both', minWidth: '320px', minHeight: '400px' }}>
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500/10 to-purple-600/10">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Dinmay's AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything!</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMaximized(!isMaximized)}
                className="h-8 w-8 p-0"
                title={isMaximized ? 'Minimize' : 'Maximize'}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-8 w-8 p-0"
                title="Close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={70} minSize={50}>

            {/* Messages */}
            <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Sparkles className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                      )}
                      {message.role === 'user' && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        {message.role === 'assistant' ? (
                          <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2 text-foreground" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-base font-semibold mb-2 text-foreground" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-sm font-semibold mb-1 text-foreground" {...props} />,
                                p: ({node, ...props}) => <p className="mb-2 text-foreground leading-relaxed" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 text-foreground" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 text-foreground" {...props} />,
                                li: ({node, ...props}) => <li className="mb-1 text-foreground" {...props} />,
                                code: ({node, ...props}) => {
                                  const isInline = !props.className?.includes('language-');
                                  return isInline ? (
                                    <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground" {...props} />
                                  ) : (
                                    <code className="block bg-muted p-2 rounded text-xs font-mono text-foreground overflow-x-auto" {...props} />
                                  );
                                },
                                pre: ({node, ...props}) => <pre className="bg-muted p-2 rounded overflow-x-auto mb-2" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-primary pl-3 italic text-muted-foreground mb-2" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-semibold text-foreground" {...props} />,
                                em: ({node, ...props}) => <em className="italic text-foreground" {...props} />,
                                a: ({node, ...props}) => <a className="text-primary hover:text-primary/80 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap text-foreground">{message.content}</p>
                        )}
                        <p className="text-xs opacity-70 mt-1">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            </ScrollArea>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
            {/* Input */}
            <div className="p-4 border-t h-full flex items-center">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Dinmay's work, skills, or anything..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!input.trim() || isLoading}
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
}