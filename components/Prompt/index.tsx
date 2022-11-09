import React, { useCallback, useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import styled from 'styled-components'
import { useArena } from '../../hooks/useArena'

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
  const [entry, setEntry] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const arena = useArena()
  const inputRef = useRef<HTMLInputElement>(null)

  const updateEntry = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEntry(e.target.value)
  }, [setEntry])

  const addEntry = useCallback(() => {
    setLoading(true)
    arena?.channel('______-as-a-service').createBlock({ content: entry }).then(() => {
      setLoading(false)

      if (!inputRef?.current) return
      inputRef.current.value = ''
    })
  }, [arena, entry, inputRef])

  return (
    <Container loggedIn={loggedIn}>
      {!loggedIn && <><Link onClick={() => signIn('arena')}>Sign in</Link> to add your entry</>}
      {loggedIn && (
        <>
          <Label><Input onChange={updateEntry} ref={inputRef} /> as a service</Label>
          <Button onClick={addEntry} disabled={loading}>{loading ? "Adding..." : "Add entry"}</Button>
        </>
      )}
    </Container>
  )
}