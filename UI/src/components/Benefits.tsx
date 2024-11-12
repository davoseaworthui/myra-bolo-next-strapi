import { StrapiImage } from './StrapiImage';
import { dm_serif_dsplay } from '@/app/utils/fonts';
import { getStrapiURL } from '@/lib/utils';
import { CheckIcon } from '@heroicons/react/20/solid';
import qs from 'qs';
import React from 'react';

export interface ServicesProps {
  id: number;
  documentId: string;
  serviceType: string;
  serviceDescription: string;
  serviceImage: {
    id: number;
    documentId: string;
    name: string;
    url: string;
  };
}

async function servicesLoader() {
  const { fetchData } = await import('@/lib/fetch');
  const path = '/api/services';
  const baseUrl = getStrapiURL();

  const query = qs.stringify({
    fields: ['serviceType', 'serviceDescription'],
    populate: {
      serviceImage: {
        populate: {
          fields: ['name', 'url'],
        },
      },
    },
  });

  const url = new URL(path, baseUrl);

  url.search = query;

  const data = await fetchData(url.href);

  return data;
}

function iconSelect(iconKey: string) {
  switch (iconKey) {
    case 'CHECK':
      return <CheckIcon className="w-7 h-7 text-indigo-50" />;
    default:
      return null;
  }
}

export async function Benefits() {
  const data = await servicesLoader();

  return (
    <div className="flex flex-wrap mb-20 p-8 lg:gap-10 lg:flex-nowrap bg-gray-300">
      <div className={`flex flex-wrap items-center w-full `}>
        <div className="flex flex-col w-full mt-4 items-center text-center">
          <h1
            className={
              dm_serif_dsplay.className +
              ' text-3xl max-w-2xl mt-3 font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight dark:text-white '
            }
          >
            Whether it be:
          </h1>
          <div
            className="w-full mt-5 flex flex-col md:flex-row justify-between px-4 sm:px-8 md:px-16"
            style={{ width: '70%' }}
          >
            {data.data.map(
              (
                item: {
                  serviceImage: { url: string; name: string };
                  serviceType: string;
                },
                index: any,
              ) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 items-center text-center pt-4 lg:flex-row"
                >
                  <div className="w-16 h-16 flex items-center justify-center">
                    <StrapiImage
                      src={item.serviceImage.url}
                      alt={item.serviceImage.name}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-2 w-full text-center">{item.serviceType}</p>
                </div>
              ),
            )}
          </div>

          <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 mt-10 lg:text-xl xl:text-xl ">
            Let us make this a wholistic and fruitful conversation.
          </p>
        </div>
      </div>
    </div>
  );
}

interface BenefitItemProps {
  data: {
    id: number;
    text: string;
    icon: string | null;
    heading: string;
  };
}

function Benefit({ data }: Readonly<BenefitItemProps>) {
  if (!data) return null;
  const { heading, text, icon } = data;
  return (
    <div className="flex items-start mt-8 space-x-3">
      {icon && (
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
          {iconSelect(icon)}
        </div>
      )}
      <div>
        <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {heading}
        </h4>
        {text && (
          <p className="mt-1 text-gray-500 dark:text-gray-400">{text}</p>
        )}
      </div>
    </div>
  );
}
