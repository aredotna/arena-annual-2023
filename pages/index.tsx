import Head from 'next/head'
import { useSession } from 'next-auth/react'
import styled from "styled-components"

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
  const session = useSession() || {}
  const { data, status } = session

  const loading = status === "loading"
  console.log({ data, session })

  return (
    <div>
      <Head>
        <title>In Service Of / Are.na</title>
        <meta name="description" content="On the occassion of the Are.na Annual 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {loading && !data && <div>Loading...</div>}
        {
          data &&
            <Description>
              Welcome, {data?.user?.name ?? data?.user?.email}!
            </Description>
          }
          {
          !data && !loading &&
            <>
              <p>Please log in to continue</p>
            </>
          }
      </main>
    </div>
  )
}
