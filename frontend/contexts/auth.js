import { useState, createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [identity, setIdentity] = useState()
    const [loading, setLoading] = useState(true)
    const [cookie, setCookie] = useCookies(["identity"])
    const router = useRouter()

    const refresh = async () => {
        const res = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })

        const response = await res.json()
        if (response.access_token) {
            setIdentity(response)
            setCookie("token", response.access_token, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
                httpOnly: false
            })
        }
    }


    useEffect(() => {
        if (window.localStorage.getItem("canRefresh") && !identity) {
            refresh();
        }
    }, [])

    const login = async (email, password) => {
        const res = await fetch('/api/auth/login', {
            body: JSON.stringify({
                email,
                password,
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const response = await res.json()
        if (response.access_token) {
            setIdentity(response)
            setCookie("token", response.access_token, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
                httpOnly: false
            })
            window.localStorage.setItem("canRefresh", true)
            router.push("/")
        }
    }

    const logout = async () => { }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!identity, identity, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)