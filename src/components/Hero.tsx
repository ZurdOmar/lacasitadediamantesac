import { motion } from 'framer-motion';
import logo from '../assets/logo.jpeg';
import heroData from '../data/hero.json';

const Hero = () => {
    return (
        <section id="inicio" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--section-padding)',
            background: 'radial-gradient(circle at top right, var(--color-lavender), transparent 40%), radial-gradient(circle at bottom left, var(--color-light-blue), transparent 40%)'
        }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '2rem' }}
                >
                    <img
                        src={logo}
                        alt="La Casita de Diamantes A.C."
                        style={{
                            width: 'min(450px, 90vw)',
                            height: 'auto',
                            maxHeight: '400px',
                            borderRadius: '2rem',
                            objectFit: 'contain',
                            border: '4px solid white',
                            padding: '1rem',
                            background: 'white',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                            marginBottom: '2rem'
                        }}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span style={{
                        backgroundColor: 'var(--color-lavender)',
                        color: 'var(--color-mexican-pink)',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '2rem',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        marginBottom: '1.5rem',
                        display: 'inline-block'
                    }}>
                        {heroData.slogan}
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                        marginBottom: '1.5rem',
                        color: 'var(--color-text-primary)'
                    }}>
                        {heroData.title1}
                        <br /> <span style={{ color: 'var(--color-mexican-pink)' }}>{heroData.title2}</span>
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '700px',
                        margin: '0 auto 2.5rem'
                    }}>
                        {heroData.description}
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <a href="#actividades">
                            <button className="btn-primary" style={{ minWidth: '180px' }}>Ver actividades</button>
                        </a>
                        <button style={{
                            backgroundColor: 'white',
                            color: 'var(--color-text-primary)',
                            padding: '0.8rem 2rem',
                            borderRadius: '2rem',
                            fontWeight: 600,
                            border: '1px solid #ddd',
                            minWidth: '180px'
                        }}>
                            Donar ahora
                        </button>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
