import { Head, Link, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPosts from "app/posts/queries/getPosts"
import { Post } from "db"

const ITEMS_PER_PAGE = 100

export const PostsList = ({ posts, hasMore }) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={Routes.ShowPostPage({ postId: post.id })}>
              <a>Title: {post.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

type PostsPageProps = {
  posts: Post[]
  hasMore: Boolean
}

const PostsPage: BlitzPage<PostsPageProps> = ({ posts, hasMore }) => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPostPage()}>
            <a>Create Post</a>
          </Link>
        </p>

        <PostsList posts={posts} hasMore={hasMore} />
      </div>
    </>
  )
}

// PostsPage.authenticate = true
PostsPage.getLayout = (page) => <Layout>{page}</Layout>

export async function getStaticProps(context) {
  const page = context.params?.page ?? 0
  const { posts, hasMore } = await getPosts({
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return {
    props: { posts, hasMore },
    revalidate: 60,
  }
}

export default PostsPage
