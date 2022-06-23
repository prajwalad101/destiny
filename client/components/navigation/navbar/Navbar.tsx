import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import Button from '../../button/Button';
import Logo from '../../logo/Logo';

function Navbar() {
  return (
    <div className="px-3 py-4 font-rubik text-black shadow-md md:px-16 md:pt-7 md:shadow-none">
      {/* FOR SMALLER(<md) SCREENS */}
      <div className="flex items-center justify-between md:hidden">
        <BiMenu size={35} /> {/* Hamburger Icon */}
        <Logo>Logo</Logo>
        <AiOutlineSearch size={30} />
      </div>

      {/* FOR LARGER(>=md) SCREENS  */}
      <div className="hidden items-center justify-between text-white md:flex">
        {/* MAIN LOGO */}
        <Logo>Logo</Logo>

        {/* BUSINESS LINKS */}
        <div className="flex items-center gap-7 lg:gap-10">
          <div className="underline-offset-4 hover:underline">
            <Link href="/">For Businesses</Link>
          </div>
          <div className="underline-offset-4 hover:underline">
            <Link href="/">Write a review</Link>
          </div>

          {/* LOGIN BUTTONS */}
          <Button variant="secondary">Sign Up</Button>
          <Button variant="primary">Log In</Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;