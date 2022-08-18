import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home({posts}) {
  return (
    <div>
    {posts && posts.data.map(post => (
      <Link href={post.attributes.Slug} key={post.attributes.id}>
      <a>
        <h2>{post.attributes.Title}</h2>
        <p>{post.attributes.Content}</p>
      </a>
      </Link>
    ))} 
    </div>
  )  
}

export async function getStaticProps() {
  //get posts from api
  const res = await fetch('http://localhost:1337/api/posts');
  const posts = await res.json();
  console.log(posts.data[0].attributes);


  return {
    props: {posts}
  }
}