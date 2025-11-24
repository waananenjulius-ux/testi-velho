import React, { useState, useContext } from 'react';
import { Mail, X, Send, CheckCircle2 } from 'lucide-react';
import { LanguageContext } from '../App';

export const GlobalFeedback: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    
    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            setIsSubmitting(false);
            setTimeout(() => {
                setSubmitted(false);
                setIsOpen(false);
            }, 3000);
        }, 1000);
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 w-12 h-12 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center z-40"
                style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
            >
                <Mail size={20} />
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:justify-start pointer-events-none">
            <div 
                className="absolute inset-0 bg-black/50 pointer-events-auto"
                onClick={() => setIsOpen(false)}
            ></div>

            <div 
                className="relative w-full sm:w-96 bg-white border-2 border-black p-0 pointer-events-auto m-0 sm:m-6 flex flex-col max-h-[80vh]"
                style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
            >
                <div className="flex items-center justify-between p-4 border-b-2 border-black bg-gray-50">
                    <h3 className="font-bold uppercase tracking-widest">{t('feedback_section_title')}</h3>
                    <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                </div>

                <div className="p-6">
                    {submitted ? (
                        <div className="text-center py-8">
                            <CheckCircle2 size={32} className="mx-auto mb-2 text-lime-600" />
                            <h3 className="font-bold uppercase">{t('feedback_success_title')}</h3>
                        </div>
                    ) : (
                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border-2 border-black p-3 text-sm font-bold outline-none focus:bg-lime-50"
                                placeholder={t('feedback_label_name')}
                            />
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={4}
                                className="w-full border-2 border-black p-3 text-sm font-bold outline-none focus:bg-lime-50 resize-none"
                                placeholder={t('feedback_label_message')}
                            />
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white font-bold py-3 uppercase tracking-widest hover:bg-lime-300 hover:text-black border-2 border-black transition-colors"
                            >
                                {isSubmitting ? "..." : t('feedback_btn_send')}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};