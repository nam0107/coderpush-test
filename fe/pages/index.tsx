import type { NextPage } from 'next';
import Head from 'next/head';
import HomeContainer from '../src/containers/homeContainer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer />
    </>
  );
};

export default Home;
