import { FaHeartBroken, FaHeart, FaCommentAlt, FaBookmark } from 'react-icons/Fa';
import Image from 'next/image';
import ProfilePic from './profilePic';
import IconButton from './IconButton';
import NavLink from './navLink';

type User = {
  followers: number;
  socialMedia: string[];
  firstName: string;
  lastName: string;
};

type Props = {
  _id: string;
  user?: User;
  title?: string;
  imgUrl?: string;
  created?: Date;
};

const CardArticle = ({ _id, user, title, imgUrl = '/350x200.png', created }: React.PropsWithoutRef<Props>) => {
  const onClick = (input: React.ChangeEvent<HTMLInputElement>): void => {
    input.stopPropagation();
    console.log(input);
  };

  return (
    <NavLink href={_id} className='mt-10 bg-gray-800 w-80 h-96 flex flex-col space-y-2 rounded-xl p-2'>
      <div className='flex justify-between'>
        <ProfilePic />
        <div className='flex space-x-2'>
          <IconButton icon={<FaBookmark />} />
        </div>
      </div>
      <div className='h-20'>
        <p>How To Add, Modify and Delete JavaScript Object Literal Properties</p>
      </div>
      <div className='h-5'>
        <p className='text-sm text-gray-500'>{created}</p>
      </div>
      <Image className='bg-gray-500 rounded-lg' width='350' height='200' src={imgUrl}></Image>
      <div className='flex space-x-3'>
        <IconButton onClick={onClick} icon={<FaHeart />} activeColor='text-green-600' counter={1} />
        <IconButton icon={<FaHeartBroken />} />
        <IconButton icon={<FaCommentAlt />} />
      </div>
    </NavLink>
  );
};

export default CardArticle;
