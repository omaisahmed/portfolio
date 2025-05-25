import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useSettings() {
  return useSWR('/api/settings', fetcher)
}

export function useProfile() {
  return useSWR('/api/profile', fetcher)
}

export function useServices() {
  return useSWR('/api/services', fetcher)
}

export function useTestimonials() {
  return useSWR('/api/testimonials', fetcher)
}

export function useService(id: string | null) {
  return useSWR(id ? `/api/services/${id}` : null, fetcher)
}

export function useTestimonial(id: string | null) {
  return useSWR(id ? `/api/testimonials/${id}` : null, fetcher)
}

export function useContacts() {
  return useSWR('/api/contact', fetcher)
}

export function useContact(id: string | null) {
  return useSWR(id ? `/api/contact/${id}` : null, fetcher)
}

export function useEducation() {
  return useSWR('/api/resume/education', fetcher)
}

export function useEducationById(id: string | null) {
  return useSWR(id ? `/api/resume/education/${id}` : null, fetcher)
}

export function useExperience() {
  return useSWR('/api/resume/experience', fetcher)
}

export function useExperienceById(id: string | null) {
  return useSWR(id ? `/api/resume/experience/${id}` : null, fetcher)
}

export function useSkills() {
  return useSWR('/api/resume/skill', fetcher)
}

export function useSkillById(id: string | null) {
  return useSWR(id ? `/api/resume/skill/${id}` : null, fetcher)
}

export function useCertifications() {
  return useSWR('/api/resume/certification', fetcher)
}

export function useCertificationById(id: string | null) {
  return useSWR(id ? `/api/resume/certification/${id}` : null, fetcher)
}

export function useProjects() {
  return useSWR('/api/projects', fetcher)
}

export function useProjectById(id: string | null) {
  return useSWR(id ? `/api/projects/${id}` : null, fetcher)
}

export function useAuth() {
  return useSWR('/api/auth/check', fetcher)
}