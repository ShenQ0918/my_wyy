import hyRequest from "./index"
import type { IResultData } from "./index"

// 定义获取的搜索数据中的data中的类型
export interface ISearchSuggest{
    id: string;
    defaultKey: string;
    configKey: any[];
}

export interface Ibanner {
    id: number;
    picStr?: string;
    backendPicStr?: string;
}

export interface ICategory{
    cid: number;
    picStr?: string;
    title?: string;
    tabIndex?: number;
    count?: number;
    desc?: string;
    type?: number;
    targetUrl?: string;
}

export interface Irecommend {
    id: number;
    picStr?: string;
    title?: string;
}

export interface IHomeInfo {
    banners?: Ibanner[];
    categorys?: ICategory[];
    recommends?: Irecommend[];
    digitalData?: any; //自己补写
}

export interface IProduct{
    id: number;
    type?: number;
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    originalCost?: number;
    couponLabelDesc?: string;
    coverUrl?: string;
}

export interface IHotproduct{
    id: number;
    products?: IProduct;
}

export interface IHotproductV2{
    count?: number;
    hasMore?: boolean;
    hotProduct?: IHotproduct[];
}

export interface IAllProduct{
    count?: number;
    allProduct?: IProduct[];
}

// 01-获取搜索建议的接口  -》接下来 发起网络请求 首页作为SSR渲染页面
export const getSearchSuggest =() =>{
    return hyRequest.get<IResultData<ISearchSuggest>>("/searchSuggest/get")
}

// 02-获取首页的数据（轮播图/分类...）
export const getHomeInfo =() =>{
    return hyRequest.get<IResultData<IHomeInfo>>("/home/info")
}

// 03-编辑推荐的商品 hotproduct_v2
export const getHotproduct_v2 =() =>{
    return hyRequest.get<IResultData<IHotproductV2>>("/hotproduct_v2/gets")
}

// 04-所有商品 allProduct/gets
export const getAllProduct =() =>{
    return hyRequest.get<IResultData<IAllProduct>>("allProduct/gets")
}