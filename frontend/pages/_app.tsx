import Identity from '../components/identity'
import { AuthProvider } from '../contexts/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <AuthProvider>
      <Identity />
      <Component {...pageProps} />
    </AuthProvider>
  </>
}

export default MyApp
