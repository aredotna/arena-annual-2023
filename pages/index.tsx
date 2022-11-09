import Head from 'next/head'
import { useSession } from 'next-auth/react'
import styled from "styled-components"
import { AuthButton } from "../components/AuthButton"
import { Prompt } from '../components/Prompt'
import { Entries } from '../components/Entries'

const Main = styled.div`
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
    <>
      <Main>
        <Head>
          <title>As a Service / Are.na</title>
          <meta name="description" content="On the occassion of the Are.na Annual 2023" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AuthButton />
        <Description>
          <strong>_____ as a Service</strong>
          <p>
            The <a href="https://www.are.na/blog/open-call-for-pitches-for-the-2023-are-na-annual">forthcoming Are.na Annual</a> is themed <strong>&quot;service&quot;</strong> as in – <br/>
            an act of helping or supplying;<br/> 
            to repair or maintain;<br /> 
            to provide a public need;<br/>
            a meeting for worship,<br/>
            a place to refuel
          </p>
          <p>
            What else can be considered as a service?
          </p>
          <p>
            Filling in the blank below will add to this page and populate the channel “<a href="https://www.are.na/are-na-team/______-as-a-service">_____ as a service.</a>” Selected entries will be published in the 2023 Are.na Annual, out in January. 
          </p>
        </Description>

        {!loading && <Prompt user={user} />}

        {!loading && (
          <Entries />
        )}
      </Main>
    </>
  )
}
