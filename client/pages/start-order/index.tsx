import { BrowseMenu } from '@features/business-details/components';
import { MenuItem } from '@features/business-details/data/menuData';
import { Divider, PrimaryButton, SecondaryButton } from 'components';
import { NavigationProvider, QueryProvider } from 'components/context-provider';
import { AppLayout } from 'components/layout';
import { Navbar, Sidebar } from 'components/navigation';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';

export interface ISelectedMenuItem {
  item: MenuItem;
  quantity: number;
}

const StartOrderPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<ISelectedMenuItem[]>([]);

  return (
    <>
      <h1 className="mb-14 mt-16 font-merriweather text-3xl font-bold text-gray-800">
        Start your Order
      </h1>
      <BrowseMenu
        isOpen={isMenuOpen}
        closeModal={() => setIsMenuOpen(false)}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <OrderDetails
        orderItems={selectedItems}
        setOrderItems={setSelectedItems}
        onClick={() => setIsMenuOpen(true)}
      />
      <PersonalDetailsForm />
      <PaymentInfoForm />
      <div className="mb-20 flex gap-7">
        <SecondaryButton className="px-6 py-2" onClick={() => router.back()}>
          Go back
        </SecondaryButton>
        <PrimaryButton className="px-6 py-2">Place Order</PrimaryButton>
      </div>
    </>
  );
};

function OrderDetails({
  orderItems,
  setOrderItems,
  onClick,
}: {
  orderItems: ISelectedMenuItem[];
  setOrderItems: Dispatch<SetStateAction<ISelectedMenuItem[]>>;
  onClick: () => void;
}) {
  const isOrderEmpty = orderItems.length === 0;

  const handleDeleteItem = (orderItem: ISelectedMenuItem) => {
    const newItems = orderItems.filter(
      (item) => item.item.id !== orderItem.item.id
    );

    setOrderItems(newItems);
  };

  const handleIncreaseQuantity = (orderItem: ISelectedMenuItem) => {
    setOrderItems((prevItems) => {
      // find the item and update it
      const updatedItems = prevItems.map((item) => {
        if (item.item.id === orderItem.item.id) {
          return { item: item.item, quantity: item.quantity + 1 };
        }
        return item;
      });

      return updatedItems;
    });
  };

  const handleDecreaseQuantity = (orderItem: ISelectedMenuItem) => {
    setOrderItems((prevItems) => {
      // find the item and update it
      const updatedItems = prevItems.map((item) => {
        if (item.item.id === orderItem.item.id) {
          if (item.quantity <= 1) return item;
          return { item: item.item, quantity: item.quantity - 1 };
        }
        return item;
      });

      return updatedItems;
    });
  };

  const getQuantityButton = (orderItem: ISelectedMenuItem) => {
    return (
      <div className="flex items-center justify-center gap-3">
        <button
          className="group relative h-[23px] w-[23px]"
          onClick={() => handleDecreaseQuantity(orderItem)}
        >
          <AiFillMinusCircle
            size={23}
            className="absolute inset-0 text-primaryred opacity-0 transition-opacity group-hover:opacity-100"
          />
          <AiOutlineMinusCircle
            size={23}
            className="absolute inset-0 transition-opacity group-hover:opacity-0"
          />
        </button>
        <p>{orderItem.quantity}</p>
        <button
          className="group relative h-[23px] w-[23px]"
          onClick={() => handleIncreaseQuantity(orderItem)}
        >
          <AiFillPlusCircle
            size={23}
            className="absolute
             inset-0 text-primaryred opacity-0 transition-opacity group-hover:opacity-100"
          />
          <AiOutlinePlusCircle
            size={23}
            className="absolute inset-0 transition-opacity group-hover:opacity-0"
          />
        </button>
      </div>
    );
  };

  return (
    <div className="mb-9">
      <h5 className="mb-2 text-xl font-medium">Order Details</h5>
      <p className="mb-9 text-gray-600">
        {isOrderEmpty
          ? 'Your order is empty. Please select some items'
          : 'Select your items and edit them as necessary'}
      </p>
      {!isOrderEmpty && (
        <OrderedItemsTable
          orderItems={orderItems}
          handleDeleteItem={handleDeleteItem}
          getQuantityButton={getQuantityButton}
        />
      )}

      <SecondaryButton className="mb-6 px-4 py-2" onClick={onClick}>
        Browse Menu
      </SecondaryButton>
      <Divider />
    </div>
  );
}

