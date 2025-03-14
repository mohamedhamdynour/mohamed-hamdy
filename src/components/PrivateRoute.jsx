import { Navigate, useLocation } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const isAuthenticated = localStorage.getItem("token") !== null

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/admin" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute

