import SearchBar from '../components/searchBar';
import CardArticle from '../components/cardArticle';
import { config } from 'config/config';

export type User = {
  followers: number;
  socialMedia: string[];
  firstName: string;
  lastName: string;
};

export type Article = {
  _id: string;
  uid?: User;
  title?: string;
  imgUrl?: string;
  created?: Date;
};

type Articles = {
  articles: Article[];
};

const Home = ({ articles }: React.PropsWithoutRef<Articles>) => {
  const onChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input.target.value);
  };

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <SearchBar placeHolder='Search for articles' className='w-full' onChange={onChange} />
      <div className='flex flex-wrap justify-between'>
        {articles.map(({ _id, created, imgUrl, title, uid }) => (
          <CardArticle key={_id} _id={_id} title={title} created={created} uid={uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = () => {
  return new Promise((resolve, reject) => {
    fetch(`${config.SERVER}/article/get-articles`)
      .then((res) => res.json())
      .then((articles) => {
        resolve({
          props: {
            articles,
          },
        });
      })
      .catch(reject);
  });
};
