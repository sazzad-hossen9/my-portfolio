import { PortfolioData, Profile, Project, Skill, Experience, Education, Social } from '@/types/portfolio';
import { getLocalDbData } from './data';

export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  }
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  return '';
}

export async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // If in local development or custom configured host
  if (baseUrl.startsWith('http')) {
    try {
      const url = `${baseUrl.replace(/\/$/, '')}${cleanEndpoint}`;
      const fetchOptions: RequestInit =
        process.env.NODE_ENV === 'development'
          ? { cache: 'no-store' }
          : { next: { revalidate: 60 } };
      const res = await fetch(url, fetchOptions);
      if (res.ok) {
        return (await res.json()) as T;
      }
    } catch (err) {
      // In SSR or development if json-server isn't running, fallback gracefully
      console.warn(`Fetch from ${baseUrl}${cleanEndpoint} failed. Falling back to local data source.`, err);
    }
  }

  // Server-side direct data access (Vercel production and build-time)
  if (typeof window === 'undefined') {
    const data = getLocalDbData();
    const resource = cleanEndpoint.replace(/^\/api/, '').replace(/^\//, '');

    if (resource === 'profile') return data.profile as unknown as T;
    if (resource === 'projects') return data.projects as unknown as T;
    if (resource.startsWith('projects/')) {
      const id = parseInt(resource.split('/')[1], 10);
      const project = data.projects.find((p) => p.id === id);
      return project as unknown as T;
    }
    if (resource === 'skills') return data.skills as unknown as T;
    if (resource === 'experience') return data.experience as unknown as T;
    if (resource === 'education') return data.education as unknown as T;
    if (resource === 'socials') return data.socials as unknown as T;
    if (resource === '' || resource === 'all') return data as unknown as T;
  }

  // Client-side fallback to Next.js API routes
  const apiUrl = cleanEndpoint.startsWith('/api') ? cleanEndpoint : `/api${cleanEndpoint}`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${apiUrl}`);
  }
  return (await res.json()) as T;
}

export async function getProfile(): Promise<Profile> {
  return fetchFromApi<Profile>('/profile');
}

export async function getProjects(): Promise<Project[]> {
  return fetchFromApi<Project[]>('/projects');
}

export async function getProjectById(id: number | string): Promise<Project | null> {
  return fetchFromApi<Project>(`/projects/${id}`);
}

export async function getSkills(): Promise<Skill[]> {
  return fetchFromApi<Skill[]>('/skills');
}

export async function getExperience(): Promise<Experience[]> {
  return fetchFromApi<Experience[]>('/experience');
}

export async function getEducation(): Promise<Education[]> {
  return fetchFromApi<Education[]>('/education');
}

export async function getSocials(): Promise<Social[]> {
  return fetchFromApi<Social[]>('/socials');
}

export async function getAllPortfolioData(): Promise<PortfolioData> {
  const [profile, projects, skills, experience, education, socials] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getExperience(),
    getEducation(),
    getSocials(),
  ]);

  return { profile, projects, skills, experience, education, socials };
}
