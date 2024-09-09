import './index.css'; // Importa o arquivo CSS global
import React from 'react';
import { createRoot } from 'react-dom/client';
import GreenhouseControl from './GreenhouseControl'; // Importando o componente do sistema
import automatoImg from '../src/img/automato.png';
import { useState, useRef, useEffect } from 'react';


function Header() {
  return (
    <header className='header'>
      <h1 className="title">Controle de</h1>
      <h1 className="title">Estufa Inteligente</h1>
      <p className="subtitle">Monitore e controle os níveis de umidade de sua estufa automaticamente.</p>
    </header>
  );
}

function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const featureRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, []);

  return (
    <section 
      className={`features ${isVisible ? 'visible' : ''}`} 
      ref={featureRef}
    >
      <h2 className="sectionTitle">Principais Funcionalidades</h2>
      <ul className="featureList">
        <li>Controle automático de irrigação e ventilação baseado em sensores.</li>
        <li>Sistema eficiente e de fácil monitoramento.</li>
        <li>Ideal para manter condições ideais de cultivo de forma automática.</li>
      </ul>
    </section>
  );
}

function Lógica() {
  const [isVisible, setIsVisible] = useState(false);
  const featureRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, []);
  return (
    <section className={`logica ${isVisible ? 'visible' : ''}`} ref={featureRef}>
      <h2 className="sectionTitle">Lógica do sistema</h2>
      <ul className="featureList">
        <li>Um sensor de umidade mede a umidade atual do ambiente.</li>
        <li>Um analisador compara a leitura com três faixas:</li>
        <ul className="logica-list">
          <li>Umidade Baixa: abaixo de 39%</li>
          <li>Umidade Normal: entre 40% e 60%</li>
          <li>Umidade Alta: acima de 61%</li>
        </ul>
        <li>Dependendo da faixa em que a umidade se encontra, o analisador toma as seguintes ações:</li>
        <ul className="logica-list">
          <li>Umidade Baixa: Ativa irrigação</li>
          <li>Umidade Normal: Entra em stand by</li>
          <li>Umidade Alta: Ativa ventilação</li>
        </ul>
      </ul>
    </section>
  );
}

function Automato() {
  const [isVisible, setIsVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const featureRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.9 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsListVisible(true);
      }, 1000); // Tempo da animação do automato

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section className={`automato ${isVisible ? 'visible' : ''}`} ref={featureRef}>
      <h2 className="sectionTitle">Autômato</h2>
      <div className="content">
        <img
          src={automatoImg}
          alt="Autômato determinístico"
          className="image"
        />
        <div className={`lista ${isListVisible ? 'animate' : ''}`}>
          <h2 className="geral">Interpretação geral</h2>
          <ul className="featureList">
            <li>O sistema começa no estado "on/off" que liga ou desliga o sistema.</li>
            <li>A partir do estado "análise", dependendo de diferentes condições (0, 1, 2), o sistema pode transitar para "stand by", "irrigação" ou "ventilação".</li>
            <li>As transições automáticas (marcadas por "λ") indicam que o sistema pode retornar ao estado "análise" após completar alguma ação em "stand by", "irrigação" ou "ventilação".</li>
          </ul>
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Controle de Estufa Inteligente. Todos os direitos reservados.</p>
      <p>Feito com React. by Fellipe Lyra.</p>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="container">
      <Header />
      <Features />
      <Lógica />
      <Automato />
      <section className="systemDemo">
        <h2 className="sectionTitle">Demonstração do Sistema</h2>
        <GreenhouseControl />
      </section>
      <Footer />
    </div>
  );
}


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<LandingPage />);
