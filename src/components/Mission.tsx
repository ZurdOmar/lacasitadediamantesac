import { Target, Users2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import missionData from '../data/mission.json';

const iconMap = {
    Users2: <Users2 size={32} />,
    Target: <Target size={32} />,
    Shield: <Shield size={32} />
};

const Mission = () => {
    return (
        <section id="nosotros" style={{ padding: 'var(--section-padding)', background: 'white' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>{missionData.title}</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginTop: '2rem' }}>
                            {missionData.description1}
                        </p>
                        <p style={{ marginTop: '1.5rem', color: 'var(--color-text-secondary)' }}>
                            {missionData.description2}
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {missionData.pillars.map((pillar, index) => (
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
                                    {iconMap[pillar.icon as keyof typeof iconMap]}
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
