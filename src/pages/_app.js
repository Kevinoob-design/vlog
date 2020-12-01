import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Nav from '../components/nav';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }) {
  return (
    <div className='primary-bg-color text-white font-sans min-h-screen debug-screens'>
      <div className='py-2 md:px-10'>
        <Nav />
        <Component {...pageProps} />
      </div>

      <Footer />
    </div>
  );
}

export default MyApp;
