import hyRequest from "./index"
import type { IResultData } from "./index"
import type { IProduct } from "./home";


export interface ISearchProductResult {
    code: number;
    more: boolean;
    products?: any[];
  }
  
export interface ISearchParam {
    limit: number;
    offset: number;
    key: string;
  }

// 01-获取详情数据的接口  -》接下来 发起网络请求 首页作为SSR渲染页面
export const postSeatchInfo =(data:ISearchParam) =>
{
    return hyRequest.post<ISearchProductResult>
    (`store/api/product/search`, 
      data,
      {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    )

}