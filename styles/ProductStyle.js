import styled from "styled-components";

export const ProductStyle = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  height: auto;
  img {
    width: 100%;
    height: 300px;
    /* max-height: 300px; */
    object-fit: cover;
    cursor: pointer;
  }
  h2 {
    padding: 0.5rem 0rem;
  }
`;
