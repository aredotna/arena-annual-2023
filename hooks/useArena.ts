import { ArenaClient } from "arena-ts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useArena = () => {
  const [client, setClient] = useState<ArenaClient | null>(null);
  const { data, status } = useSession()
  const loading = status === "loading"

  useEffect(() => {
    if (data) {
      const typedData = data as any;
      const accessToken = typedData.accessToken
      const arena = new ArenaClient({
        token: accessToken,
      });

      setClient(arena);
    }
  }, [loading])

  return client;
}