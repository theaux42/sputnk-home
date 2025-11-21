//- Uptime Kuma X
// - Vaultwarden X
// - Immich
// - Grafana X
// - Dokploy
// - KVM X
// - PVE X
// - Pterodactyl
// - Paperless
// - Ntfy
// - Pingvin X

const services = [
  {
    id: 1,
    name: "proxmox",
    title: "Proxmox",
    description: "Proxmox is the main system onboard of the satelite, it manage each services.",
    link: "https://pve.sputnk.net",
    type: "Infrastructure",
    logo: "/proxmox-logo.png",
  },
  {
    id: 2,
    name: "pterodactyl",
    title: "Pterodactyl",
    description: "Pterodactyl manage automatically gameservers with ease and a lot of features.",
    link: "https://panel.sputnk.net",
    type: "Infrastructure",
    logo: "/pterodactyl-logo.png",
  },
  {
    id: 3,
    name: "vaultwarden",
    title: "Vaultwarden",
    description: "Vaultwarden is a secure password manager.",
    link: "https://bitwarden.sputnk.net",
    type: "Service",
    logo: "/vaultwarden-logo.png",
  },
  {
    id: 4,
    name: "immich",
    title: "Immich",
    description: "Immich is a self-hosted photo and video backup solution.",
    link: "https://pics.sputnk.net",
    type: "Service",
    logo: "/immich-logo.png",
  },
  {
    id: 6,
    name: "grafana",
    title: "Grafana",
    description: "Grafana is an open-source platform for monitoring and observability.",
    link: "https://grafana.sputnk.net",
    type: "Monitoring",
    logo: "/grafana-logo.png",
  },
  {
    id: 7,
    name: "uptimekuma",
    title: "Uptime Kuma",
    description: "Uptime Kuma is a self-hosted monitoring tool like 'Uptime Robot'.",
    link: "https://status.sputnk.net/status/sputnk",
    type: "Monitoring",
    logo: "/uptime-kuma-logo.png",
  },
  {
    id: 8,
    name: "dokploy",
    title: "Dokploy",
    description: "Dokploy is a simple deployment system for Docker containers.",
    link: "https://dokploy.sputnk.net",
    type: "Infrastructure",
    logo: "/dokploy-logo.png",
  },
  {
    id: 9,
    name: "paperless-ng",
    title: "Paperless NG",
    description: "Paperless NG is a document management system that stores and organizes your digital documents.",
    link: "https://docs.sputnk.net",
    type: "Service",
    logo: "/paperless-logo.png",
  },
  {
    id: 10,
    name: "ntfy",
    title: "Ntfy",
    description: "Ntfy is a simple HTTP-based pub-sub notification service.",
    link: "https://ntfy.sputnk.net",
    type: "Service",
    logo: "/ntfy-logo.png",
  }
];

export default services;
