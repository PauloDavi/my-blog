import React, { ReactNode } from 'react';

type IContentProps = {
  children: ReactNode;
};

const Content = (props: IContentProps) => (
  <div className="content px-4">
    {props.children}

    <style jsx>
      {`
        .content :global(p) {
          @apply my-6;
        }

        .content :global(p code) {
          @apply px-2 py-1 bg-gray-800 text-white rounded;
          background: #2b2b2b;
        }

        .content :global(ul) {
          @apply my-6;
        }

        .content :global(h2) {
          @apply text-2xl font-semibold text-gray-700 my-4;
        }

        .content :global(h3) {
          @apply text-xl font-semibold text-gray-700 my-4;
        }
      `}
    </style>
  </div>
);

export { Content };
