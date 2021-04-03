import Head from 'next/head';

export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  const paths = data.map((user) => {
    return {
      params: { id: user.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  const data = await res.json();

  return {
    props: { users: data },
  };
};

const Details = ({ users }) => {
  return (
    <div>
      <Head>
        <title> Users List | Users</title>
        <meta name='keywords' content='list' />
      </Head>
      <h1>{users.name}</h1>
      <p>{users.email}</p>
      <p>{users.website}</p>
      <p>{users.address.city}</p>
    </div>
  );
};

export default Details;
