import { useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import ServiceIcon from './ServiceIcon';
import type { Service } from './services';
import type { Reachability } from './hooks/useServiceReachability';
import { playClickSound, vibrateOnPress } from './utils/feedback';
import './ServiceButton.css';
import homeboxArtwork from './assets/homebox.svg?inline';

type ServiceButtonProps = {
  service: Service;
  status: Reachability;
  soundEnabled: boolean;
};

const statusText: Record<Reachability, string> = {
  checking: 'Checking…',
  responding: 'Responding',
  unverified: 'Not verified',
};

/**
 * One acrylic-covered, backlit mechanical selection button.
 * It stays an ordinary <a> link for accessibility and reliable new-tab opening.
 */
export default function ServiceButton({ service, status, soundEnabled }: ServiceButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  function pressFeedback() {
    setIsPressed(true);
    if (soundEnabled) playClickSound();
    vibrateOnPress();
  }

  function releaseButton() {
    // A tiny delay makes the button feel as if it springs back out.
    window.setTimeout(() => setIsPressed(false), 350);
  }

  function handleKeyboard(event: KeyboardEvent<HTMLAnchorElement>) {
    if (event.key === ' ') {
      // Space normally scrolls an <a>; make it activate the button instead.
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  return (
    <div className="vending-slot" style={{ '--accent': service.accent } as CSSProperties}>
      <span className="slot-screw slot-screw--left" aria-hidden="true" />
      <span className="slot-screw slot-screw--right" aria-hidden="true" />

      <a
        className={`vending-button vending-button--${status}${isPressed ? ' vending-button--pressed' : ''}`}
        href={service.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${service.name} in a new tab`}
        title={`${service.name} • ${statusText[status]} • ${service.url}`}
        onPointerDown={pressFeedback}
        onPointerUp={releaseButton}
        onPointerCancel={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}


        onClick={(event) => {
        // Allow Ctrl+Click and other modified clicks to behave normally.
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
            return;
        }

        // Prevent the anchor from opening immediately.
        event.preventDefault();

        // Play feedback when activated by keyboard.
        if (event.detail === 0) pressFeedback();

        // Start the button release animation.
        releaseButton();

        // Wait 500ms before opening the service.
        window.setTimeout(() => {
            window.open(service.url, '_blank', 'noopener,noreferrer');
        }, 500);
        }}


        onKeyDown={handleKeyboard}
        onBlur={() => setIsPressed(false)}
      >

        <span className="vending-insert">
        {service.name === 'HomeBox' ? (
            // Custom artwork for the HomeBox button.
            <img
            src={homeboxArtwork}
            className="service-artwork"
            alt=""
            />
        ) : (
            // Standard layout for all other services.
            <>
            <span className="service-emblem">
                <ServiceIcon icon={service.icon} />
            </span>

            <span className="service-copy">
                <strong>{service.name}</strong>
                <small>PRESS TO OPEN</small>
            </span>
            </>
        )}

        <span className="service-status" aria-hidden="true" />
        </span>

        {/* These are non-interactive optical layers: plastic lip + light glare. */}
        <span className="vending-plastic" aria-hidden="true" />
        <span className="vending-reflection" aria-hidden="true" />
      </a>
    </div>
  );
}
