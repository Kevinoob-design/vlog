import Link from 'next/link';
import { capitalizeFirstLetter } from '../shared/util/util';

declare type Props = {
  href: string;
  text?: string;
  children?: JSX.Element | JSX.Element[];
  className?: string;
};

const NavLink = ({ href, children, className, text }: React.PropsWithChildren<Props>) => {
  return (
    <Link href={href}>
      <a className={className || 'text-xl mr-2'}>{children ? children : href === '/' ? 'Home' : capitalizeFirstLetter(text || href)}</a>
    </Link>
  );
};

export default NavLink;
