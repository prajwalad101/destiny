import { BusinessList } from '@features/search-business/layouts';
import { IQueryData } from '@features/search-business/types';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { UseQueryResult } from 'react-query';
import ConditionalRender from 'src/components/conditional-render/ConditionalRender';
import useIsomorphicLayoutEffect from 'src/hooks/useIsomorphicLayoutEffect';

interface SearchBusinessSectionProps {
  filterComponent: JSX.Element;
  sortComponent: JSX.Element;
  businessResult: UseQueryResult<IQueryData, Error>;
}

function SearchBusinessSection({
  filterComponent,
  sortComponent,
  businessResult,
}: SearchBusinessSectionProps) {
  const router = useRouter();
  const { name, city } = router.query;

  const [businessData, setBusinessData] = useState(businessResult.data?.data);

  // set data after a successful query
  useIsomorphicLayoutEffect(() => {
    if (businessResult.isSuccess) {
      setBusinessData(businessResult.data?.data);
    }
  }, [businessResult]);

  // only render layout if businessData exists
  if (businessData === undefined) return null;

  const { isLoading, isError } = businessResult;

  return (
    <div className="mt-5 flex gap-10 md:mt-10">
      {/* SearchFilter */}
      {filterComponent}
      <div className="min-w-0 grow">
        <div className="mb-7 sm:mr-5 md:mb-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {/* Heading */}
            <h2 className="font-merriweather text-2xl font-bold">
              Top <span className="capitalize">{name}</span> in{' '}
              <span className="capitalize">{city}</span>
            </h2>
            {/* Sort Items */}
            <div className="w-72">{sortComponent}</div>
          </div>
        </div>
        {/* List of business cards */}
        <ConditionalRender isLoading={isLoading} isError={isError}>
          <MemoBusinessList businessData={businessData} />
        </ConditionalRender>
      </div>
    </div>
  );
}

const MemoBusinessList = memo(BusinessList);

export default SearchBusinessSection;
