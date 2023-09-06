import Head from "next/head";

import TournamentCreate from "~src/components/Tournament/Create";

export default function TournamentNewPage() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TournamentCreate />
    </>
  );
}
