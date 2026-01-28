import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import chatbotData from '../data/chatbot.json';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: chatbotData.welcomeMessage, isBot: true }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);

        const lowerInput = input.toLowerCase();

        // Find matching response in KB array
        const match = chatbotData.knowledgeBase.find(item => lowerInput.includes(item.key.toLowerCase()));

        const response = match ? match.response : chatbotData.fallbackMessage;

        setTimeout(() => {
            setMessages(prev => [...prev, { text: response, isBot: true }]);
        }, 500);

        setInput('');
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 2000 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="glass-card"
                        style={{
                            width: '350px',
                            height: '450px',
                            marginBottom: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            padding: '1rem',
                            background: 'linear-gradient(135deg, var(--color-sky-blue), var(--color-mexican-pink))',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontWeight: 600 }}>Asistente Virtual</span>
                            <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
                        </div>

                        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {messages.map((m, i) => (
                                <div key={i} style={{
                                    alignSelf: m.isBot ? 'flex-start' : 'flex-end',
                                    backgroundColor: m.isBot ? '#f0f0f0' : 'var(--color-sky-blue)',
                                    color: m.isBot ? 'var(--color-text-primary)' : 'white',
                                    padding: '0.6rem 1rem',
                                    borderRadius: m.isBot ? '0 1rem 1rem 1rem' : '1rem 0 1rem 1rem',
                                    maxWidth: '80%',
                                    fontSize: '0.9rem'
                                }}>
                                    {m.text}
                                </div>
                            ))}
                        </div>

                        <div style={{ padding: '1rem', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem' }}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Escribe tu duda..."
                                style={{
                                    flex: 1,
                                    border: '1px solid #ddd',
                                    borderRadius: '1rem',
                                    padding: '0.5rem 1rem',
                                    outline: 'none'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    backgroundColor: 'var(--color-mexican-pink)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-mexican-pink)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(228, 0, 124, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <MessageCircle size={30} />
            </button>
        </div>
    );
};

export default Chatbot;
