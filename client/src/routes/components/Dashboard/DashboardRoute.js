import { Navigate } from "react-router-dom"
import styled from "styled-components"

export default function DashboardRoute({ children }) {
	return sessionStorage.isAdmin==='true' ? <DashboardContainter> {children} </DashboardContainter> : <Navigate to={"/home"} replace />
}

const DashboardContainter = styled.div`
  main, section{
        max-width: 95%;
        margin-left: 0;
        margin-right: 0;
    }
`