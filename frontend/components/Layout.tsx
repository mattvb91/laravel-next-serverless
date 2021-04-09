import { useAuth } from "../contexts/auth"
import { Header } from "./Header/Header"

export default function Layout({ children }) {
    const auth = useAuth()

    return (
        <>
            <Header auth={auth}></Header>
            {children}
        </>
    )
}
