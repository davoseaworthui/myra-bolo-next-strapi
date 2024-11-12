/* eslint-disable prettier/prettier */
import { StrapiImage } from './StrapiImage';
import { dm_sans, dm_serif_dsplay } from '@/app/utils/fonts';
import { Container } from '@/components/Container';
import { getStrapiURL } from '@/lib/utils';
/*import Image from 'next/image';
import Link from 'next/link'; */
import qs from 'qs';

async function loader() {
  const { fetchData } = await import('@/lib/fetch');
  const path = '/api/landing-page';
  const baseUrl = getStrapiURL();

  const query = qs.stringify({
    populate: {
      heroBlock: {
        on: {
          'blocks.hero-block': {
            populate: {
              heroImage: {
                fields: ['url', 'alternativeText', 'name'],
              },
            },
          },
        },
      },
    },
  });

  const url = new URL(path, baseUrl);

  url.search = query;

  const data = await fetchData(url.href);
  return data;
}

interface HeroProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  heroBlock: [
    {
      __component: string;
      id: number;
      tagline: string;
      introLine: string;
      heroName: string;
      subTagline: string;
      heroImage: {
        id: number;
        url: string;
        alternativeText: string | null;
        name: string;
      };
    },
  ];
  meta: {};
}

export async function Hero() {
  const data = (await loader()) as HeroProps;

  if (!data) return null;
  //  const { heading, text, cta, image } = data;
  return (
    <Container className="flex flex-wrap ">
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div>
          <StrapiImage
            src={data.heroBlock[0].heroImage.url}
            alt={data.heroBlock[0].heroImage.alternativeText || 'Hero Image'}
            width={500}
            height={500}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex items-center w-full lg:w-1/2">
        <div className="max-w-2xl mb-8 pl-0 text-center lg:text-left pl-4">
          <h1
            className={
              dm_serif_dsplay.className +
              ' py-5 text-4xl leading-normal text-[#f59e0b] lg:text-4xl xl:text-5xl '
            }
          >
            {data.heroBlock[0].tagline}
          </h1>
          <p className="py-2 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
            {data.heroBlock[0].introLine}
          </p>
          <h1
            className={
              dm_sans.className +
              ' font-bold leading-snug tracking-tight text-sky-600 text-4xl lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white'
            }
          >
            {data.heroBlock[0].heroName}
          </h1>
          <p
            className={
              dm_serif_dsplay.className +
              ' py-2 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300'
            }
          >
            {data.heroBlock[0].subTagline}
          </p>
        </div>
      </div>
    </Container>
  );
}
