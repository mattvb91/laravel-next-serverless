import React from "react"
import { useAuth } from "../contexts/auth"
import { Header } from "./Header/Header"

const Layout = ({children}) => {
    const auth = useAuth()

    return (
        <>
            <Header auth={auth}></Header>
            {children}
        </>
    )
}

export default Layout;