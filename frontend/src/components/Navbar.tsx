import ThemeChanger from './DarkSwitch';
import { jost } from '@/app/utils/fonts';
import { DisclosureClient } from '@/components/DisclosureClient';
import { getStrapiURL } from '@/lib/utils';
import Link from 'next/link';
import qs from 'qs';

async function loader() {
  const { fetchData } = await import('@/lib/fetch');
  const path = '/api/global';
  const baseUrl = getStrapiURL();

  const query = qs.stringify({
    populate: {
      topnav: {
        populate: {
          logoLink: {
            populate: {
              image: {
                fields: ['url', 'alternativeText', 'name'],
              },
            },
          },
          link: {
            populate: true,
          },
          cta: {
            populate: true,
          },
        },
      },
    },
  });

  const url = new URL(path, baseUrl);
  url.search = query;
  console.log(url);

  const data = await fetchData(url.href);
  return data;
}

interface NavbarData {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  topnav: {
    id: number;
    logoLink: {
      id: number;
      text: string;
      href: string;
      image: {
        id: number;
        url: string;
        alternativeText: string | null;
        name: string;
      };
    };
    link: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    }[];
    cta: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    };
  };
  meta: Record<string, any>;
}

export async function Navbar() {
  const data = (await loader()) as NavbarData;
  if (!data) return null;
  const navigation = data.topnav.link;
  const cta = data.topnav.cta;

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}

        <DisclosureClient topnav={data.topnav} />

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) =>
              menu.href ? (
                <li className="mr-3 nav__item" key={index}>
                  <Link
                    href={menu.href}
                    className={
                      jost.className +
                      ' inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-sky-500 focus:bg-sky-100 focus:outline-none dark:focus:bg-gray-800 uppercase'
                    }
                  >
                    {menu.text}
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          {cta.href && (
            <Link
              href={cta.href}
              className="px-6 py-2 text-white bg-sky-600 rounded-md md:ml-5"
              target={cta.external ? '_blank' : '_self'}
            >
              {cta.text}
            </Link>
          )}
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
}
