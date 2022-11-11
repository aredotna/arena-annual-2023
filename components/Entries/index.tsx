import { ArenaChannelContents, ArenaBlock, ArenaChannel, ArenaChannelWithDetails, ConnectionData, GetChannelsApiResponse } from 'arena-ts'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useArena } from '../../hooks/useArena'

const Container = styled.div`
  padding: 2rem 0;
`

const EntryLine = styled.div`
  font-size: 1.5rem;
`

const LoadMoreButton = styled.button`
  margin-top: 1rem;
  font-size: 1.2rem;
`

type Item = (ArenaBlock | (ArenaChannel & ArenaChannelWithDetails) & ConnectionData)
type Channel = ArenaChannel & ArenaChannelWithDetails
const PER = 100

export const Entries: React.FC = () => {
  const [entries, setEntries] = useState<Item[]>([])
  const arena = useArena()

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const fetchEntries = useCallback(async () => {
    if (!arena) return

    arena.channel('______-as-a-service').get({ forceRefresh: true, per: PER, page }).then((channel) => {
      if (!channel || !channel.contents) return
      const contents = [...entries, ...channel.contents as Item[]]
      setEntries(contents)

      const length = ((channel as unknown) as Channel).length
      setHasMore(length > PER * page)
      setPage(page + 1)
    })
  }, [arena, page])

  useEffect(() => {
    fetchEntries()
  }, [arena])

  return (
    <Container>
      {entries.map((entry) => {
        if (!entry) return null
        if (entry.base_class !== 'Block' || entry.class !== 'Text') return null
        if (!entry.content) return null

        const string = `${entry.content} as a Service`
        const acronym = string.match(/\b(\w)/g)?.join('')
    
        return (
          <div key={entry.id}>
            {entry.base_class === 'Block' && entry.class == 'Text' && (
              <EntryLine><a href={`https://www.are.na/${entry.user.slug}`} target="_blank" rel="noreferrer">{entry.user.username}</a>: {entry.content} as a Service ({acronym})</EntryLine>
            )}
          </div>
        )
      })}

      {/* Load more button */}
      {hasMore && (
        <LoadMoreButton onClick={fetchEntries}>Load more</LoadMoreButton>
      )}
    </Container>
  )
}