import PrimaryButton from 'components/button/primary/PrimaryButton';
import SecondaryButton from 'components/button/secondary/SecondaryButton';
import { useSidebar } from 'components/context-provider';
import { AppLayout } from 'components/layout';
import Logo from 'components/logo/Logo';
import usePreventBodyOverflow from 'hooks/usePreventBodyOverflow';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import { classNames } from 'utils/tailwind';

interface INavbar {
  theme: 'light' | 'dark';
  size: 'sm' | 'lg';
}

function Navbar({ theme, size }: INavbar) {
  const { open, setOpen } = useSidebar();

  usePreventBodyOverflow(open);

  return (
    <AppLayout size={size}>
      <div className="py-4 font-rubik md:pt-7">
        {/* For smaller(<md) screens */}
        <div className="flex items-center justify-between md:hidden">
          {/* Hamburger Icon */}
          <BiMenu
            size={35}
            onClick={() => setOpen(!open)}
            className="cursor-pointer hover:text-gray-700"
          />
          <Logo>Logo</Logo>
          <AiOutlineSearch
            size={30}
            className="cursor-pointer hover:text-gray-700"
          />
        </div>
        {/* For larger(>= md) screens */}
        <div
          className={classNames(
            theme === 'dark' ? 'text-white' : 'text-black',
            'hidden items-center justify-between md:flex'
          )}
        >
          <Logo>Logo</Logo>
          <div className="flex items-center gap-7 lg:gap-10">
            <div className="underline-offset-4 hover:underline">
              <Link href="/create-business">
                <a>For Businesses</a>
              </Link>
            </div>
            <div className="underline-offset-4 hover:underline">
              <Link href="/write-review">
                <a>Write a review</a>
              </Link>
            </div>
            {/* Login Buttons */}
            <SecondaryButton theme={theme}>
              <p className="py-2 px-6">Sign Up</p>
            </SecondaryButton>
            <PrimaryButton>
              <p className="py-2 px-6">Log In</p>
            </PrimaryButton>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="left-0 right-0 absolute border border-gray-300 md:hidden w-full" />
    </AppLayout>
  );
}

export default Navbar;
