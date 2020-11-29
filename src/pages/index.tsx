import SearchBar from '../components/searchBar';
import CardArticle from '../components/cardArticle';

const Home = () => {
  const onChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input.target.value);
  };

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <SearchBar placeHolder='Search for articles' className='w-full' onChange={onChange} />
      <div className='flex flex-wrap justify-between'>
        <CardArticle _id='/'/>
        <CardArticle _id='/'/>
        <CardArticle _id='/'/>
        <CardArticle _id='/'/>
      </div>
    </div>
  );
};

export default Home;
