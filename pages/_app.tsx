import Head from 'next/head'
import Link from 'next/link'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'notionate/dist/styles/notionate.css'

function MyApp({ Component, pageProps }: AppProps) {
  const title = 'Pepabo Services'
  const icon = '️✍️'
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`} />
      </Head>

      <header className="header">
        <h1> <span>{icon}</span> <span><Link href="/">{title}</Link></span> </h1>
        <p>これは <a href="https://tech.pepabo.com/">NotionをDaaSにして「ロリポップ！」「ヘテムル」のサイトをもっと安全にしよう</a> のサンプルサイトです。</p>
      </header>

      <section>
        <Component {...pageProps} />
      </section>

      <footer className="footer">
        &copy; linyows.her.jp on <a href="https://lolipop.jp">lolipop</a>
      </footer>
    </div>
  )
}

export default MyApp
