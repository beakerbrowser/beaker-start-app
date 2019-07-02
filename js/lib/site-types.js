export const SITE_TYPES = {
  websites: undefined,
  people: 'unwalled.garden/person',
  applications: 'unwalled.garden/application',
  modules: 'unwalled.garden/module',
  templates: 'unwalled.garden/template',
  themes: 'unwalled.garden/theme'
}

export const SITE_TYPES_SINGULAR = {
  websites: 'website',
  people: 'person',
  applications: 'application',
  modules: 'module',
  templates: 'template',
  themes: 'theme'
}

export function getTypeLabel (type) {
  if (type.includes('unwalled.garden/person')) return 'Person'
  if (type.includes('unwalled.garden/application')) return 'Application'
  if (type.includes('unwalled.garden/module')) return 'Module'
  if (type.includes('unwalled.garden/template')) return 'Template'
  if (type.includes('unwalled.garden/theme')) return 'Theme'
  return 'Website'
}

export function getTypeIcon (type) {
  if (type.includes('unwalled.garden/person')) return 'far fa-user'
  if (type.includes('unwalled.garden/application')) return 'far fa-window-restore'
  if (type.includes('unwalled.garden/module')) return 'fas fa-cube'
  if (type.includes('unwalled.garden/template')) return 'fas fa-pencil-ruler'
  if (type.includes('unwalled.garden/theme')) return 'fas fa-drafting-compass'
  return 'fas fa-sitemap'
}