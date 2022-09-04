import Image from 'next/image';

const CompanyLogo = ({ logo, name, size = 'lg', className }) => {
  const radius = size === 'sm' ? 42 : 90;

  return (
    <Image
      src={logo}
      width={radius}
      height={radius}
      layout={size === 'lg' ? 'intrinsic' : 'fixed'}
      alt={`${name} logo`}
      style={{ borderRadius: '4px' }}
      className={className || ''}
    />
  );
};

export default CompanyLogo;
