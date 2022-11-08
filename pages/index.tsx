import Head from 'next/head'
import { useSession } from 'next-auth/react'

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
            <>
              <h1>Welcome, {data?.user?.name ?? data?.user?.email}!</h1>
              <p style={{ marginBottom: '10px' }}> </p> <br />
            </>
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
