/**
 * Gets the base URL for GitHub Pages deployment
 * This is needed because GitHub Pages deploys to username.github.io/repo-name
 */
const getBaseUrl = () => {
  // In development, use empty string
  if (process.env.NODE_ENV === "development") {
    return ""
  }

  // In production, use the repository name from package.json
  // This assumes your package.json has a "homepage" field set to "https://username.github.io/repo-name"
  const homepage = process.env.PUBLIC_URL || ""
  return homepage
}

/**
 * Prepends the base URL to a path
 * @param {string} path - The path to prepend the base URL to
 * @returns {string} The full URL
 */
export const getFullPath = (path) => {
  const baseUrl = getBaseUrl()
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${baseUrl}${normalizedPath}`
}

export default getBaseUrl

