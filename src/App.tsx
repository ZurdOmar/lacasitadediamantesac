import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Activities from './components/Activities';
import Donations from './components/Donations';
import Transparency from './components/Transparency';
import Chatbot from './components/Chatbot';
import { useEffect } from 'react';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

function App() {
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user: any) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Activities />
        <Transparency />
        <Donations />
      </main>
      <Chatbot />
      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid #eee',
        marginTop: '4rem',
        color: 'var(--color-text-secondary)'
      }}>
        <p>&copy; 2026 La Casita de Diamantes A.C. | Todos los derechos reservados.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Diseñado con amor por una niñez más brillante.
        </p>
      </footer>
    </div>
  );
}

export default App;
