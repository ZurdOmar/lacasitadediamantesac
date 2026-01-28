import { HeartHandshake, ShieldCheck, Gift } from 'lucide-react';
import donationsData from '../data/donations.json';

const Donations = () => {
    return (
        <section id="donaciones" style={{
            padding: 'var(--section-padding)',
            backgroundColor: 'var(--color-bg-primary)',
        }}>
            <div className="container">
                <h2 className="section-title">{donationsData.sectionTitle}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="glass-card" style={{ padding: '2.5rem' }}>
                        <h3 style={{ color: 'var(--color-mexican-pink)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <HeartHandshake /> {donationsData.helperTitle}
                        </h3>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                            {donationsData.helperDescription}
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <ShieldCheck size={18} color="var(--color-sky-blue)" /> Transferencia Bancaria
                            </li>
                            <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <ShieldCheck size={18} color="var(--color-sky-blue)" /> Recibos Deducibles (SAT)
                            </li>
                            <li style={{ marginBottom: '0.8rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <Gift size={18} color="var(--color-sky-blue)" /> Donaciones en Especie
                            </li>
                        </ul>
                        <button className="btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
                            Donar en Línea (PayPal/Tarjeta)
                        </button>
                        <button style={{
                            width: '100%',
                            marginTop: '1rem',
                            backgroundColor: 'white',
                            color: 'var(--color-text-primary)',
                            padding: '0.8rem',
                            borderRadius: '2rem',
                            border: '1px solid #ddd',
                            fontWeight: 600
                        }}>
                            Ver Datos Bancarios
                        </button>
                    </div>

                    <div className="glass-card" style={{
                        padding: '2.5rem',
                        background: 'linear-gradient(135deg, var(--color-sky-blue), var(--color-mexican-pink))',
                        color: 'white'
                    }}>
                        <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Tu impacto</h3>
                        <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
                            {donationsData.impactDescriptionMain}
                        </p>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{donationsData.impactTitle}</div>
                        <div style={{ opacity: 0.8, fontWeight: 500 }}>{donationsData.impactDescription}</div>
                        <hr style={{ margin: '1.5rem 0', opacity: 0.3 }} />
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{donationsData.impactTitle2}</div>
                        <div style={{ opacity: 0.8, fontWeight: 500 }}>{donationsData.impactDescription2}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Donations;
