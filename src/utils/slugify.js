/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - The text to convert
 * @returns {string} - The slugified text
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')           // Trim - from start of text
    .replace(/-+$/, '')           // Trim - from end of text
}

/**
 * Create a mapping of project IDs to slugs
 * @param {Array} projects - Array of project objects
 * @returns {Object} - Mapping of slugs to project IDs
 */
export const createSlugMapping = (projects) => {
  const mapping = {}
  projects.forEach(project => {
    const slug = slugify(project.title1 || project.title || 'project')
    mapping[slug] = project.projectId || project.id
  })
  return mapping
}
