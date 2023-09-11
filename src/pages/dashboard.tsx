import Head from "next/head";

import Dashboard from "~src/components/Dashboard";

export default function TournamentDashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />;
    </>
  );
}
