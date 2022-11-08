import Head from 'next/head'
import { useSession } from 'next-auth/react'
import styled from "styled-components"
import { AuthButton } from "../components/AuthButton"
import { useArena } from '../hooks/useArena';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

const Description = styled.div`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.5rem;
  width: 50vw;

  @media only screen and (max-width: 900px) {
    position: static;
    width: auto;
  }
`;

export default function Home() {
  const client = useArena()

  client?.channel('art').get().then((channel) => {
    console.log({ channel })
  })

  return (
    <div>
      <Head>
        <title>In Service Of / Are.na</title>
        <meta name="description" content="On the occassion of the Are.na Annual 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <AuthButton />
      </Container>
    </div>
  )
}
