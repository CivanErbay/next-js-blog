import Link from 'next/link';

export default function Post({post}) {
    return(
        <div>
        <Link href="/">Go home</Link>
        <h2>{post.Title}</h2>
        </div>
    )
}

//tell nextJS how many pages there are
export async function getStaticPaths() {
    const res = await fetch('http://localhost:1337/api/posts');

    const posts = await res.json(); 
    
    const paths = posts.data.map(post => ({
        params: {slug: post.attributes.Slug}
    }))

    console.log(paths);
 
    return {        
        paths,
        fallback: true
    }
};


//for each individual page get the data
export async function getStaticProps({params}) {
    const { slug } = params
  
    const res = await fetch(`http://localhost:1337/api/posts?filters[slug]=${slug}`)
    const data = await res.json() ;
    //const data = await JSON.stringify(res);
    console.log("data", data.data[0].attributes);
    const post = data.data[0].attributes;

    console.log("post", post);
    return {
        props: { post },
    }
}

// slug filter example
// http://localhost:1337/api/posts?filters[slug]=hello-world