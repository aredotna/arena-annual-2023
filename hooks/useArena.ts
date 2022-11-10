import { ArenaClient } from "arena-ts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useArena = () => {
  const [client, setClient] = useState<ArenaClient | null>(null);
  const { data, status } = useSession()
  const loading = status === "loading"

  useEffect(() => {
    const typedData = data as any;
    const accessToken = typedData?.user.accessToken
    const options = data ? { token: accessToken } : undefined;
    const arena = new ArenaClient(options);

    setClient(arena);
  }, [loading])

  return client;
}