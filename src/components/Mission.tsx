import { Target, Users2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Mission = () => {
    const pillars = [
        {
            title: 'Equipo Integral',
            description: 'Profesionales y voluntarios comprometidos con el desarrollo social y humano.',
            icon: <Users2 size={32} />
        },
        {
            title: 'Misión Social',
            description: 'Atención directa a familias en vulnerabilidad con gestión de recursos básicos.',
            icon: <Target size={32} />
        },
        {
            title: 'Cultura y Educación',
            description: 'Herramientas para que cada niño brille y encuentre su propio potencial.',
            icon: <Shield size={32} />
        }
    ];

    return (
        <section id="nosotros" style={{ padding: 'var(--section-padding)', background: 'white' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Nuestra Esencia</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginTop: '2rem' }}>
                            En <strong>La Casita de Diamantes A.C.</strong>, no solo damos ayuda; construimos puentes. Nos enfocamos en formar un ecosistema de apoyo que abarca desde la ludicidad hasta la gestión social profesional.
                        </p>
                        <p style={{ marginTop: '1.5rem', color: 'var(--color-text-secondary)' }}>
                            Creemos en un modelo donde lo social, cultural y educativo se entrelazan para proteger y potenciar a la niñez mexicana.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ x: 10 }}
                                style={{
                                    display: 'flex',
                                    gap: '1.2rem',
                                    alignItems: 'flex-start',
                                    padding: '1.5rem',
                                    borderRadius: '1.2rem',
                                    background: 'var(--color-bg-primary)',
                                    border: '1px solid #eee'
                                }}
                            >
                                <div style={{
                                    color: 'var(--color-mexican-pink)',
                                    background: 'var(--color-lavender)',
                                    padding: '0.8rem',
                                    borderRadius: '1rem'
                                }}>
                                    {pillar.icon}
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.3rem', fontSize: '1.1rem' }}>{pillar.title}</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{pillar.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
