import { IBusiness, IReview } from '@destiny/common/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaQuoteLeft } from 'react-icons/fa';
import RatingIcons from 'src/components/icons/ratings/RatingIcons';
import Slider from 'src/components/slider/Slider';
import { getPublicFilePath } from 'src/utils/text';

export interface BusinessCardProps {
  business: IBusiness;
}

function BusinessCard({ business }: BusinessCardProps) {
  // get image path relative to the public folder
  const images = business.images.map((image) => getPublicFilePath(image));

  return (
    <div className="font-rubik transition-colors hover:bg-gray-50 sm:flex">
      <Slider numItems={images.length} className="shrink-0 sm:w-[224px]">
        {images.map((image, index) => (
          <div key={index} className="relative h-48 w-full">
            <Image src={image} alt="image" layout="fill" objectFit="cover" />
          </div>
        ))}
      </Slider>
      {/* Body */}
      <div className="min-w-0 grow border-2 border-t-0 sm:border-t-2 sm:border-l-0">
        <Link href={`/search/business/${business._id}`}>
          <a>
            <div className="p-2 sm:p-3">
              <h3 className="mb-2 text-lg font-medium">{business.name}</h3>
              <div className="mb-2 flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <RatingIcons rating={business.avgRating} />
                  <p className="text-sm text-secondarytext">
                    ({business.rating_count})
                  </p>
                </div>
                {/* <p className="text-[15px] font-medium text-secondarytext">
                  {checkInterval(
                    business.businessHours.open,
                    business.businessHours.close
                  )
                    ? 'Open now'
                    : 'Closed'}
                </p> */}
              </div>
              <p className="mb-4 text-sm text-secondarytext">
                {business.location.address}
              </p>
              {/* Horizontal Line */}
              <div className="mb-3 hidden border-[1px] sm:block"></div>
              {/* Reviews */}
              <Reviews reviews={business.reviews} />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

const Reviews = ({ reviews }: { reviews: IReview[] | undefined }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <>
        <p className="mb-2 text-secondarytext">No reviews found</p>
        <p className="text-[10px] font-medium text-primaryred">
          /╲/\╭[ ☉ ﹏ ☉ ]╮/\╱\
        </p>
      </>
    );
  }

  return (
    <>
      {reviews.map((review) => (
        <div
          key={review._id.toString()}
          className="mb-2 flex items-center gap-3"
        >
          <div>
            <FaQuoteLeft size={10} />
          </div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            &quot;{review.review}&quot;
          </p>
        </div>
      ))}
    </>
  );
};

export default BusinessCard;
