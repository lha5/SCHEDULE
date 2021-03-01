import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 calc(23%);
  height: calc(100vh - 71px - 48px);

  @media only screen and (max-width: 1400px) {
    padding: 0 calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 0 calc(15%);
  }
`;

function LandingPage() {
  return (
    <Container>
      <h1>랜딩 페이지</h1>
    </Container>
  );
}

export default LandingPage;
