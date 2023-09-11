import Head from "next/head";
import { useRouter } from "next/router";

import Tournament from "~src/components/Tournament";

export default function TournamentPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Tournament</title>
        <meta name="description" content="Playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tournament id={router?.query?.id as string} />
    </>
  );
}
