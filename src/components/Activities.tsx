import { BookOpen, Palette, Users, Smile } from 'lucide-react';

const activitiesModules = import.meta.glob('../data/activities/*.json', { eager: true });
const activities = Object.values(activitiesModules).map((mod: any) => mod.default);

const iconMap = {
    BookOpen: <BookOpen size={40} />,
    Palette: <Palette size={40} />,
    Users: <Users size={40} />,
    Smile: <Smile size={40} />
};

const Activities = () => {

    return (
        <section id="actividades" style={{ padding: 'var(--section-padding)' }}>
            <div className="container">
                <h2 className="section-title">Lo que hacemos</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {activities.map((activity: any, index: number) => (
                        <div key={index} className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', color: 'var(--color-sky-blue)' }}>
                                {iconMap[activity.icon as keyof typeof iconMap]}
                            </div>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>{activity.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>{activity.description}</p>
                            {activity.image && (
                                <img src={activity.image} alt={activity.title} style={{ width: '100%', borderRadius: '1rem', marginTop: '1rem' }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Activities;
