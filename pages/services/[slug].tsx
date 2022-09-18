import { GetStaticProps, NextPage, PreviewData } from 'next'
import {
  FetchBlocks,
  ListBlockChildrenResponseEx,
} from 'notionate'
import {
  Service,
  build,
  getPaths,
  getService,
  DBPage,
  getServices,
} from '../../lib/service'
import { Blocks } from 'notionate/dist/components'

type Props = {
  service?: Service
  blocks?: ListBlockChildrenResponseEx
}

type Params = {
  slug: string
}

export const getStaticPaths = async () => {
  const paths = await getPaths()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params, PreviewData> = async ({ params }) => {
  const service = await getService(params!.slug)

  if (!service) {
    return {
      props: {},
      redirect: {
        destination: '/404'
      }
    }
  }

  const blocks = await FetchBlocks(service.id)
  return {
    props: {
      service: build(service as unknown as DBPage),
      blocks,
    },
    revalidate: 60,
  }
}

const Service: NextPage<Props> = ({ service, blocks }) => {
  return (
    <>
      <img className="cover" src={service?.cover} width="100%" />
      <h2> {service?.title} </h2>
      <p className="meta">
        作成日： <span>{service?.date}</span>, 
        タグ： {service?.tags.map((tag, i) => (
          <span key={`${i}`}>{tag}</span>
        ))}
      </p>
      <Blocks blocks={blocks!} />
    </>
  )
}

export default Service