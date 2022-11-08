import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data, status } = useSession()
  const loading = status === "loading"
  return (
    <div className={styles.container}>
      <Head>
        <title>In Service Of / Are.na</title>
        <meta name="description" content="On the occassion of the Are.na Annual 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {loading && <div className={styles.title}>Loading...</div>}
        {
          data &&
            <>
              <h1 className={styles.title}>Welcome, {data?.user?.name ?? data?.user?.email}!</h1>
              <p style={{ marginBottom: '10px' }}> </p> <br />
            </>
          }
          {
          !data &&
            <>
              <p className={styles.title}>Please log in to continue</p>
              <img src="no-user.jpg" alt="" className={styles.avatar} />               
            </>
          }
      </main>
    </div>
  )
}
