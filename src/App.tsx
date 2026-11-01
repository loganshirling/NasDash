import { useState } from 'react';
import ServiceButton from './ServiceButton';
import { services } from './services';
import { useServiceReachability } from './hooks/useServiceReachability';
import './App.css';

export default function App() {
  const { statuses, lastChecked, isChecking, checkAll } = useServiceReachability(services);

  // Keep sound preference locally on this device, without any backend.
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return window.localStorage.getItem('nasdash-sound') !== 'off';
    } catch {
      return true;
    }
  });

  const respondingCount = services.filter((service) => statuses[service.id] === 'responding').length;

  function toggleSound() {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try {
      window.localStorage.setItem('nasdash-sound', next ? 'on' : 'off');
    } catch {
      // Local storage is optional, e.g. private browsing.
    }
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div className="brand">
          <div className="brand-symbol" aria-hidden="true">N<span>D</span></div>
          <div>
            <p className="eyebrow">HOME NETWORK // CONTROL PANEL</p>
            <h1>NasDash<span className="brand-period">.</span></h1>
          </div>
        </div>

        <div className="header-actions">
          <button className="utility-button" type="button" onClick={toggleSound}>
            {soundEnabled ? '◖))' : '◖×'} Sound {soundEnabled ? 'on' : 'off'}
          </button>
          <button className="utility-button" type="button" onClick={() => void checkAll()} disabled={isChecking}>
            ↻ {isChecking ? 'Checking…' : 'Refresh status'}
          </button>
        </div>
      </header>

      <section className="machine" aria-label="NAS service selector">
        <div className="machine-top">
          <div>
            <p className="machine-caption">SELECT YOUR DESTINATION</p>
            <h2>Service selector</h2>
          </div>
          <div className="machine-readout" aria-live="polite">
            <span className="readout-light" aria-hidden="true" />
            <span>{respondingCount.toString().padStart(2, '0')} / {services.length.toString().padStart(2, '0')} RESPONDING</span>
          </div>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <ServiceButton
              key={service.id}
              service={service}
              status={statuses[service.id] ?? 'checking'}
              soundEnabled={soundEnabled}
            />
          ))}
        </div>

        <div className="machine-bottom">
          <span><span className="legend-dot legend-dot--lit" /> lit = browser received a response</span>
          <span><span className="legend-dot legend-dot--dim" /> dim = not verified</span>
          <span className="last-checked">
            {lastChecked ? `Last checked ${lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Checking services…'}
          </span>
        </div>
      </section>

      <p className="dashboard-note">
        Buttons open NAS apps in a new tab. Browser status checks are approximate; dim does not always mean offline.
      </p>
    </main>
  );
}
