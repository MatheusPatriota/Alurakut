import styled from 'styled-components'

const MainGrid = styled.main`
  width: 100%;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  grid-gap: 10px;
  padding: 16px;

  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }

  @media (min-width: 860px) {
    max-width: 1110px;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

export default MainGrid;
