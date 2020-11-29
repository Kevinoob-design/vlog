declare type Props = {
  counter?: number;
  activeColor?: string;
  icon: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const IconButton = ({ counter, onClick, icon, activeColor = 'text-gray-400' }: React.PropsWithoutRef<Props>) => {
  return (
    <div className='items-center flex cursor-pointer'>
      <button onClick={onClick} className='hover:bg-gray-700 rounded-xl focus:outline-none transition'>
        <div className={`m-2 ${activeColor}`}>
          {icon}
        </div>
      </button>
      <p className='text-sm text-gray-300 font-bold'>{counter}</p>
    </div>
  );
};

export default IconButton;
