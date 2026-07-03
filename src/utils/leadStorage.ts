import { STORAGE_KEYS } from '../config/brand'

export type LeadType = 'suscripcion' | 'demo' | 'llamada' | 'negocio_demo'

export interface Lead {
  id: string
  type: LeadType
  createdAt: string
  name: string
  email: string
  phone?: string
  businessName?: string
  industry?: string
  plan?: string
  users?: string
  products?: string
  branches?: string
  message?: string
}

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

function append<T>(key: string, item: T) {
  const list = read<T>(key)
  list.unshift(item)
  localStorage.setItem(key, JSON.stringify(list.slice(0, 100)))
}

export function saveLead(lead: Omit<Lead, 'id' | 'createdAt'>): Lead {
  const full: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  append(STORAGE_KEYS.leads, full)
  return full
}

export function getLeads(): Lead[] {
  return read<Lead>(STORAGE_KEYS.leads)
}

export interface DemoBusiness {
  id: string
  createdAt: string
  name: string
  industry: string
  plan: string
  owner: string
}

export function saveDemoBusiness(biz: Omit<DemoBusiness, 'id' | 'createdAt'>): DemoBusiness {
  const full: DemoBusiness = {
    ...biz,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  append(STORAGE_KEYS.businesses, full)
  return full
}

export function getDemoBusinesses(): DemoBusiness[] {
  return read<DemoBusiness>(STORAGE_KEYS.businesses)
}
