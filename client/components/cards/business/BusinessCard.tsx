import { IBusiness, IReview } from '@destiny/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaQuoteLeft } from 'react-icons/fa';
import { checkIsOpen } from '../../../utils/api';
import RatingIcons from '../../icons/ratings/RatingIcons';
import ImageScroll from '../../image/scroll/ImageScroll';

export interface IBusinessCard {
  business: IBusiness;
}

function BusinessCard({ business }: IBusinessCard) {
  return (
    <div className="font-rubik transition-colors hover:bg-gray-50 sm:flex ">
      <div className="shrink-0 sm:w-[224px]">
        <ImageScroll
          noItems={business.images.length}
          initialItems={1}
          slider={true}
        >
          {business.images.map((image, index) => (
            <div key={index} className="relative h-[200px] w-full shrink-0">
              <Link href={`/search/business/${business._id}`}>
                <a>
                  <Image
                    src={image}
                    alt="business-image"
                    layout="fill"
                    objectFit="cover"
                  />
                </a>
              </Link>
            </div>
          ))}
        </ImageScroll>
      </div>
      {/* Body */}
      <div className="min-w-0 grow border-2 border-t-0 sm:border-t-2 sm:border-l-0">
        <Link href={`/search/business/${business._id}`}>
          <a>
            <div className="p-2 sm:p-3">
              <h3 className="mb-2 text-lg font-medium">{business.name}</h3>
              <div className="mb-2 flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <RatingIcons avgRating={business.avgRating} />
                  <p className="text-sm text-secondarytext">
                    ({business.rating_count})
                  </p>
                </div>
                <p className="text-[15px] font-medium text-secondarytext">
                  {checkIsOpen(business.businessHours) ? 'Open now' : 'Closed'}
                </p>
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

const Reviews = ({ reviews }: { reviews: IReview[] }) => {
  if (reviews.length === 0) {
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
