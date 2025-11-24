import React, { useState, useRef, useEffect, useContext } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { askGeneralAssistant } from '../services/geminiService';
import { LanguageContext } from '../App';

export const GlobalChat: React.FC = () => {
    const { language, t } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([{ role: 'model', text: t('global_chat_intro'), timestamp: Date.now() }]);
    }, [language, t]);

    useEffect(() => {
        if (isOpen) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;
        const userMsg = inputText;
        setInputText('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: Date.now() }]);
        setIsThinking(true);

        const historyForApi = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const answer = await askGeneralAssistant(userMsg, language, historyForApi);
        setMessages(prev => [...prev, { role: 'model', text: answer, timestamp: Date.now() }]);
        setIsThinking(false);
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-black text-white hover:bg-lime-300 hover:text-black border-2 border-black transition-colors flex items-center justify-center z-50 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
            >
                <MessageSquare size={28} />
            </button>
        );
    }

    return (
        <div 
            className="fixed bottom-6 right-6 z-50 flex flex-col bg-white border-2 border-black w-[90vw] sm:w-96 h-[500px]"
            style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-black text-white border-b-2 border-black">
                <h3 className="font-bold uppercase tracking-widest text-sm">{t('global_chat_helper')}</h3>
                <button onClick={() => setIsOpen(false)} className="hover:text-lime-300">
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 text-sm font-medium border border-black ${
                            msg.role === 'user' 
                            ? 'bg-black text-white' 
                            : 'bg-gray-100 text-black'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-black p-2 flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t-2 border-black bg-gray-50 flex gap-2">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t('chat_placeholder')}
                    className="flex-1 bg-white border border-black p-2 text-sm font-medium outline-none focus:bg-lime-50"
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isThinking}
                    className="bg-black text-white px-4 hover:bg-lime-300 hover:text-black border border-black transition-colors disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};