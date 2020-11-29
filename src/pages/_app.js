import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Nav from '../components/nav';

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-gray-900 text-white font-sans py-2 px-10'>
      <Nav />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
