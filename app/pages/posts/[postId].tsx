import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import deletePost from "app/posts/mutations/deletePost"
import { Post } from "db"

export const PostInfo = ({ post }) => {
  const router = useRouter()
  const [deletePostMutation] = useMutation(deletePost)

  return (
    <>
      <Head>
        <title>Post {post.id}</title>
      </Head>

      <div>
        <h1>Post {post.id}</h1>
        <pre>{JSON.stringify(post, null, 2)}</pre>

        <Link href={Routes.EditPostPage({ postId: post.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePostMutation({ id: post.id })
              router.push(Routes.PostsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

type ShowPostPageProps = {
  post: Post
}

const ShowPostPage: BlitzPage<ShowPostPageProps> = ({ post }) => {
  return (
    <div>
      <p>
        <Link href={Routes.PostsPage()}>
          <a>Posts</a>
        </Link>
      </p>

      <PostInfo post={post} />
    </div>
  )
}

// ShowPostPage.authenticate = false
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {
  const postId = parseInt(context.params.postId)
  const post = await getPost({ id: postId }, context)

  return {
    props: { post },
  }
}
