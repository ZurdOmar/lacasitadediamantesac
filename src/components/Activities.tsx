import { BookOpen, Palette, Users, Smile, X, ChevronLeft, ChevronRight, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const activitiesModules = import.meta.glob('../data/activities/*.json', { eager: true });
const activities = Object.values(activitiesModules).map((mod: any) => mod.default);

const iconMap = {
    BookOpen: <BookOpen size={40} />,
    Palette: <Palette size={40} />,
    Users: <Users size={40} />,
    Smile: <Smile size={40} />
};

const Activities = ({ onStateChange }: { onStateChange: (isOpen: boolean) => void }) => {
    const [selectedActivity, setSelectedActivity] = useState<any>(null); // To open the Grid Detail
    const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null); // To open the Lightbox
    const sectionRef = useRef<HTMLElement>(null);

    const openGrid = (activity: any) => {
        setSelectedActivity(activity);
        onStateChange(true);
        // Scroll to activities section to ensure user sees the transition below the banner
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const closeGrid = () => {
        setSelectedActivity(null);
        onStateChange(false);
    };

    const openLightbox = (index: number) => {
        setLightboxPhotoIndex(index);
    };

    const nextPhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxPhotoIndex === null || !selectedActivity?.gallery) return;
        setLightboxPhotoIndex((prev) => (prev! + 1) % selectedActivity.gallery.length);
    };

    const prevPhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxPhotoIndex === null || !selectedActivity?.gallery) return;
        setLightboxPhotoIndex((prev) => (prev! - 1 + selectedActivity.gallery.length) % selectedActivity.gallery.length);
    };

    return (
        <section id="actividades" ref={sectionRef} style={{ padding: 'var(--section-padding)', minHeight: '600px' }}>
            <div className="container">
                <AnimatePresence mode="wait">
                    {!selectedActivity ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h2 className="section-title">Lo que hacemos</h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: '2rem'
                            }}>
                                {activities.map((activity: any, index: number) => (
                                    <motion.div
                                        key={index}
                                        className="glass-card"
                                        whileHover={{ y: -5 }}
                                        style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', color: 'var(--color-sky-blue)' }}>
                                            {iconMap[activity.icon as keyof typeof iconMap]}
                                        </div>
                                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>{activity.title}</h3>
                                        <p style={{ color: 'var(--color-text-secondary)', flexGrow: 1, marginBottom: '1.5rem' }}>{activity.description}</p>

                                        {activity.image && (
                                            <div style={{ position: 'relative', cursor: activity.gallery?.length > 0 ? 'pointer' : 'default' }} onClick={() => activity.gallery?.length > 0 && openGrid(activity)}>
                                                <img src={activity.image} alt={activity.title} style={{ width: '100%', borderRadius: '1rem', height: '200px', objectFit: 'cover' }} />
                                                {activity.gallery && activity.gallery.length > 0 && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: '10px',
                                                        right: '10px',
                                                        background: 'rgba(0,0,0,0.6)',
                                                        color: 'white',
                                                        padding: '0.3rem 0.8rem',
                                                        borderRadius: '1rem',
                                                        fontSize: '0.8rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.4rem'
                                                    }}>
                                                        <ImageIcon size={14} /> +{activity.gallery.length}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {activity.gallery && activity.gallery.length > 0 && (
                                            <button
                                                onClick={() => openGrid(activity)}
                                                className="btn-primary"
                                                style={{ marginTop: '1.5rem', padding: '0.6rem 1.2rem', fontSize: '0.9rem', background: 'var(--color-lavender)', color: 'var(--color-mexican-pink)' }}
                                            >
                                                Ver todas las fotos
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <button
                                onClick={closeGrid}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-mexican-pink)',
                                    cursor: 'pointer',
                                    marginBottom: '2rem',
                                    fontWeight: 600,
                                    fontSize: '1rem'
                                }}
                            >
                                <ArrowLeft size={20} /> Regresar a Actividades
                            </button>

                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>{selectedActivity.title}</h2>
                                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto' }}>{selectedActivity.description}</p>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {selectedActivity.gallery.map((img: string, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => openLightbox(idx)}
                                        style={{ cursor: 'pointer', borderRadius: '1rem', overflow: 'hidden', height: '220px', border: '1px solid #eee' }}
                                    >
                                        <img src={img} alt={`${selectedActivity.title} ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Lightbox Modal (Fixed Dark Background - only for individual photo) */}
            <AnimatePresence>
                {lightboxPhotoIndex !== null && selectedActivity && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxPhotoIndex(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 3000,
                            background: 'rgba(0,0,0,0.98)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <button
                            onClick={() => setLightboxPhotoIndex(null)}
                            style={{ position: 'absolute', top: '2rem', right: '2rem', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <X size={40} />
                        </button>

                        <div style={{ width: '100%', maxWidth: '1000px', position: 'relative' }} onClick={e => e.stopPropagation()}>
                            <motion.img
                                key={lightboxPhotoIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                src={selectedActivity.gallery[lightboxPhotoIndex]}
                                style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '1rem' }}
                            />

                            {selectedActivity.gallery.length > 1 && (
                                <>
                                    <button
                                        onClick={prevPhoto}
                                        style={{ position: 'absolute', left: '-4rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                                    >
                                        <ChevronLeft size={60} />
                                    </button>
                                    <button
                                        onClick={nextPhoto}
                                        style={{ position: 'absolute', right: '-4rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                                    >
                                        <ChevronRight size={60} />
                                    </button>
                                    <div style={{ position: 'absolute', bottom: '-3rem', left: 0, right: 0, textAlign: 'center', color: 'white' }}>
                                        {lightboxPhotoIndex + 1} / {selectedActivity.gallery.length}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Activities;