function OrderedItemsTable({
  getQuantityButton,
  orderItems,
  handleDeleteItem,
}: {
  getQuantityButton: (_item: ISelectedMenuItem) => ReactNode;
  orderItems: ISelectedMenuItem[];
  handleDeleteItem: (_item: ISelectedMenuItem) => void;
}) {
  return (
    <div className="mb-6 max-w-3xl rounded-md border-2 border-gray-300">
      <div className="flex gap-5 py-3 px-5">
        <p className="flex-[4_1_0] font-medium">Item</p>
        <p className="flex-[2_1_0] text-center font-medium">Qty</p>
        <p className="flex-[2_1_0] text-center font-medium">Price</p>
        <p className="flex-1 font-medium"></p>
      </div>
      <Divider width={2} className="mb-2" />
      {orderItems.map((orderItem) => (
        <div
          key={orderItem.item.id}
          className="flex items-center gap-5 px-5 py-4"
        >
          <p className="flex-[4_1_0] capitalize">{orderItem.item.name}</p>
          <div className="flex-[2_1_0]">{getQuantityButton(orderItem)}</div>
          <p className="flex-[2_1_0] text-center">
            Rs. {orderItem.item.price * orderItem.quantity}
          </p>
          <div className="flex-1">
            <FiTrash2
              size={22}
              className="ml-auto cursor-pointer text-gray-600 hover:text-primaryred"
              onClick={() => handleDeleteItem(orderItem)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PersonalDetailsForm() {
  return (
    <div className="mb-9">
      <h5 className="mb-2 text-xl font-medium">Personal Details</h5>
      <p className="mb-9 text-gray-600">
        Fill all the fields with correct information
      </p>
      <div className="mb-5 flex items-center gap-5">
        <label htmlFor="name" className="w-[150px]">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="rounded-md border border-gray-300 px-5 py-2"
        />
      </div>
      <div className="mb-5 flex items-center gap-5">
        <label htmlFor="phone-number" className="w-[150px]">
          Phone Number:
        </label>
        <input
          type="text"
          placeholder="(+977)"
          id="phone-number"
          className="rounded-md border border-gray-300 px-5 py-2"
        />
      </div>
      <div className="mb-6 flex items-center gap-5">
        <label htmlFor="address" className="w-[150px]">
          Delivery Address:
        </label>
        <input
          type="text"
          placeholder="eg: Kapan, Baluwakhani"
          id="address"
          className="rounded-md border border-gray-300 px-5 py-2"
        />
      </div>
      <Divider />
    </div>
  );
}

function PaymentInfoForm() {
  return (
    <div className="mb-9">
      <h5 className="mb-2 text-xl font-medium">Payment Details</h5>
      <p className="mb-9 text-gray-600">Please select a payment option</p>
      <div className="mb-5 flex items-center gap-5">
        <input type="radio" id="cash" name="payment-option" />
        <label htmlFor="cash">Cash on delivery</label>
      </div>
      <div className="mb-6 flex items-center gap-5 text-gray-500 ">
        <input disabled type="radio" id="e-sewa" name="payment-option" />
        <label htmlFor="e-sewa" className="">
          E-sewa
        </label>
      </div>
      <Divider />
    </div>
  );
}

export default StartOrderPage;

StartOrderPage.getLayout = (page, pageProps) => (
  <QueryProvider pageProps={pageProps}>
    <AppLayout size="lg">
      <NavigationProvider>
        <Navbar theme="light" />
        <Sidebar />
      </NavigationProvider>
      {page}
    </AppLayout>
  </QueryProvider>
);
