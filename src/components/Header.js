import React from 'react';
import styled from 'styled-components';
import { media } from '../config/breakpoints';
import d3Logo from '../assets/d3-logo.svg';
import reactLogo from '../assets/react-logo.svg';

const Header = () => {
  const HeaderContainer = styled.header`
    background: #eceff1;
    border-bottom: 3px solid #b0bec5;
    display: flex;
    flex-direction: row;
    height: auto;
    padding: 1.5em 1em;

    ${media.smMax} {
      padding: 1em;
    }
  `;
  const Title = styled.h1`
    font-weight: 400;
    margin: 0;

    ${media.smMax} {
      font-size: 1.5rem;
    }
  `;

  const Logo = styled.div`
    /* eslint-disable react/prop-types */
    background-image: url(${({ logo }) => logo});
    background-repeat: no-repeat;
    background-size: contain;
    margin: 0 0.75em;
    height: 45px;
    width: 45px;

    ${media.smMax} {
      height: 32px;
      margin: 0 0.4em;
      width: 32px;
    }
  `;

  return (
    <HeaderContainer>
      <Title>
        Declarative Charts in
      </Title>
      <Logo logo={reactLogo} />
      <Title>and</Title>
      <Logo logo={d3Logo} />
    </HeaderContainer>
  );
};

export default Header;
