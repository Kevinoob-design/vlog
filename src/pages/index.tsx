import SearchBar from '../components/searchBar';
import CardArticle from '../components/cardArticle';
import { useGetPosts } from './useRequest';

export type User = {
  followers: number;
  socialMedia: Map<string, string>;
  firstName: string;
  lastName: string;
};

type Data = {
  views: number;
  likes: number;
  dislikes: number;
};

export type Article = {
  _id: string;
  uid: User;
  data: Data;
  title: string;
  post?: string;
  edited?: boolean;
  category: string[];
  imgUrl?: string;
  created: Date;
};

type Articles = {
  articles: Article[];
};

const Home = ({}: React.PropsWithoutRef<Articles>) => {
  const onChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input.target.value);
  };

  const { articles, error } = useGetPosts('/article/get-articles');

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <SearchBar placeHolder='Search for articles' className='w-full' onChange={onChange} />
      {!articles || error ? (
        <h1>Loading...</h1>
      ) : (
        <div className='flex flex-wrap justify-between'>
          {articles.map(({ _id, created, imgUrl, title, uid, category, data }) => (
            <CardArticle key={_id} _id={_id} title={title} created={created} uid={uid} category={category} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
