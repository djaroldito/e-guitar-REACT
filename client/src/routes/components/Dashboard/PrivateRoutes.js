import { Outlet } from 'react-router-dom'
import Login from './UserLogin'
import { useSelector } from "react-redux"

export default function PrivateRoutes() {
    const { adminUser } = useSelector((state) => state.dashboard)

  return (
    adminUser.email ? <Outlet/> : <Login />
  )
}
