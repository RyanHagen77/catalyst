import { FragmentOf } from '~/client/graphql';
import { Image } from '~/components/image';

import { StoreLogoFragment } from './fragment';

interface Props {
  data: FragmentOf<typeof StoreLogoFragment>;
}

export const StoreLogo = ({ data }: Props) => {
  const { logoV2: logo, storeName } = data;

  if (logo.__typename === 'StoreTextLogo') {
    return <span className="truncate text-2xl font-black">{logo.text}</span>;
  }

  // Fallback for image URL or altText
  const logoAlt = logo.image.altText || storeName || 'Store Logo';
  const logoUrl = logo.image.url || '/default-logo.png';  // Use a default image if URL is missing

  // Increased size by 50%
  const newHeight = 48;  // 50% larger than 32 (original)
  const newWidth = 232;  // 50% larger than 155 (original)

  return (
    <Image
      alt={logoAlt}
      className="object-contain"  // No max-height restrictions now
      height={newHeight}  // Updated height
      priority
      src={logoUrl}
      width={newWidth}  // Updated width
    />
  );
};
