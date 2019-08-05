export const SITE_TYPES = {
  websites: undefined,
  people: 'unwalled.garden/person',
  themes: 'unwalled.garden/theme'
}

export const SITE_TYPES_SINGULAR = {
  websites: 'website',
  people: 'person',
  themes: 'theme'
}

export function getTypeCategory (type) {
  if (type.includes('unwalled.garden/person')) return 'people'
  if (type.includes('unwalled.garden/theme')) return 'themes'
  return 'websites'
}

export function getTypeLabel (type) {
  if (type.includes('unwalled.garden/person')) return 'Person'
  if (type.includes('unwalled.garden/theme')) return 'Theme'
  return 'Website'
}

export function getTypeIcon (type) {
  if (type.includes('unwalled.garden/person')) return 'far fa-user'
  if (type.includes('unwalled.garden/theme')) return 'fas fa-drafting-compass'
  return 'fas fa-sitemap'
}