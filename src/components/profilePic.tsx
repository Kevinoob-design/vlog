type Props = {
  className?: string;
};

const ProfilePic = ({ className = 'h-8 w-8' }: React.PropsWithoutRef<Props>) => {
  return <div className={`rounded-full bg-gray-400 ${className}`}></div>;
};

export default ProfilePic;
