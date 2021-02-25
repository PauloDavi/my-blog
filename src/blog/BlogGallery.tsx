import React from 'react';

import clsx from 'clsx';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Image from 'next/image';
import router from 'next/router';
import PerfectScrollbar from 'react-perfect-scrollbar';

import 'react-perfect-scrollbar/dist/css/styles.css';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { PostItems } from '../utils/Content';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
      {props.posts.map((elt) => (
        <li key={elt.slug} className="w-full shadow-lg rounded-xl bg-gray-50">
          <div
            className="w-full h-full rounded-xl"
            onClick={() => router.push('/posts/[slug]', `/posts/${elt.slug}`)}
            onKeyPress={(e) => e.key === 'Enter' && router.push('/posts/[slug]', `/posts/${elt.slug}`)}
            role="button"
            tabIndex={0}
          >
            <Image
              src={elt.image}
              className="rounded-t-xl"
              layout="responsive"
              width={elt.width}
              height={elt.height}
            />

            <div className="flex flex-col p-4">
              <div className="text-xl font-bold">{elt.title}</div>
              <div className="text-xs text-gray-700">
                {format(new Date(elt.date), "dd 'de' MMMM 'de' yyyy", { locale: pt })}
              </div>
              <div className="text-base mt-5">{elt.description}</div>
              <PerfectScrollbar className="h-20 mt-4">
                <div className="h-full text-base py-2">
                  {JSON.parse(elt.tags).map((tag: string, index: number) => (
                    <span
                      key={tag}
                      className={clsx(
                        'bg-blue-500 rounded-full text-white px-2 py-1',
                        index !== 0 && 'ml-2',
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </PerfectScrollbar>
            </div>
          </div>
        </li>
      ))}
    </ul>

    <Pagination previous={props.pagination.previous} next={props.pagination.next} />
  </>
);

export { BlogGallery };
