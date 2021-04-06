import { useState, createContext, useContext, useEffect } from 'react'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [identity, setIdentity] = useState()
    const [loading, setLoading] = useState(true)

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