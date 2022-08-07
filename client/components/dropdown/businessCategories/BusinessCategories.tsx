import Link from 'next/link';
import { RiArrowDownSLine } from 'react-icons/ri';
import { IBusinessSubCategory } from '../../../types/interfaces';

interface BusinessCategoryDropdownProps {
  name: string;
  subCategories: IBusinessSubCategory[];
}

function BusinessCategories({
  name,
  subCategories,
}: BusinessCategoryDropdownProps) {
  // to display items in two columns
  const evenItems = subCategories.filter(
    (_subCategory, i) => i % 2 === 0 || i === 0
  );
  const oddItems = subCategories.filter((_subCategory, i) => i % 2 !== 0);

  //! FIX: Change the static city variable
  const link = (item: IBusinessSubCategory, index: number) => (
    <Link
      key={index}
      href={{
        pathname: '/search/business',
        query: { name: item.name, city: 'kathmandu' },
      }}
    >
      <a>
        <div className="flex items-center gap-3 hover:cursor-pointer hover:text-gray-600">
          <p className="whitespace-nowrap">{item.name}</p>
          {item.icon}
        </div>
      </a>
    </Link>
  );

  return (
    <div className="relative capitalize">
      {/* Dropdown heading */}
      <div className="peer flex items-center gap-1 text-white hover:cursor-pointer">
        <p>{name}</p>
        <RiArrowDownSLine size={25} />
      </div>

      <div className="peer h-2" />

      {/* Dropdown menu */}
      <div className="invisible absolute flex gap-x-10  rounded-sm bg-white p-4 opacity-0 transition-opacity delay-100 hover:visible hover:opacity-100 peer-hover:visible peer-hover:opacity-100">
        <div className="flex flex-col gap-y-3">
          {evenItems.map((item, index) => link(item, index))}
        </div>

        <div className="flex flex-col gap-y-3">
          {oddItems.map((item, index) => link(item, index))}
        </div>
      </div>
    </div>
  );
}

export default BusinessCategories;