import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Nav from '../components/nav';

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-gray-900 text-white font-sans min-h-screen'>
      <div className='py-2 md:px-10'>
        <Nav />
        <Component {...pageProps} />
      </div>

      <div className='items-center w-full h-96 bg-gray-800'></div>
    </div>
  );
}

export default MyApp;
