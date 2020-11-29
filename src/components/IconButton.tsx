declare type Props = {
  counter?: number;
  activeColor?: string;
  icon: JSX.Element;
  onClick?: (input: React.ChangeEvent<HTMLInputElement>) => void;
};

const IconButton = ({ counter, onClick, icon, activeColor = 'text-gray-400' }: React.PropsWithoutRef<Props>) => {
  return (
    <div className='items-center flex cursor-pointer'>
      <div className='hover:bg-gray-700 rounded-xl'>
        <button className={`m-2 focus:outline-none ${activeColor}`}>{icon}</button>
      </div>
      <p className='text-sm text-gray-300 font-bold'>{counter}</p>
    </div>
  );
};

export default IconButton;
