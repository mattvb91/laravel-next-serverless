export default function Login() {

    const loginSubmit = async event => {
        event.preventDefault()


        const res = await fetch('/api/auth/login', {
            body: JSON.stringify({
                email: event.target.email.value,
                password: event.target.password.value,
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log(res)

        console.log(await res.json())
    }

    return (
        <>
            <form onSubmit={loginSubmit}>
                <label htmlFor="email">Email:</label>
                <input name="email" type="email"></input>

                <label htmlFor="email">Password:</label>
                <input name="password" type="password"></input>

                <input type="submit"/>
            </form>
        </>
    )
}