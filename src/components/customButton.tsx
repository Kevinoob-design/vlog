declare type Props = {
  type?: 'button' | 'submit' | 'reset';
  children: JSX.Element;
  className?: string;
};

export const PrimaryButton = ({ type, children, className }: React.PropsWithChildren<Props>) => {
  return (
    <button
      type={type}
      className={`
      transition
      focus:outline-none
      border
      bg-blue-900
      border-blue-900
      hover:border-white
      rounded-lg
      py-2 px-10
      transform
      active:scale-y-95
      active:scale-x-95
      ${className}`}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ type, children, className }: React.PropsWithChildren<Props>) => {
  return (
    <button
      type={type}
      className={`transition focus:outline-none border-2 border-white hover:bg-blue-900 hover:border-blue-900 rounded-lg py-2 px-5 transform active:scale-y-95 active:scale-x-95 ${className}`}
    >
      {children}
    </button>
  );
};
