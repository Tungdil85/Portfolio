export interface Profile {
  name: string;
  tagline: string;
  availability: string;
  cvUrl: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Offer {
  title: string;
  description: string;
}

export interface Project {
  name: string;
  client: string;
  year: string;
  description: string;
  tech: string;
}

export interface SideProject {
  name: string;
  period: string;
  url: string;
  description: string;
  points: readonly string[];
}

export interface LinkedProject {
  name: string;
  url: string;
  displayUrl: string;
  description: string;
}

export interface StackGroup {
  category: string;
  items: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  place: string;
  description: string;
}

export interface PortfolioContent {
  profile: Profile;
  nav: readonly NavItem[];
  intro: string;
  phrases: readonly string[];
  offers: readonly Offer[];
  projects: readonly Project[];
  sideProject: SideProject;
  linkedProject: LinkedProject;
  stack: readonly StackGroup[];
  experiences: readonly Experience[];
  githubUrl: string;
  linkedinUrl: string;
}
