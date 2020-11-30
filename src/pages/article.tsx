import { FaHeartBroken, FaHeart, FaCommentAlt, FaBookmark } from 'react-icons/Fa';
import { config } from 'config/config';
import { Article } from './index';
import CardArticle from '../components/cardArticle';
import UserCard from '../components/userCard';
import IconButton from '../components/IconButton';
import moment from 'moment';

type Props = {
  article: Article;
};

const ArticlePage = ({ article }: React.PropsWithoutRef<Props>) => {
  const { _id, uid, data, category, created, edited, imgUrl, title, post } = article;

  return (
    <div className='mx-auto space-y-2 max-w-6xl flex flex-nowrap space-x-10'>
      <div>
        <p className='font-serif text-sm text-gray-400 tracking-wider'>
          Published on <span className='font-bold'>{moment(created).format('LL')}</span>
        </p>
        <UserCard uid={uid} />

        <div className='space-y-10'>
          <p className='text-6xl'>{title}</p>

          <div className='min-h-screen text-xl tracking-wider leading-normal'>
            <p>{post}</p>
          </div>
        </div>

        <div>
          <p className='text-center text-lg'>
            Read more from&nbsp;
            <span className='font-bold'>
              {uid.firstName} {uid.lastName}
            </span>
          </p>

          <div className='flex flex-wrap justify-between'>
            <CardArticle key={_id} _id={_id} title={title} created={created} uid={uid} category={category} data={data} />
            <CardArticle key={_id} _id={_id} title={title} created={created} uid={uid} category={category} data={data} />
            <CardArticle key={_id} _id={_id} title={title} created={created} uid={uid} category={category} data={data} />
          </div>

          <div className='flex justify-between items-center w-full border-2 border-opacity-5 border-white p-5 rounded-lg my-40'>
            <p className='text-2xl'>Interested in more content from this publisher?</p>
            <button className='transition focus:outline-none border-2 border-white hover:bg-blue-900 hover:border-blue-900 rounded-lg p-1'>Subscribe</button>
          </div>
        </div>

        {/* <div>
        <div className='flex justify-between items-center w-full'>
          <p className='text-2xl'>Leave a comment</p>
          <button className='focus:outline-none border-2 border-white hover:bg-blue-900 hover:border-blue-900 rounded-lg p-1'>Comment</button>
        </div>
        <div className='w-full border-2 border-opacity-5 border-white p-5 rounded-lg'></div>
      </div> */}
      </div>

      <div>
        <div className='sticky top-10 h-56 border-l-2 border-r-2 border-opacity-5 border-white p-5 flex flex-col justify-between mt-40'>
          <IconButton icon={<FaHeart className='w-7 h-7' />} counter={data.likes} />
          <IconButton icon={<FaHeartBroken className='w-7 h-7' />} counter={data.dislikes} />
          <IconButton icon={<FaCommentAlt className='w-7 h-7' />} counter={0} />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

export const getServerSideProps = (context) => {
  return new Promise((resolve, reject) => {
    const _id = context.query.id;
    const search = context.query.s;

    fetch(`${config.SERVER}/article/get-full-article?id=${_id}`)
      .then((res) => res.json())
      .then((article) => {
        resolve({
          props: {
            article,
          },
        });
      })
      .catch(reject);
  });
};
