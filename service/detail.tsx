import hyRequest from "./index"
import type { IResultData } from "./index"
import type { IProduct } from "./home";


export interface IDetailPageInfo{
    id?: string;
    webPic?: string;
    products?: IProduct[];
}
// 01-获取详情数据的接口  -》接下来 发起网络请求 首页作为SSR渲染页面
export const getDetailPageInfo =(id:string) =>
{
    return hyRequest.get<IResultData<IDetailPageInfo>>
    ("/special/getdetail?specialTopicId=" +id)
}