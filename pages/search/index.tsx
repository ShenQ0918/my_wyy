import {memo, ReactElement } from "react";
import type { FC } from "react";
import { useRouter } from "next/router";
import wrapper from "@/store";
import { fetchSearchSuggest } from "@/store/modules/home";
import { GetServerSideProps } from "next";
import { postSeatchInfo } from "@/service/search";
import { IProduct } from "@/service/home";
import GridView from "@/components/grid-view";
import classNames from "classnames";


export interface IProps {
    children?: ReactElement;
    products?: IProduct[];
}


const Search: FC<IProps> =memo(function(props) {
    const { children,products } = props;
    const router = useRouter();
    const { q } = router.query
    return (
    <div className="Search">
        <div className={classNames("wrapper")}>
            <GridView products={products}></GridView>
        </div>
    </div>
    );
}) ;

export default Search;
Search.displayName ="Search";

// ssr
// 从客户端拿数据：hooks 从服务器端拿数据：getServerSideProps
export const getServerSideProps: GetServerSideProps = 
  wrapper.getServerSideProps(function (store) {
    return async (context) =>{
        /* 1. 触发一个异步action来发起网络请求，拿到搜索建议并存到redux中*/
      await store.dispatch(fetchSearchSuggest())
      /* 2.拿到搜索页面的数据 */
      const { q } = context.query //拿到url中的查询字符串(再服务器端 在客户端用useRouter拿到 )
      const res = await postSeatchInfo(
        {
            limit: 60,
            offset: 0,
            key: q as  string
        } 
      )
      return {
        props: {
            products : res.products,
        },
      }

    }
  }
  )