import HalfContainer from './halfContainer';
import ProfilePic from './profilePic';
import NavLink from './navLink';

const Nav = () => {
  return (
    <nav className='h-10 flex mb-14'>
      <HalfContainer>
        <NavLink href='/' />
      </HalfContainer>

      <HalfContainer className='flex justify-end'>
        <NavLink href='profile'>
          <ProfilePic />
        </NavLink>
      </HalfContainer>
    </nav>
  );
};

export default Nav;
