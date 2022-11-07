import { Navbar } from '@features/register-business/components';
import Image from 'next/image';
import Link from 'next/link';
import SecondaryButton from 'src/components/button/secondary/SecondaryButton';
import AppLayout from '../../components/layout/app/AppLayout';
import { NextPageWithLayout } from '../_app';

const GetStarted: NextPageWithLayout = () => {
  return (
    <div className="mt-10 flex flex-col items-center font-rubik md:flex-row-reverse md:items-end md:justify-between">
      <div className="w-[100%] max-w-[300px] md:max-w-[370px]">
        <Image
          src={'/illustrations/register-business/new-world.svg'}
          width={242}
          height={249}
          layout="responsive"
          alt="new world illustration"
        />
      </div>
      <div className="lg:max-w-[620px]">
        <h1 className="mb-4 font-merriweather text-3xl font-bold lg:text-4xl">
          Hey, There 👋
        </h1>
        <p className="mb-5 text-secondarytext lg:text-lg">Welcome to ___</p>
        <p className="mb-3 lg:text-lg">
          Here, we will walk you through the process registering your very first
          business.
        </p>
        <p className="mb-8 md:mb-12 lg:text-lg">
          Since, most of the steps involved are pretty simple, you should be
          done in a few minutes.
        </p>
        <Link href="/register-business/register">
          <SecondaryButton className="h-[45px] w-full max-w-[400px]">
            <p className="px-6 py-2">Let&apos;s get started</p>
          </SecondaryButton>
        </Link>
      </div>
    </div>
  );
};

GetStarted.getLayout = (page) => (
  <>
    <AppLayout size="sm">
      <Navbar />
      {page}
    </AppLayout>
  </>
);

export default GetStarted;