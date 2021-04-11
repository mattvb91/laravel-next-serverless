import Layout from "../components/Layout"
import { useAuth } from "../contexts/auth"

const Login = () => {

    const auth = useAuth()

    const loginSubmit = async event => {
        event.preventDefault()

        auth.login(event.target.email.value, event.target.password.value)
    }

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