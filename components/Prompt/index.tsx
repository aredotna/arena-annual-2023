import React from 'react'
import { signIn } from 'next-auth/react'
import styled from 'styled-components'

const Container = styled.div<{ loggedIn: boolean }>`
  padding: 2rem;
  text-align: center;

  ${props => !props.loggedIn && `
    background: #f5f5f5;
  `}
`

const Link = styled.a`
  cursor: pointer;
`

const Label = styled.div`
  font-size: 1.5rem;
  text-align: center;
`

const Input = styled.input`
  font-size: 1.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
  border: none;
  border-bottom: 1px solid #2f2f2f;
`

const Button = styled.button`
  font-size: 1.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #2f2f2f;
  border-radius: 0.5rem;
  background: #eee;
`

interface PromptProps {
  user: any
}

export const Prompt: React.FC<PromptProps> = ({
  user,
}) => {
  const loggedIn = !!user && user.id
  return (
    <Container loggedIn={loggedIn}>
      {!loggedIn && <><Link onClick={() => signIn('arena')}>Sign in</Link> to add your entry</>}
      {loggedIn && (
        <>
          <Label><Input /> as a service</Label>
          <Button>Add entry</Button>
        </>
      )}
    </Container>
  )
}