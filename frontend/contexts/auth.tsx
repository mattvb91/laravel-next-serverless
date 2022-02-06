import { useState, createContext, useContext, useEffect, Context, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"

/**
 * The inital auth response we get from laravel auth
 */
type Identity = {
    access_token: string,
    token_type: string,
    expires_in: Number
}

export type AuthType = {
    isAuthenticated: boolean,
    identity?: Identity,
    me?: MeType,
    loading: boolean,
    login(email: string, password: string): void,
    logout(): void,
}

declare type MeType = {
    id: number,
    name: string,
    email: string,
    email_verified_at?: string,
    created_at: string,
    updated_at: string
}

const AuthContext: Context<AuthType | null> = createContext(null);

export const AuthProvider = ({ children }) => {
    const [identity, setIdentity]: [identity: Identity, setIdentity: Dispatch<SetStateAction<Identity>>] = useState()
    const [me, setMe]: [me: MeType, setMe: Dispatch<SetStateAction<MeType>>] = useState()
    const [loading, setLoading] = useState(true)
    const [cookie, setCookie, removeCookie] = useCookies(["identity"])
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

    const fetchMe = async () => {
        const res = await fetch('/api/auth/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${identity.access_token}`
            },
            method: "POST"
        })

        setMe(await res.json())
    }

    useEffect(() => {
        if (window.localStorage.getItem("canRefresh") === "true" && !identity) {
            refresh();
        }

        if (window.localStorage.getItem("canRefresh") === "true" && identity) {
            fetchMe()
        }
    }, [identity])

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
            window.localStorage.setItem("canRefresh", "true")
            router.push("/")
        }
    }

    /**
     * Clear everything
     * Bit hacky but demonstrates whats going on
     */
    const logout = async () => {
        window.localStorage.setItem("canRefresh", "false")
        setIdentity(null)
        setMe(null)
        removeCookie("token")
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!identity, identity, me, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)