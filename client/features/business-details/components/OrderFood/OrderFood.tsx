import { PrimaryButton, SecondaryButton } from 'components';
import { useState } from 'react';
import { classNames } from 'utils/tailwind';

interface OrderFoodProps {
  className?: string;
}

export default function OrderFood({ className = '' }: OrderFoodProps) {
  const [selectedOption, setSelectedOption] = useState('delivery');
  return (
    <div
      className={classNames(
        className,
        'top-7 w-full rounded-md border-2 border-gray-200 p-5 md:sticky md:max-w-[330px] lg:max-w-[440px]'
      )}
    >
      <h4 className="mb-6 text-xl font-medium">
        Order food by <span className="capitalize">{selectedOption}</span>
      </h4>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-y-5">
        <div className="-ml-3 flex gap-2 lg:gap-4">
          <button
            className={classNames(
              selectedOption === 'delivery'
                ? 'border-primaryred'
                : 'border-white',
              'border-b-[3px] px-3 py-1'
            )}
            onClick={() => setSelectedOption('delivery')}
          >
            Delivery
          </button>
          <button
            className={classNames(
              selectedOption === 'takeout'
                ? 'border-primaryred'
                : 'border-white',
              'border-b-[3px] px-3 py-1'
            )}
            onClick={() => setSelectedOption('takeout')}
          >
            Takeout
          </button>
        </div>
        <p className="cursor-pointer text-sm text-gray-600 underline">
          View Charges
        </p>
      </div>
      {/* Input Fields */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label
          htmlFor="delivery"
          className={classNames(
            selectedOption === 'takeout' ? 'text-gray-500' : '',
            'min-w-[130px]'
          )}
        >
          Delivery Address:
        </label>
        <input
          type="text"
          id="delivery"
          placeholder="eg: Kapan, Baluwakhani"
          className="grow rounded-md border-[1px] border-gray-300 px-5 py-2"
          disabled={selectedOption === 'takeout'}
          size={10}
        />
      </div>
      <div className="mb-7 flex flex-wrap items-center gap-4">
        <label htmlFor="phone-number" className="w-[130px]">
          Phone Number:
        </label>
        <input
          type="text"
          id="phone-number"
          placeholder="(+977)"
          className="grow rounded-md border-[1px] border-gray-300 px-5 py-2 "
          size={10}
        />
      </div>

      <div className="mb-9 flex flex-wrap items-center gap-3 lg:gap-7">
        <SecondaryButton>
          <p className="px-6 py-2">Browse Menu</p>
        </SecondaryButton>
        <p className="text-gray-700">No items selected</p>
      </div>

      <div className="-mx-[21px] -mb-[21px]">
        <PrimaryButton className="w-full py-3">Place Order</PrimaryButton>
      </div>
    </div>
  );
}