export const SITE_TYPES = {
  websites: undefined,
  people: 'unwalled.garden/person',
  applications: 'application',
  modules: 'unwalled.garden/module',
  themes: 'unwalled.garden/theme'
}

export const SITE_TYPES_SINGULAR = {
  websites: 'website',
  people: 'person',
  applications: 'application',
  modules: 'module',
  themes: 'theme'
}

export function getTypeCategory (type) {
  if (type.includes('unwalled.garden/person')) return 'people'
  if (type.includes('application')) return 'applications'
  if (type.includes('unwalled.garden/module')) return 'modules'
  if (type.includes('unwalled.garden/theme')) return 'themes'
  return 'websites'
}

export function getTypeLabel (type) {
  if (type.includes('unwalled.garden/person')) return 'Person'
  if (type.includes('application')) return 'Application'
  if (type.includes('unwalled.garden/module')) return 'Module'
  if (type.includes('unwalled.garden/theme')) return 'Theme'
  return 'Website'
}

export function getTypeIcon (type) {
  if (type.includes('unwalled.garden/person')) return 'far fa-user'
  if (type.includes('application')) return 'far fa-window-restore'
  if (type.includes('unwalled.garden/module')) return 'fas fa-cube'
  if (type.includes('unwalled.garden/theme')) return 'fas fa-drafting-compass'
  return 'fas fa-sitemap'
}