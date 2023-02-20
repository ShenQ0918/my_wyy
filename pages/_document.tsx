import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      {/* 所有页面都会添加的head信息，SEO优化 */}
      <title>云音乐商城 - 音乐购有趣</title>
      <Head>
         {/* 在此处引入网页icon  */}
         <link rel="icon" href="/favicon.ico" />
         <meta 
            name="keywords" 
            content="数码影音，beats耳机，击音耳机，漫步者，akg，潮牌，T恤，音乐生活，食品，服饰配件，礼品，礼物，礼盒，鲜花，ip周边，云音乐，商城，云贝">
         </meta>
         <meta
             name="description" 
             content="云音乐商城是专注于音乐场景打造的音乐购物平台，包含音乐人周边、3c影音数码、音乐市集等，和我们一起让音乐购有趣，给生活加点料">
         </meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
