import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang="zh">
        <Head>
          <meta charSet="utf-8" />
          <meta name="keywords" content="中国古筝日" />
          <meta name="description" content="中国古筝日" />
          <script src="https://cdn.bootcss.com/echarts/4.1.0/echarts.min.js" />
          <script src="http://gallery.echartsjs.com/dep/echarts/map/js/china.js" />
          <link href="https://cdn.quilljs.com/1.3.3/quill.snow.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
