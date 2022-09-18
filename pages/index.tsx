import { GetStaticProps, NextPage } from 'next'
import type { ReactElement } from 'react'
import Link from 'next/link'
import { QueryDatabaseResponseEx } from 'notionate'
import { Gallery } from 'notionate/dist/components'
import { getServices } from '../lib/service'

type Props = {
  services: QueryDatabaseResponseEx
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const services = await getServices()
  return {
    props: {
      services,
    }
  }
}

const Home: NextPage<Props> = ({ services }) => {
  return <Gallery
    keys={['タイトル', '公開日時', 'タグ']}
    db={services}
    preview="cover"
    size="small"
    fit={true}
    href="/services/[Slug]"
    link={Link as React.FC<{ children: ReactElement<'a'>, href: string}>}
  />
}

export default Home
