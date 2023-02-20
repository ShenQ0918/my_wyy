// 全局样式
import type { AppProps } from 'next/app'
import "@/styles/globals.scss"
import "normalize.css"  //样式重置 npm i normalize.css --save
import 'antd/dist/reset.css';

import Layout from "@/components/layout"
import wrapper from '@/store'
import {Provider} from 'react-redux'

export default function App({ Component, ...rest }: AppProps) {
  // Redux 接入的App
  const {store, props } = wrapper.useWrappedStore(rest)
  return (
   <Provider store={store}>
     <Layout>
      <Component {...props.pageProps} />
    </Layout>
   </Provider>
  )
}

