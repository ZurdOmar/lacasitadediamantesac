import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Inicio', href: '#inicio' },
        { name: 'Nosotros', href: '#nosotros' },
        { name: 'Actividades', href: '#actividades' },
        { name: 'Transparencia', href: '#transparencia' },
        { name: 'Donaciones', href: '#donaciones' },
    ];

    return (
        <>
            <nav className="glass-card" style={{
                position: 'fixed',
                top: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'min(1200px, 95%)',
                zIndex: 1000,
                padding: '0.4rem 1.5rem',
                borderRadius: '3rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img
                            src={logo}
                            alt="La Casita de Diamantes A.C. Logo"
                            style={{
                                height: '45px',
                                width: '45px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '2px solid var(--color-sky-blue)',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                        />
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                            <span className="mobile-hide">La Casita de</span> Diamantes <span style={{ color: 'var(--color-sky-blue)' }}>A.C.</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="desktop-menu">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} style={{ fontWeight: 500, fontSize: '0.9rem' }}>
                                {link.name}
                            </a>
                        ))}
                        <button className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
                            Donar
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="mobile-toggle">
                        {isOpen ? <X size={24} onClick={() => setIsOpen(false)} /> : <Menu size={24} onClick={() => setIsOpen(true)} />}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '280px',
                            height: '100vh',
                            background: 'white',
                            zIndex: 999,
                            padding: '6rem 2rem',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-primary)' }}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="btn-primary" style={{ marginTop: 'auto' }}>
                            Ayudar ahora
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
