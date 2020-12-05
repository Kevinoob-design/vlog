import HalfContainer from './halfContainer';
import ProfilePic from './profilePic';
import NavLink from './navLink';
import { UserContext } from '../pages/_app';
import React from 'react';

const Nav = () => {
  const { user, setUser } = React.useContext(UserContext);

  return (
    <nav className='h-10 flex space-x-5'>
      <HalfContainer>
        <NavLink href='/' />

        <NavLink href='/create-article'>
          <>Write an article</>
        </NavLink>
      </HalfContainer>

      <HalfContainer className='flex justify-end'>
        {user ? (
          <NavLink href='profile'>
            <ProfilePic />
          </NavLink>
        ) : (
          <NavLink href='login'></NavLink>
        )}
      </HalfContainer>
    </nav>
  );
};

export default Nav;
