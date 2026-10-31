import { PortfolioContent } from './models/portfolio.model';

export const PORTFOLIO_CONTENT: PortfolioContent = {
  profile: {
    name: 'Simon Prouteau',
    tagline: 'Développeur senior Angular, freelance. Migrations, architecture front et applications métier.',
    availability: "Disponible · Les Sables d'Olonne / remote",
    cvUrl: 'assets/CV-Simon-Prouteau.pdf',
  },
  nav: [
    { id: 'offre', label: "Ce que j'apporte" },
    { id: 'projets', label: 'Projets pro' },
    { id: 'marchlords', label: 'Projets perso' },
    { id: 'stack', label: 'Stack' },
    { id: 'parcours', label: 'Parcours' },
    { id: 'contact', label: 'Contact' },
  ],
  intro: "Dix ans sur Angular, d'AngularJS à la v22.",
  phrases: [
    'Je reprends les applications qui ont vieilli et je les remets à jour, proprement.',
    "Je pense produit avant de penser code : ce qui compte, c'est ce que l'utilisateur en fait.",
    'Je transforme un besoin flou en interface claire, livrée et utilisée.',
    "Curieux, fiable, à l'écoute : vous gagnez un dev, mais aussi un vrai partenaire.",
  ],
  offers: [
    {
      title: 'Un produit, de A à Z',
      description:
        'Du cadrage à la mise en production, je conçois des applications web utiles, pas seulement fonctionnelles.',
    },
    {
      title: 'Renfort d’équipe',
      description: "Je m'intègre vite, je pose des bases solides et je fais monter l'équipe en compétence.",
    },
    {
      title: 'Modernisation',
      description: "J'offre une seconde vie aux apps Angular vieillissantes, sans mettre le produit en pause.",
    },
    {
      title: 'Outils métier & cartes',
      description:
        'Dashboards, back-offices, cartographie interactive : des écrans denses qui restent simples à utiliser.',
    },
  ],
  projects: [
    {
      name: 'Gestion des tournées',
      client: 'Colis Privé',
      year: '2024',
      description:
        "Réécriture complète d'un outil interne utilisé chaque jour par plusieurs centaines de personnes, d'AngularJS vers Angular 18.",
      tech: 'Angular 18 · Signals · Azure CI',
    },
    {
      name: 'Colis Privé Store Belgique',
      client: 'Colis Privé',
      year: '2025',
      description: 'Création des sites internes du réseau Store en Belgique.',
      tech: 'Angular 20 · PrimeNG',
    },
    {
      name: 'Moteur cartographique',
      client: 'Spir Communication',
      year: '2016',
      description:
        'Affichage optimisé de gros volumes GeoJSON et calcul des tarifs de distribution en temps réel sur carte.',
      tech: 'AngularJS · Leaflet',
    },
    {
      name: 'E-commerce & relais colis',
      client: 'Hopps Group',
      year: '2019',
      description:
        'Site e-commerce avec paiement Monext, site de gestion de relais colis et dashboard clients logistique.',
      tech: 'Angular 7 · Monext · Jasmine',
    },
  ],
  sideProject: {
    name: 'Marchlords',
    period: "2024 — aujourd'hui",
    url: 'https://marchlords.com',
    description:
      'Jeu de campagne stratégique multijoueur au tour par tour pour Warhammer. Carte hexagonale interactive avec brouillard de guerre, règles de vision et contrôle de territoire.',
    points: [
      'Angular 21 SSR, signals, PrimeNG',
      'Carte hex OpenLayers',
      'API NestJS, TypeORM, PostgreSQL 17',
      'Docker, Traefik, GitHub Actions sur VPS OVH',
    ],
  },
  linkedProject: {
    name: 'Interviews Training',
    url: 'https://interviewstraining.vercel.app/',
    displayUrl: 'interviewstraining.vercel.app',
    description: "Application d'entraînement aux entretiens techniques.",
  },
  stack: [
    { category: 'Front', items: 'Angular 2 → 22, AngularJS, React' },
    { category: 'Langages & état', items: 'TypeScript, JavaScript, RxJS, NgRx' },
    { category: 'Back', items: 'NestJS, AdonisJS, TypeORM, PostgreSQL' },
    {
      category: 'UI & carto',
      items: 'Angular Material, PrimeNG, Kendo UI, Tailwind, Sass, Leaflet, OpenLayers',
    },
    { category: 'Tests', items: 'Jasmine, Cypress' },
    { category: 'Outils', items: 'Azure DevOps, GitHub Actions, Docker, Git, Claude Code, Copilot' },
  ],
  experiences: [
    {
      period: '2023 — auj.',
      role: 'Lead dev front Angular',
      company: 'Colis Privé',
      place: 'Marseille / Nantes',
      description:
        "Création de l'équipe front, architectures, CI sur Azure, migrations Angular 8 → 17/18 puis suivi des releases, passage aux Signals.",
    },
    {
      period: '2017 — 2023',
      role: 'Développeur front Angular',
      company: 'Hopps Group',
      place: 'Aix-en-Provence',
      description:
        "Passage d'AngularJS à Angular 2+, logiciel de campagnes d'imprimés externalisé chez les clients, e-commerce, dashboards, supervision.",
    },
    {
      period: '2016',
      role: 'Stage développeur front',
      company: 'Spir Communication',
      place: 'Aix-en-Provence',
      description: 'Outil de vente pour les commerciaux : zones de distribution sur carte Leaflet, tarifs en temps réel.',
    },
    {
      period: '2013 — 2016',
      role: 'Ingénieur informatique',
      company: 'Mines de Saint-Étienne',
      place: '+ Master CS, HKUST',
      description:
        'Spécialité informatique et micro-électronique. Projet industriel OCR en C++ et application Android.',
    },
  ],
  githubUrl: 'https://github.com/',
  linkedinUrl: 'https://www.linkedin.com/',
};
