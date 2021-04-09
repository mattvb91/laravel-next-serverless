import { AuthProvider } from '../contexts/auth'
import '../styles/globals.css'

const Noop = ({ children }) => children

function MyApp({ Component, pageProps }) {

  const Layout = Component.Layout || Noop

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
