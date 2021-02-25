import React from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const About = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <div className="bg-white rounded-xl py-4 px-6">
      <p>
        Estudante de engenharia elétrica que é apaixonado por programação e esta fazendo esse blog
        para juntar em um so lugar toas as novas descobertas na area que tanto gosta
      </p>
    </div>
  </Main>
);

export default About;
