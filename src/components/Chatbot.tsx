import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: '¡Hola! Soy el asistente de La Casita de Diamantes A.C. ¿En qué puedo ayudarte hoy?', isBot: true }
    ]);
    const [input, setInput] = useState('');

    const KB = {
        'donar en linea': '¡Claro! Puedes donar ahora mismo con tarjeta de crédito o PayPal haciendo clic en el botón rosa de la sección de Donaciones.',
        'donar': 'Puedes donar a través de transferencia bancaria, en especie o en línea por PayPal/Tarjeta. Haz clic en la sección de Donaciones para más detalles.',
        'actividades': 'Ofrecemos actividades lúdicas, gestión social, talleres culturales y apoyo educativo para niños y familias.',
        'cluni': 'Sí, contamos con CLUNI activa y estamos registrados como donataria autorizada ante el SAT.',
        'contacto': 'Puedes contactarnos a través de nuestras redes sociales o visitarnos en nuestra sede. ¡Estamos para servirte!',
        'niños': 'Nuestro enfoque principal es el bienestar y desarrollo integral de la niñez en situaciones vulnerables.',
        'default': 'Lo siento, no tengo esa información exacta. Pero puedes contactarnos directamente y con gusto te atenderemos.'
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);

        const lowerInput = input.toLowerCase();
        let response = KB.default;

        // More robust keyword matching
        const match = Object.keys(KB).find(key => key !== 'default' && lowerInput.includes(key));

        if (match) {
            response = KB[match as keyof typeof KB];
        } else {
            response = `Lo siento, no entendí eso. ¿Tal vez quieras saber sobre: ${Object.keys(KB).filter(k => k !== 'default').join(', ')}? Escribe una de estas palabras clave para ayudarte.`;
        }

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
