import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 2em;
  right: 2em;
  text-align: right;
`

const Link = styled.a`
  display: block;
  cursor: pointer;
`

export const AuthButton: React.FC = () => {
  const session = useSession() || {}
  const { data, status } = session

  const loading = status === "loading"

  if (loading) {
    return (
      <Container>
        Loading...
      </Container>
    )
  }

  return (
    <>
      {data && (
        <Container>
          Logged in as {data?.user?.name}
          <Link onClick={() => signOut()}>Sign out</Link>
        </Container>
      )}

      {!data && (
        <Container>
          Not logged in
          <Link onClick={() => signIn('arena')}>Sign in</Link>
        </Container>
      )}
    </>
  )
}