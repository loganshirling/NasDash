/**
 * The only file you need to edit to add, remove, or rename a NAS app.
 * Each service is rendered as one vending-machine selection button.
 */
export type Service = {
  id: string;
  name: string;
  url: string;
  icon: 'home' | 'food' | 'film' | 'tasks' | 'box' | 'download';
  accent: string; // Backlight color when the service responds.
};

export const services: Service[] = [
  {
    id: 'home-assistant',
    name: 'Home Assistant',
    url: 'http://10.0.0.169:8123',
    icon: 'home',
    accent: '#5ac7f4',
  },
  {
    id: 'mealie',
    name: 'Mealie',
    url: 'http://10.0.0.169:9925',
    icon: 'food',
    accent: '#ffb66b',
  },
  {
    id: 'seerr',
    name: 'Seerr',
    url: 'http://10.0.0.169:5055',
    icon: 'film',
    accent: '#c3a2ff',
  },
  {
    id: 'donetick',
    name: 'DoneTick',
    url: 'http://10.0.0.169:2021',
    icon: 'tasks',
    accent: '#81e8b0',
  },
  {
    id: 'homebox',
    name: 'Homebox',
    url: 'http://10.0.0.169:3100',
    icon: 'box',
    accent: '#ffbd77',
  },
  {
    id: 'qbittorrent',
    name: 'qBittorrent',
    url: 'http://10.0.0.169:8080',
    icon: 'download',
    accent: '#7caeff',
  },
];
