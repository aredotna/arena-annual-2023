import Head from 'next/head'
import { useSession } from 'next-auth/react'
import styled from "styled-components"
import { AuthButton } from "../components/AuthButton"
import { useArena } from '../hooks/useArena'
import { Prompt } from '../components/Prompt'

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
  const { data, status } = useSession() || {}
  const loading = status === "loading"
  const user = data?.user as any

  return (
    <div>
      <Head>
        <title>In Service Of / Are.na</title>
        <meta name="description" content="On the occassion of the Are.na Annual 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <AuthButton />
        <Description>
          <strong>In Service Of</strong>
          <p>
            <strong>&quot;service&quot;</strong> as in – <br/>
            an act of helping or supplying;<br/> 
            to repair or maintain;<br /> 
            to provide a public need;<br/>
            a meeting for worship,<br/>
            a place to refuel
          </p>
          <p>
            For the <a href="https://www.are.na/blog/open-call-for-pitches-for-the-2023-are-na-annual">2023 Are.na Annual</a>, we are asking ourselves: <br/>
            What is it we are in service of? <br/>
          </p>
          <p>
            We will publish all selected entries in the 2023 Are.na Annual.
          </p>
        </Description>

        {!loading && <Prompt user={user} />}
      </Container>
    </div>
  )
}
