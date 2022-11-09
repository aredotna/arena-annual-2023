import { ArenaChannelContents, ArenaBlock, ArenaChannel, ArenaChannelWithDetails, ConnectionData } from 'arena-ts'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useArena } from '../../hooks/useArena'

const Container = styled.div`
  padding: 2rem 0;
`

const EntryLine = styled.div``

type Item = (ArenaBlock | (ArenaChannel & ArenaChannelWithDetails) & ConnectionData)

export const Entries: React.FC = () => {
  const [entries, setEntries] = useState<Item[]>([])
  const arena = useArena()

  useEffect(() => {
    if (!arena) return

    arena.channel('______-as-a-service').get().then((channel) => {
      if (!channel || !channel.contents) return
      setEntries(channel.contents as Item[])
    })
  }, [arena])

  return (
    <Container>
      {entries.map((entry) => {
        return (
          <div key={entry.id}>
            {entry.base_class === 'Block' && entry.class == 'Text' && (
              <EntryLine><a href={`https://www.are.na/${entry.user.slug}`}>{entry.user.username}</a>: {entry.content} as a Service</EntryLine>
            )}
          </div>
        )
      })}
    </Container>
  )
}