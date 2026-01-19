import { FileText, ClipboardCheck, Scale } from 'lucide-react';
import transparencyData from '../data/transparency.json';

const Transparency = () => {
    return (
        <section id="transparencia" style={{ padding: 'var(--section-padding)' }}>
            <div className="container">
                <h2 className="section-title">Compromiso y Transparencia</h2>
                <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem', color: 'var(--color-text-secondary)' }}>
                    En La Casita de Diamantes A.C., la confianza es nuestro pilar. Cumplimos con todas las normativas fiscales y legales vigentes en México.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {transparencyData.docs.map((doc, index) => (
                        <div key={index} className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem' }}>
                            <div style={{ color: index === 1 ? 'var(--color-mexican-pink)' : index === 2 ? 'var(--color-lavender)' : 'var(--color-sky-blue)' }}>
                                {index === 0 ? <ClipboardCheck size={40} /> : index === 1 ? <Scale size={40} /> : <FileText size={40} />}
                            </div>
                            <div>
                                <h4 style={{ marginBottom: '0.5rem' }}>{doc.name}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{doc.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <a href="#" style={{
                        color: 'var(--color-mexican-pink)',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        Descargar Informe de Transparencia 2025 (PDF)
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Transparency;
