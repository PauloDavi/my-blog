import React from 'react';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import { Content } from '../../content/Content';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { getAllPosts, getPostBySlug } from '../../utils/Content';
import { markdownToHtml } from '../../utils/Markdown';

type IPostUrl = {
  slug: string;
};

type IPostProps = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  width: string;
  height: string;
  content: string;
};

const DisplayPost = (props: IPostProps) => (
  <Main
    meta={(
      <Meta
        title={props.title}
        description={props.description}
        post={{
          image: props.image,
          date: props.date,
          modified_date: props.modified_date,
        }}
      />
    )}
  >
    <div className="bg-white rounded-xl pb-4">
      <Image
        src={props.image}
        className="rounded-t-xl"
        layout="responsive"
        width={props.width}
        height={props.height}
      />
      <h1 className="mt-5 text-center font-bold sm:text-2xl md:text-3xl text-gray-900">
        {props.title}
      </h1>
      <div className="text-center text-xs sm:text-sm mb-8">
        {format(new Date(props.date), 'dd MMMM, yyyy', { locale: pt })}
      </div>

      <Content>
        <div
          className="text-xs sm:text-sm md:text-base lg:text-lg"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </Content>
    </div>
  </Main>
);

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IPostProps, IPostUrl> = async ({ params }) => {
  const post = getPostBySlug(params!.slug, [
    'title',
    'description',
    'date',
    'modified_date',
    'image',
    'width',
    'height',
    'content',
    'slug',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      title: post.title,
      description: post.description,
      date: post.date,
      width: post.width,
      height: post.height,
      modified_date: post.modified_date,
      image: post.image,
      content,
    },
  };
};

export default DisplayPost;
