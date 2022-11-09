import React from 'react'
import { signIn } from 'next-auth/react'
import styled from 'styled-components'

const Container = styled.div<{ loggedIn: boolean }>`
  padding: 2rem;

  ${props => !props.loggedIn && `
    background: #f5f5f5;
    text-align: center;
  `}
`

const Link = styled.a`
  cursor: pointer;
`

const Label = styled.div`
  font-size: 1.25rem;
`

const Input = styled.input`
  font-size: 1.25rem;
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #ccc;
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
        <Label>{user.name} is in service of <Input /></Label>
      )}
    </Container>
  )
}