import '../styles/globals.scss'
import LayOut from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return(
    <LayOut>
      <Component {...pageProps} />
    </LayOut>
  ) 
}

export default MyApp
