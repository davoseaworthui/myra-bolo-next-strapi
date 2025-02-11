import { dm_serif_dsplay } from '@/app/utils/fonts';
import { Container } from '@/components/Container';
import Image from 'next/image';
import React from 'react';

interface ContentWithImageProps {
  data: {
    id: number;
    __component: string;
    heading: string;
    text: string;
    imageRight: boolean | null;
    image: {
      id: number;
      url: string;
      alternativeText: string | null;
      name: string;
    };
  };
}

export function ContentWithImage({ data }: Readonly<ContentWithImageProps>) {
  if (!data) return null;
  const { heading, text, image, imageRight } = data;
  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
      {}
      <div
        className={`flex items-center justify-center  ${
          imageRight ? 'w-full lg:order-1 ' : 'w-0'
        }`}
      >
        {image && (
          <div>
            <Image
              src={image.url}
              width={521}
              height={521}
              alt={image.alternativeText || image.name}
              className={'object-cover'}
            />
          </div>
        )}
      </div>

      <div
        className={`flex flex-wrap items-center ${
          imageRight ? 'lg:justify-end w-1/2' : 'w-full '
        }`}
      >
        <div>
          <div className="flex flex-col w-full mt-4">
            <h3
              className={
                dm_serif_dsplay.className +
                ' max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white'
              }
            >
              {heading}
            </h3>

            <p className="max-w-2xl py-4 text-lg leading-normal lg:text-xl xl:text-xl dark:text-gray-300">
              {text}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
