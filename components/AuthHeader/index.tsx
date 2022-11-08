import React from 'react'
import { useSession, signIn } from 'next-auth/react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 2em;
  right: 2em;
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
        </Container>
      )}

      {!data && (
        <Container>
          Not logged in
          <a onClick={() => signIn('arena')}>Sign in</a>
        </Container>
      )}
    </>
  )
}