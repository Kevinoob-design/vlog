declare type Props = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

const HalfContainer = ({ children, className }: React.PropsWithChildren<Props>) => {
  return <div className={`w-1/2 ${className}`}>{children}</div>;
};

export default HalfContainer;
