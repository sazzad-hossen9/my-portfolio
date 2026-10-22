export interface Profile {
  id: number;
  name: string;
  role: string;
  greeting: string;
  description: string;
  image: string;
  location: string;
  email: string;
  phone?: string;
  resume: string;
  github: string;
  linkedin: string;
  facebook: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Social {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  socials: Social[];
}
