import { User } from 'src/pages';
import { getSocial } from '../shared/util/util';
import * as Icon from 'react-icons/Fa';
import { IconType } from 'react-icons';
import ProfilePic from '../components/profilePic';
import NavLink from '../components/navLink';

type Props = {
  uid: User;
};

const UserCard = ({ uid }: React.PropsWithoutRef<Props>) => {
  const socialMedia = new Map(Object.entries(uid.socialMedia || new Map()));

  return (
    <div className='border-t-2 border-b-2 border-opacity-5 py-5 border-white flex space-x-5'>
      <ProfilePic className='h-14 w-14' />
      <div>
        <p className='font-serif font-medium text-lg'>
          {uid.firstName} {uid.lastName}
        </p>

        <div className='flex items-center'>
          {[...socialMedia.keys()].map((social) => {
            const SocialIcon: IconType = Icon[getSocial(social)];
            return <NavLink href={socialMedia.get(social)}>{<SocialIcon className='h-4 w-4 text-gray-400' />}</NavLink>;
          })}
        </div>
        <div className='flex space-x-3 items-center tracking-wider'>
          <p className='font-serif text-sm text-gray-400'>{uid.followers} subscribers</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
