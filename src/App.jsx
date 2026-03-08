import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Pływające serca po całym ekranie
function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
        size: 18 + Math.random() * 24,
      })),
    []
  );

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {hearts.map(h => (
        <motion.div
          key={h.id}
          initial={{ y: `${h.top}vh`, opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
          className="heart"
          style={{ position: 'absolute', left: `${h.left}%`, fontSize: h.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

// Kartka 3D
function Card3D({ name, message }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ perspective: 2000, width: '90vw', maxWidth: '400px', height: '60vh', maxHeight: '500px', cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      <motion.div
        animate={{ rotateY: open ? -160 : 0 }}
        transition={{ duration: 1 }}
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
      >
        {/* front */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #f9c0d3, #d9b8f2)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', color: '#fff' }}>{name}</h1>
        </div>

        {/* back */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: 'rotateY(180deg)',
            borderRadius: '24px',
            background: '#fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: open ? 1 : 0, y: open ? 0 : 20 }}
            transition={{ delay: 0.3 }}
            style={{ color: '#f06292', fontSize: '2rem', textAlign: 'center' }}
          >
            Wszystkiego najlepszego 🌸
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ delay: 0.6 }}
            style={{ marginTop: '20px', color: '#555', textAlign: 'center' }}
          >
            {message}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ delay: 0.9 }}
            style={{ marginTop: '20px', color: '#f06292', fontSize: '1.5rem' }}
          >
            💖🌸💖
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// App – główny komponent
export default function App() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || 'Luiza';

  const defaultMessage = 'Dziękuję, że jesteś. Ten dzień jest idealny, aby przypomnieć Ci, jak wyjątkową osobą jesteś.';
  const messages = {
    Luiza: 'Mamo w tym dniu chciałbym życzyć Ci wszystkiego co najlepsze z okazji twojego święta!',
    Monika: 'Monika z okazji dnia kobiet życze Ci wszystkiego co najlepsze i żebyś więcej się uśmiechała bo tak wyglądasz znacznie lepiej!',
    Zuzia: 'Zuzia, chciałem Ci powiedzieć, że jesteś bardzo ładna i naprawdę dorze sie z Tobą rozmawia i może kiedyś moglibyśmy też pogadać poza pracą! Wszystkiego najlepszego z okazji Dnia Kobiet!',
    Weronika: 'Weronika życzę ci wszystkiego najlepszego z okazji Dnia Kobiet i trzeba by sie spotkać, w końcu gdzieś wyskoczyć!',
    Wiktoria: 'Wiktoria naprawdę dobrze się z Tobą ostatnio gadało i trzeba powtórzyć te rundki! Wszystkiego najlepszego z okazji Dnia Kobiet!',
    Henryka: 'Babciu życzę ci dużo zdrowia i uśmiechu z okazji Dnia Kobiet!',
    Kinga: 'Kinga, Wszystkiego Najlepszego z Okazji Dnia Kobiet!',
    Kamila: 'Ciociu, dziękuję, że zawsze mi pomagałaś i że zawsze mogłem z Tobą pogadać o wszystkim! Wszystkiego Najlepszego z Okazji Dnia Kobiet!',
  };

  const heartsMode = name === 'Zuzia' || name === 'Weronika';

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw' }}>
      {heartsMode && <FloatingHearts />}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          zIndex: 1,
          position: 'relative',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', marginBottom: '40px', color: '#fff' }}>{name}</h1>
        <Card3D name={name} message={messages[name] || defaultMessage} />
      </div>
    </div>
  );
}