import Layout from "../components/Layout"
import { useAuth } from "../contexts/auth"

const Login = () => {

    const { login, me } = useAuth()

    const loginSubmit = async event => {
        event.preventDefault()

        login(event.target.email.value, event.target.password.value)
    }

    if (me) return <></>

    return (
        <>
            <form onSubmit={loginSubmit}>
                <label htmlFor="email">Email:</label>
                <input data-cy="login-email" name="email" type="email"></input>

                <label htmlFor="email">Password:</label>
                <input data-cy="login-password" name="password" type="password"></input>

                <input data-cy="submit-login" type="submit" />
            </form>
        </>
    )
}

Login.Layout = Layout;

export default Login;