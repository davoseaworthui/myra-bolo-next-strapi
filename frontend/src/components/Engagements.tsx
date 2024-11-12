import { StrapiImage } from './StrapiImage';
import { Container } from '@/components/Container';
import { getStrapiURL } from '@/lib/utils';
import Image from 'next/image';
import qs from 'qs';
import React from 'react';

interface EngagementProps {
  id: number;
  title: string;
  subTitle: string;
  details: string;
  image: {
    name: string;
    alternativeText: string | null;
    url: string;
  };
}

async function engagementLoader() {
  const { fetchData } = await import('@/lib/fetch');
  const path = '/api/engagements';
  const baseUrl = getStrapiURL();

  const query = qs.stringify({
    fields: ['title', 'subTitle', 'details'],
    populate: {
      image: {
        populate: {
          fields: ['name', 'url'],
        },
      },
    },
  });

  const url = new URL(path, baseUrl);
  url.search = query;
  const data = await fetchData(url.href);
  console.log(`hejjj`, data);

  return data;
}

export async function Engagements() {
  const data = await engagementLoader();
  console.log(`hejj`, data);
  if (!data) return null;
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        {data.data.map((engagement: any) => (
          <div key={engagement.id} className="lg:col-span-2 xl:col-auto">
            <div className="flex flex-col text-center justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
              <p className="text-2xl leading-normal ">{engagement.title}</p>
              <div className="text-gray-600 dark:text-gray-400 mb-3">
                {engagement.subTitle}
              </div>
              <div className="w-full flex items-center justify-center">
                <StrapiImage
                  src={engagement.image.url}
                  alt={engagement.image.name}
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

function Avatar(props: any) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image src={props.image.url} width={40} height={40} alt="Avatar" />
      </div>
      <div>
        <div className="text-lg font-medium">{props.heading}</div>
        <div className="text-gray-600 dark:text-gray-400">
          {props.subHeading}
        </div>
      </div>
    </div>
  );
}
