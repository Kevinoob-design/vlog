import Link from 'next/link';
import { capitalizeFirstLetter } from '../shared/util/util';

declare type Props = {
  href: string;
  children?: JSX.Element | JSX.Element[];
  className?: string;
};

const NavLink = ({ href, children, className }: React.PropsWithChildren<Props>) => {
  return (
    <Link href={href}>
      <a className={className || 'text-xl mr-2'}>{children ? children : href === '/' ? 'Home' : capitalizeFirstLetter(href)}</a>
    </Link>
  );
};

export default NavLink;
