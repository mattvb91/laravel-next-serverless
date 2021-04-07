import Link from 'next/link'
import { useAuth } from '../contexts/auth'
import { useEffect, useState } from "react"

export default function Identity() {

    const authState = useAuth()
    const [me, setMe] = useState()

    const fetchMe = async () => {
        const res = await fetch('/api/auth/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authState.identity.access_token}`
            },
            method: "POST"
        })

        setMe(await res.json())
    }

    useEffect(() => {
        if (authState.identity && !me) {
            fetchMe()
        }

    }, [authState])

    if (!authState.identity) {
        return <Link href="/login">Sign In</Link>
    }

    return (
        <>
            {me && <>{me.name} - {me.email}</>}
        </>
    )
}
