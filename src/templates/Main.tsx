import React, { ReactNode } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillLinkedin, AiOutlineInstagram, AiFillGithub } from 'react-icons/ai';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import ReactTooltip from 'react-tooltip';

import { Navbar } from '../navigation/Navbar';
import { Config } from '../utils/Config';
import { PostItems } from '../utils/Content';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  posts?: PostItems[];
};

const Main = (props: IMainProps) => {
  const router = useRouter();

  return (
    <div className="antialiased h-screen w-full text-gray-700">
      {props.meta}

      <div className="text-white shadow-lg border-b border-gray-300">
        <div className="bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 flex flex-row items-center py-4 px-4 sm:px-10">
          <div
            className="bg-white invisible md:visible flex items-center justify-center"
            style={{
              width: 82,
              height: 82,
              borderRadius: 5,
            }}
          >
            <Image src="/QG-icon.png" quality={100} priority width={80} height={80} alt="logo" />
          </div>
          <HiOutlineArrowNarrowLeft
            data-tip="Voltar"
            onClick={() => router.back()}
            className="-ml-10 sm:-ml-16 md:ml-5 cursor-pointer"
            size={40}
          />
          <ReactTooltip place="bottom" />
          <div className="ml-3">
            <div className="font-semibold text-3xl mx-auto sm:mx-0">{Config.title}</div>
            <div className="text-xl">{Config.description}</div>
          </div>
        </div>
        <div>
          <Navbar>
            <li className="text-center w-1/3 py-2 transition duration-500 ease-in-out bg-blue-400 hover:bg-blue-600">
              <Link href="/">
                <a className="text-white text-base sm:text-lg md:text-xl">Home</a>
              </Link>
            </li>
            <li className="text-center w-1/3 py-2 transition duration-500 ease-in-out bg-blue-400 hover:bg-blue-600">
              <Link href="/about/">
                <a className="text-white text-base sm:text-lg md:text-xl">Sobre mim</a>
              </Link>
            </li>
            <li className="text-center w-1/3 py-2 transition duration-500 ease-in-out bg-blue-400 hover:bg-blue-600">
              <a
                className="text-white text-base sm:text-lg md:text-xl"
                href="https://github.com/PauloDavi"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </Navbar>
        </div>
      </div>

      <div className="flex justify-center bg-gray-200 px-4 sm:px-8">
        <div
          className="py-5 mx-auto flex flex-col sm:flex-row-reverse"
          style={{ minHeight: 'calc(100vh - 208px)' }}
        >
          <div className="flex flex-col mb-4 sm:mb-0 items-center sm:justify-start ml-0 sm:ml-8">
            <div className="px-4 py-2 bg-white max-w-xs w-full rounded-lg">
              <h2 className="text-lg font-bold">Sobre Mim</h2>
              <p>
                Estudante de engenharia elétrica que é apaixonado por programação e agora tem um
                blog.
              </p>
              <div className="flex flex-row justify-between px-4 items-center mt-4">
                <a
                  href="https://www.linkedin.com/in/paulo-davi-alencar-de-freitas-ara%C3%BAjo-56a73b1b1/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin className="cursor-pointer text-gray-700" size={30} />
                </a>
                <a href="https://www.instagram.com/paul_davi/" target="_blank" rel="noreferrer">
                  <AiOutlineInstagram className="cursor-pointer text-gray-700" size={30} />
                </a>
                <a href="https://github.com/PauloDavi" target="_blank" rel="noreferrer">
                  <AiFillGithub className="cursor-pointer text-gray-700" size={30} />
                </a>
              </div>
            </div>
            {props.posts && (
              <div className="px-4 py-4 mt-4 bg-white max-w-xs w-full rounded-lg">
                <h2 className="text-lg font-bold mb-4">Últimos Posts</h2>
                <ul>
                  {props.posts?.slice(0, 5).map((post, index) => (
                    <li key={post.slug} className={clsx(index !== 0 && 'mt-2')}>
                      <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
                        <a>{post.title}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="max-w-screen-md">
            <div className="text-xl">{props.children}</div>
          </div>
        </div>
      </div>

      <div className="border-t shadow-md mt-auto text-white border-gray-300 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 text-center py-4   text-sm">
        © Copyright {new Date().getFullYear()} {Config.title}. Mantido com{' '}
        <span role="img" aria-label="Love">
          ♥
        </span>{' '}
        por{' '}
        <a href="https://github.com/PauloDavi" target="_blank" rel="noreferrer">
          Paulo Davi
        </a>
      </div>
    </div>
  );
};

export { Main };
