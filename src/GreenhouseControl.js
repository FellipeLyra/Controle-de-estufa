import React, { useState, useEffect, useRef } from 'react';

const getHumidityReading = () => Math.floor(Math.random() * 101);

function GreenhouseControl() {
  const [humidity, setHumidity] = useState(50);
  const [customHumidity, setCustomHumidity] = useState('');
  const [isAuto, setIsAuto] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;

    if (isAuto) {
      interval = setInterval(() => {
        const newHumidity = getHumidityReading();
        setHumidity(newHumidity);

        console.log('New Humidity:', newHumidity);
      }, 3000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isAuto]);

  useEffect(() => {
    const handleScroll = () => {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCustomHumidityChange = (event) => {
    setCustomHumidity(event.target.value);
  };

  const handleApplyCustomHumidity = () => {
    const newHumidity = parseInt(customHumidity, 10);
    if (!isNaN(newHumidity) && newHumidity >= 0 && newHumidity <= 100) {
      setHumidity(newHumidity);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleApplyCustomHumidity();
    }
  };

  const getSystemState = () => {
    if (humidity < 40) {
      return 'lowHumidity';
    } else if (humidity > 60) {
      return 'highHumidity';
    } else {
      return 'normalHumidity';
    }
  };

  const systemState = getSystemState();

  return (
    <div
      ref={containerRef}
      style={{
        ...styles.container,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-200%)',
        transition: 'opacity 2s ease-out, transform 2s ease-out',
      }}
    >
      <h2 style={styles.sectionTitle}>Controle de Estufa</h2>
      <p>Umidade Atual: {humidity}%</p>
      <p>Estado Atual: {systemState}</p>
      {systemState === 'lowHumidity' && <p>Irrigação Ativada</p>}
      {systemState === 'normalHumidity' && <p>Sistema Normal</p>}
      {systemState === 'highHumidity' && <p>Ventilação Ativada</p>}

      <div style={styles.modeSwitcher}>
        <h3 style={styles.subSectionTitle}>Modo de Simulação</h3>
        <button style={styles.button} onClick={() => setIsAuto(true)}>Simulação Automática</button>
        <button style={styles.button} onClick={() => setIsAuto(false)}>Simulação Manual</button>
      </div>

      {!isAuto && (
        <div style={styles.manualInput}>
          <h3 style={styles.subSectionTitle}>Inserir Umidade Manualmente</h3>
          <input
            type="number"
            value={customHumidity}
            onChange={handleCustomHumidityChange}
            onKeyPress={handleKeyPress}
            min="0"
            max="100"
            style={styles.input}
          />
          <button style={styles.applyButton} onClick={handleApplyCustomHumidity}>Aplicar</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#333',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    opacity: 0,
    transform: 'translateX(-300%)',
  },
  modeSwitcher: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  manualInput: {
    marginTop: '20px',
  },
  button: {
    margin: '5px',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  applyButton: {
    margin: '5px',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  sectionTitle: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  subSectionTitle: {
    fontSize: '1.5em',
    marginBottom: '10px',
  },
};

export default GreenhouseControl;
