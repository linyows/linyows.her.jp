import {
  FetchDatabase,
  QueryDatabaseParameters,
  RichTextItemResponse,
  SelectPropertyResponse,
  DateResponse,
  DBPageBase,
  QueryDatabaseResponseEx,
} from 'notionate'

export type DBPage = DBPageBase & {
  cover: {
    src: string
  }
  properties: {
    "タイトル": {
      type: "title"
      title: RichTextItemResponse[]
      id: string
    }
    Slug: {
      type: "rich_text"
      rich_text: RichTextItemResponse[]
      id: string
    }
    "公開日時": {
      type: "date"
      date: DateResponse | null
      id: string
    }
    "タグ": {
      type: "multi_select"
      multi_select: SelectPropertyResponse[]
      id: string
    }
  }
}

export type Service = {
  id: string
  title: string
  slug: string
  date: string
  tags: string[]
  cover: string
}

export const build = (page: DBPage): Service => {
  const p = page.properties
  return {
    id: page.id,
    title: p["タイトル"].title.map(v => v.plain_text).join(',') || '',
    slug: p.Slug.rich_text.map(v => v.plain_text).join(',') || '',
    date: p["公開日時"].date?.start || '',
    tags: p["タグ"].multi_select.map(v => v.name) || [],
    cover: page.cover.src,
  }
}

const q = {
  database_id: process.env.NOTION_DBID,
  filter: {
    property: '公開日時',
    date: {
      on_or_before: (new Date(Date.now())).toISOString(),
    },
  },
  sorts: [
    {
      property: '公開日時',
      direction: 'descending',
    },
  ],
  limit: 10,
} as QueryDatabaseParameters

export const getServices = async () => {
  return await FetchDatabase(q)
}

export const getService = async (slug: string) => {
  const svc = await getServices()
  return svc.results.find(v => {
    const p = v as unknown as DBPage
    return p.properties.Slug.rich_text.map(vv => vv.plain_text).join(',') === slug
  })
}

export const getPaths = async () => {
  const svc = await getServices()
  return svc.results.map(v => {
    const p = v as DBPage
    const slug = p.properties.Slug.rich_text.map(v => v.plain_text).join(',')
    return { params: { slug } }
  })
}
