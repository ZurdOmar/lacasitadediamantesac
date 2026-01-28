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

import footerData from './data/footer.json';

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
        color: 'var(--color-text-secondary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <p>{footerData.copyright}</p>
        <p style={{ fontSize: '0.8rem' }}>
          {footerData.credit}
        </p>
        <img
          src="/assets/uploads/Logo-zotek_animado.svg"
          alt="Logo Empresa"
          style={{
            height: '40px',
            width: 'auto',
            marginTop: '1rem',
            opacity: 0.8
          }}
        />
      </footer>
    </div>
  );
}

export default App;
