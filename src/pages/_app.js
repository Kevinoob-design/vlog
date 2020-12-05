import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Nav from '../components/nav';
import Footer from '../components/footer';

export const UserContext = React.createContext(null);

function MyApp ( { Component, pageProps } ) {

  const [ user, setUser ] = React.useState( null );

  return (
    <UserContext.Provider value={ { user, setUser } }>
      <div className='primary-bg-color text-white font-sans min-h-screen debug-screens'>
        <div className='py-2 md:px-10'>
          <Nav />
          <Component { ...pageProps } />
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default MyApp;
