import type { ReactNode } from 'react';
import type { Service } from './services';

/**
 * Small built-in SVG symbols. No icon package or external network needed.
 * They stand in for real app logos, which we can add in a later design pass.
 */
export default function ServiceIcon({ icon }: { icon: Service['icon'] }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const symbols = {
    home: (
      <>
        <path d="m3 11 9-8 9 8v10H3z" />
        <path d="M9 21v-7h6v7" />
      </>
    ),
    food: (
      <>
        <path d="M4 3v8a3 3 0 0 0 6 0V3M7 3v18" />
        <path d="M20 3c-4 2-5 6-5 10h5V3Zm0 10v8" />
      </>
    ),
    film: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m10 9 6 3-6 3V9ZM3 9h3M3 15h3M18 9h3M18 15h3" />
      </>
    ),
    tasks: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="m8 9 2 2 4-4M8 16h8" />
      </>
    ),
    box: (
      <>
        <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" />
        <path d="m3 7 9 5 9-5M12 12v10M8 4l9 5" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />
      </>
    ),
  } satisfies Record<Service['icon'], ReactNode>;

  return (
    <svg viewBox="0 0 24 24" width="38" height="38" aria-hidden="true" {...common}>
      {symbols[icon]}
    </svg>
  );
}
