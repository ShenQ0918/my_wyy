import {memo, ReactElement } from "react";
import type { FC } from "react";
import styles from "./index.module.scss"
import classNames from "classnames";
import { fetchSearchSuggest } from "@/store/modules/home";
import { GetServerSideProps } from "next";
import wrapper from "@/store";
import { getDetailPageInfo, IDetailPageInfo } from "@/service/detail";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import GridView from "@/components/grid-view";


export interface IProps {
    children?: ReactElement;
    detailData?: IDetailPageInfo;
}


const Detail: FC<IProps> =memo(function(props) {
    const { children,detailData } = props;

    const router =useRouter()
    const { id } = router.query; //拿到url中的查询字符串


    return (
        <div className={styles.detail}>
           <div className={classNames("wrapper",styles.content)}>
                 {/* 图片 */}
                <div className={styles.banner}>
                    <Link href={'/'}>
                        <Image
                            className={styles.image}
                            src ={detailData?.webPic!}
                            alt="air"
                            fill //宽高充满父组件
                        >

                        </Image>
                    </Link>
                </div>

                {/* 商品列表 */}
                <GridView products={detailData?.products}></GridView>
           </div>

           
        </div>
    );
}) ;

export default Detail;
Detail.displayName ="Detail";

// ssr
// 从客户端拿数据：hooks 从服务器端拿数据：getServerSideProps
export const getServerSideProps: GetServerSideProps = 
  wrapper.getServerSideProps(function (store) {
    return async (context) =>{
        /* 1. 触发一个异步action来发起网络请求，拿到搜索建议并存到redux中*/
      await store.dispatch(fetchSearchSuggest())
      /* 2.拿到详情页面的数据 */
      const { id } = context.query //拿到url中的查询字符串(再服务器端 在客户端用useRouter拿到 )
      const res = await getDetailPageInfo(id as string)
      return {
        props: {
            detailData: res.data
        },
      }

    }
  }
  )