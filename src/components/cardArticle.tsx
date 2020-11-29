import { FaHeartBroken, FaHeart, FaCommentAlt, FaBookmark } from 'react-icons/Fa';
import { Article } from '../pages/index';
import Image from 'next/image';
import ProfilePic from './profilePic';
import IconButton from './IconButton';
import NavLink from './navLink';
import moment from 'moment';
import { capitalizeFirstLetter } from '../shared/util/util';

const CardArticle = ({ _id, uid, title, imgUrl = '/350x200.png', created, category, data }: React.PropsWithoutRef<Article>) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <NavLink href={`article?id=${_id}`} className='mt-10 bg-gray-800 w-80 h-96 flex flex-col space-y-2 rounded-xl p-2 hover:border-white hover:border-2'>
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
        <p className='text-lg '>{title}</p>
      </div>
      <div className='h-5 pl-1'>
        <p className='text-xs font-bold text-gray-400'>{`${capitalizeFirstLetter(moment(created).startOf('hour').fromNow())} • ${data.views} Views`}</p>
      </div>
      <Image className='bg-gray-500 rounded-lg' width='350' height='200' src={imgUrl}></Image>
      <div className='flex space-x-3 items-center'>
        <IconButton onClick={onClick} icon={<FaHeart />} activeColor='text-green-600' counter={data.likes} />
        <IconButton onClick={onClick} icon={<FaHeartBroken />} counter={data.dislikes} />
        <IconButton onClick={onClick} icon={<FaCommentAlt />} counter={0} />
        <p className='text-xs font-bold text-gray-400'>{category.toString()}</p>
      </div>
    </NavLink>
  );
};

export default CardArticle;
