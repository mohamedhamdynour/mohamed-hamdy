import { Link } from "react-router-dom"
import { getFullPath } from "../utils/baseUrl"

/**
 * A custom Link component that handles GitHub Pages path issues
 */
const CustomLink = ({ to, children, ...props }) => {
  // Handle external links
  if (to.startsWith("http") || to.startsWith("mailto:")) {
    return (
      <a href={to} {...props}>
        {children}
      </a>
    )
  }

  // Handle internal links
  const fullPath = getFullPath(to)

  return (
    <Link to={fullPath} {...props}>
      {children}
    </Link>
  )
}

export default CustomLink

