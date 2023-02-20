import { getAllProduct, getHomeInfo, getHotproduct_v2, IProduct } from "@/service/home";
import wrapper from "@/store/index"
import { fetchSearchSuggest, increment } from "@/store/modules/home";
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "antd";
import styles from "./index.module.scss"
import TopSwiper from "@/components/top-swiper";

import type { FC } from "react";
import type { Ibanner, ICategory, Irecommend ,IHotproduct} from "@/service/home";
import type { IAppRootState,IAppDispatch } from "@/store/index"
import type { GetServerSideProps } from "next";
import TabCategory from "@/components/tab-category";
import Recommend from "@/components/recommend";
import classNames from "classnames";
import SectionTitle from "@/components/section-title";
import GridView from "@/components/grid-view";
import DigitalPanel from "@/components/digital-panel";

interface Iprops {
  banners: Ibanner[],
  categorys : ICategory[],
  recommends : Irecommend[],
  digitalData : any,

  hotProducts: IHotproduct[],
  allProducts: IProduct[],
}
const Home:FC<Iprops> =(props)=> {
  const { banners=[],
          categorys=[],
          recommends=[],
          hotProducts=[],
          allProducts=[],
          digitalData={},
  } = props
  // 1.从redux读取状态
  const { counter } =useSelector((rootState: IAppRootState) =>{
    return {
      counter: rootState.home.counter,
    };
  });

  // 2.使用dispatch来触发action
  const dispatch: IAppDispatch = useDispatch()
  function addCounter(){
    dispatch(increment(2));
  }

  return (
    <>
      <Head>
        <title>网易云音乐-商城</title>
      </Head>
      <div className={styles.home}>
        <TopSwiper banners = {banners}></TopSwiper>
        <TabCategory categorys={categorys}></TabCategory>
        <Recommend recommends={recommends}></Recommend>

        {/* 首页版心内容 */}
        <div className={classNames("wrapper",styles.content)}>
          <SectionTitle title="编辑推荐"></SectionTitle>
          <GridView products={hotProducts}></GridView>
          {/* 数据面板组件 */}
          <DigitalPanel itemData={digitalData}></DigitalPanel>
          <SectionTitle title="热门商品"></SectionTitle>
          <GridView products={allProducts}></GridView>
        </div>
      </div>
      
    </>
  )
}

export default Home;
Home.displayName ="Home";
/* // 每次访问首页的时候都会执行,但是需要拿去搜索组件里面展示，在首页里面返回的话数据是给Home组件props-》首页拿到的数据存到redux中，组件去redux读取拿
export const getServerSideProps: GetServerSideProps = async (context) =>{
  // 1.在这里发起网络请求拿到搜索建议的数据
  const res = await getSearchSuggest();
  console.log(res.data);
  
  return {
    props: {},
  };
}; */



// 上述语法修改如下：发网络请求存到store，由于不是组件用不了useState等hooks，故借用store的wrapper的getServerSideProps拿到数据存到redux


/* 上面这段代码使用了 Next.js 的 getServerSideProps 函数和一个名为 wrapper 的高阶函数来获取数据并将其作为 props 传递给页面组件。
具体来说，代码首先使用 export const getServerSideProps 将 getServerSideProps 导出为模块级别的常量，使其在其他文件中可用。接着，使用 wrapper.getServerSideProps 函数对 getServerSideProps 进行了封装，以便在处理请求之前对 store 进行初始化。
wrapper.getServerSideProps 函数接受一个函数作为参数，该函数返回一个异步函数，该函数接受 context 对象作为参数，用于获取关于 HTTP 请求的信息。在这个示例中，异步函数使用 getSearchSuggest 函数从网络获取搜索建议数据，并将其作为 props 返回。
wrapper.getServerSideProps 的作用是将 store 对象传递给被封装的函数，这个 store 对象是在应用程序中用于管理全局状态的 Redux store 对象，可以用来处理与数据相关的操作。
在 getServerSideProps 函数中，我们可以返回一个对象，其中包含要传递给页面组件的数据。在这个示例中，我们返回了一个空的 props 对象，这意味着我们没有传递任何数据给页面组件。如果需要，我们可以在 props 对象中添加其他属性，并将它们作为 props 传递给页面组件。
需要注意的是，getServerSideProps 函数只能在服务器端执行，而不能在客户端执行。在处理页面请求时，Next.js 将调用 getServerSideProps 函数获取数据，并将其作为 props 传递给页面组件，然后将组件及其数据一起渲染到客户端。 */
export const getServerSideProps: GetServerSideProps = 
  wrapper.getServerSideProps(function (store) {
    return async (context) =>{
           /*  // 1.在这里发起网络请求拿到搜索建议的数据
      const res = await getSearchSuggest();
      console.log(res.data); */
      // 1.触发一个异步的sction来发起网络请求，拿到搜索建议并存到redux中 store.dispatch()
      await store.dispatch(fetchSearchSuggest())
      // 2.发起网络请求获取首页的数据（轮播图、分类、推荐）返回props到当前的Home组件（1.是用store共享到其他组件使用）
      const res =await getHomeInfo()
      // 3.发起网络请求拿到首页 编辑推荐的商品
      const resHot =await getHotproduct_v2()
      // 4. 发起网络请求拿到首页 所有商品
      const resAll = await getAllProduct()
      return {
        props: {
          banners: res.data.banners || [],
          categorys : res.data.categorys || [],
          recommends : res.data.recommends || [],
          digitalData : res.data.digitalData || [],

          //编辑推荐的商品
          hotProducts:resHot.data.hotProduct ||[],
          // 热门商品
          allProducts: resAll.data.allProduct || [],
        },
      }

    }
  }
  )