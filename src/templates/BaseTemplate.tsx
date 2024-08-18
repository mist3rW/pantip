import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// import { useTranslations } from 'next-intl';
import SearchForm from '@/components/nav/SearchBar';
import pantipLogo from '@/public/pantip-logo.png';

const BaseTemplate = (props: {
  leftNav?: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  // const t = useTranslations('BaseTemplate');

  return (
    <div className="w-full text-gray-700 antialiased ">
      <div className="mx-auto">
        <header className="border-b border-gray-300 bg-[#2D2A48] px-6 py-3">
          <div className="hidden">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.leftNav}
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-8">
              <Menu color="#fff" className="hidden md:flex" />
              <Link href="/">
                <Image
                  src={pantipLogo}
                  width={40}
                  height={22.5}
                  alt="Pantip Logo"
                  className=""
                />
              </Link>
            </div>
            <div className="md:w-[480px]">
              <SearchForm />
            </div>
            <div className="hidden items-center gap-2 text-white md:flex">
              <div>ตั้งกระทู้</div>
              <div>คอมมูนิตี้</div>
              <div>เข้าสู่ระบบ</div>
            </div>
          </div>
        </header>

        <main className="px-2">{props.children}</main>
      </div>
    </div>
  );
};

export { BaseTemplate };
