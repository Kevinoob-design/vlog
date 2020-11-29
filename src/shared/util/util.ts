export const capitalizeFirstLetter = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getSocial = (social: string): string => {
  switch (social) {
    case 'twitter':
      return 'FaTwitter';

    case 'instagram':
      return 'FaInstagram';

    case 'facebook':
      return 'FaFacebookSquare';

    case 'github':
      return 'FaGithub';
    default:
      return 'FaGithub';
  }
};
