export const SITE_TYPES = {
  websites: undefined,
  people: 'unwalled.garden/person',
  templates: 'unwalled.garden/template',
  themes: 'unwalled.garden/theme'
}

export const SITE_TYPES_SINGULAR = {
  websites: 'website',
  people: 'person',
  templates: 'template',
  themes: 'theme'
}

export function getTypeCategory (type) {
  if (type.includes('unwalled.garden/person')) return 'people'
  if (type.includes('unwalled.garden/template')) return 'templates'
  if (type.includes('unwalled.garden/theme')) return 'themes'
  return 'websites'
}

export function getTypeLabel (type) {
  if (type.includes('unwalled.garden/person')) return 'Person'
  if (type.includes('unwalled.garden/template')) return 'Template'
  if (type.includes('unwalled.garden/theme')) return 'Theme'
  return 'Website'
}

export function getTypeIcon (type) {
  if (type.includes('unwalled.garden/person')) return 'far fa-user'
  if (type.includes('unwalled.garden/template')) return 'fas fa-pencil-ruler'
  if (type.includes('unwalled.garden/theme')) return 'fas fa-drafting-compass'
  return 'fas fa-sitemap'
}