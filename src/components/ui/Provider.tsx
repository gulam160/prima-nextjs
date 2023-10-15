"use client";
import { useState, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc as TRPC } from "@/app/_trpc/client";
import { httpBatchLink } from "@trpc/client";

const Provider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    TRPC.createClient({
      links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })],
    })
  );
  return (
    <TRPC.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TRPC.Provider>
  );
};

export default Provider;
