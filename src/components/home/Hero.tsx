import { Post } from '@/models/post'
import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'
import { formatDate } from '../../lib/formatDate'
import { Card } from '../Card'
import SectionTitle from '../SectionTitle'

const FirstArticle = ({ article }: { article: Post }) => (
  <Card as="article" className="relative lg:sticky lg:top-8 lg:w-1/2">
    <Card.PostMedia src={article.cover} />
    <Card.Link href={`/articles/${article.slug}`}>
      <Card.PostBody
        title={article.title}
        description={article.description}
        href={`/articles/${article.slug}`}
      />
    </Card.Link>
    <Card.PostAuthor author={article.author} />
  </Card>
)

function Article({ article }: { article: Post }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      {/* <Card.Eyebrow as="time" decorate>
        {format(article.createdAt)}
      </Card.Eyebrow> */}
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta className={'mt-4'}>Read article</Card.Cta>
    </Card>
  )
}
const Hero = ({ articles }: { articles: Post[] }) => {
  return (
    <div className="mx-auto max-w-2xl px-4 md:px-6 lg:flex lg:max-w-screen-2xl lg:items-start lg:px-8">
      <FirstArticle article={articles[0]} />
      <div className="mt-12 md:mt-16 lg:ml-12 lg:mt-0 lg:w-1/2 xl:ml-16">
        <SectionTitle>Recent stories</SectionTitle>
        <div className="mt-12 flex flex-col gap-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
