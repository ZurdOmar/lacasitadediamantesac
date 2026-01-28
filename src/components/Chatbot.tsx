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
    const [showOptions, setShowOptions] = useState(true);

    const handleSend = () => {
        if (!input.trim()) return;
        processUserMessage(input);
        setInput('');
    };

    const processUserMessage = (text: string) => {
        const userMsg = { text, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setShowOptions(false);

        const lowerInput = text.toLowerCase();
        const match = chatbotData.knowledgeBase.find(item => lowerInput.includes(item.key.toLowerCase()));
        const response = match ? match.response : chatbotData.fallbackMessage;

        setTimeout(() => {
            setMessages(prev => [...prev, { text: response, isBot: true }]);
            // Re-show options after bot response
            setTimeout(() => setShowOptions(true), 600);
        }, 800);
    };

    const handleOptionClick = (option: { label: string, key: string }) => {
        processUserMessage(option.label);
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
                            maxHeight: '500px',
                            height: '500px',
                            marginBottom: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ width: '10px', height: '10px', background: '#4ade80', borderRadius: '50%' }}></div>
                                <span style={{ fontWeight: 600 }}>Asistente Casita</span>
                            </div>
                            <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
                        </div>

                        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: m.isBot ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{
                                        alignSelf: m.isBot ? 'flex-start' : 'flex-end',
                                        backgroundColor: m.isBot ? '#f3f4f6' : 'var(--color-sky-blue)',
                                        color: m.isBot ? 'var(--color-text-primary)' : 'white',
                                        padding: '0.75rem 1rem',
                                        borderRadius: m.isBot ? '0 1.2rem 1.2rem 1.2rem' : '1.2rem 1.2rem 0 1.2rem',
                                        maxWidth: '85%',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.4',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    {m.text}
                                </motion.div>
                            ))}

                            {showOptions && chatbotData.options && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}
                                >
                                    {chatbotData.options.map((opt, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleOptionClick(opt)}
                                            style={{
                                                background: 'white',
                                                border: '1px solid var(--color-sky-blue)',
                                                color: 'var(--color-sky-blue)',
                                                padding: '0.5rem 0.8rem',
                                                borderRadius: '2rem',
                                                fontSize: '0.8rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {opt.label}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <div style={{ padding: '1rem', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '0.6rem', background: 'white' }}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Escribe aquí..."
                                style={{
                                    flex: 1,
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '1.5rem',
                                    padding: '0.6rem 1rem',
                                    outline: 'none',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    backgroundColor: 'var(--color-mexican-pink)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    border: 'none',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 10px rgba(228, 0, 124, 0.2)'
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
