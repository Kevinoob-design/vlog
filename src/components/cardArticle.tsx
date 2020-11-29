import { FaHeartBroken, FaHeart, FaCommentAlt, FaBookmark } from 'react-icons/Fa';
import { Article } from '../pages/index';
import Image from 'next/image';
import ProfilePic from './profilePic';
import IconButton from './IconButton';
import NavLink from './navLink';

const CardArticle = ({ _id, uid, title, imgUrl = '/350x200.png', created }: React.PropsWithoutRef<Article>) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <NavLink href={_id} className='mt-10 bg-gray-800 w-80 h-96 flex flex-col space-y-2 rounded-xl p-2'>
      <div className='flex justify-between'>
        <div className='flex space-x-2 items-center'>
          <ProfilePic />
          <p>{uid.firstName}</p>
        </div>
        <div className='flex space-x-2'>
          <IconButton onClick={onClick} icon={<FaBookmark />} />
        </div>
      </div>
      <div className='h-20'>
        <p>{title}</p>
      </div>
      <div className='h-5'>
        <p className='text-sm text-gray-500'>{created}</p>
      </div>
      <Image className='bg-gray-500 rounded-lg' width='350' height='200' src={imgUrl}></Image>
      <div className='flex space-x-3'>
        <IconButton onClick={onClick} icon={<FaHeart />} activeColor='text-green-600' counter={1} />
        <IconButton onClick={onClick} icon={<FaHeartBroken />} />
        <IconButton onClick={onClick} icon={<FaCommentAlt />} />
      </div>
    </NavLink>
  );
};

export default CardArticle;
