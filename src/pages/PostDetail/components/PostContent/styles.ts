import styled from 'styled-components'

export const PostContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem 2rem;
  margin-bottom: 8rem;

  h1,
  h2,
  h3 {
    color: #3294F8;
  }

  img {
    width: 100%;
  }

  a {
    color:#3294F8;
    text-decoration-line: underline;
    transition: text-decoration 0.4s ease;

    &:hover {
      text-decoration: none;
    }
  }

  ul {
    list-style: inherit;
    padding-left: 1.5rem;
  }

  pre {
    background: #112131;
    padding: 1rem;
    border-radius: 2px;

    & > div {
      background: none !important;
      padding: 0 !important;
      margin: 0 !important;

      code {
        font-family: 'Fira Code', monospace !important;
        line-height: 160% !important;
      }
    }
  }
`
