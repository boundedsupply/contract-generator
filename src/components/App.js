import React from 'react';
import styled from 'styled-components';
import bgImg from '../assets/bg.png';
import InitialInputPane from './InitialInputPane';

const App = () => {
  return (
    <Container>
      <Wrapper>
        <InitialInputPane/>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  background: #FFFFFF;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Wrapper = styled.div`
  background-image: url(${bgImg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width : 100%;
  height: 100%;
  display: flex; /*for hi*/
`;

export default App;
