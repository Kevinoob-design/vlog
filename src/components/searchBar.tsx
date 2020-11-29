import { FaSearch, FaTimes } from 'react-icons/Fa';

declare type Props = {
  placeHolder: string;
  className?: string;
  onChange?: (input: React.ChangeEvent<HTMLInputElement>) => void;
};

const onClear = (formEvent: React.FormEvent<HTMLFormElement>) => {
  formEvent.preventDefault();
  formEvent.currentTarget.reset();
};

const SearchBar = ({ placeHolder, className, onChange }: React.PropsWithoutRef<Props>) => {
  return (
    <form onSubmit={onClear} className={`p-2 rounded-lg flex bg-gray-800 ${className}`}>
      <div className='mr-2 my-auto'>
        <FaSearch />
      </div>

      <input className='w-full bg-transparent outline-none' type='text' placeholder={placeHolder} onChange={onChange} onReset={onChange} />

      <button type='submit' className='ml-2 my-auto focus:outline-none'>
        <FaTimes />
      </button>
    </form>
  );
};

export default SearchBar;
