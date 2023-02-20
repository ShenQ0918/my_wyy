import { getSearchSuggest, ISearchSuggest } from "@/service/home";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// home模块state的类型
export interface IhomeInitialState {
    counter:number;
    navbar: ISearchSuggest
}//定义类型

const homeSlice = createSlice({
    name:"home",
    //初始化的state
    initialState:{
        counter:10,
        navbar: {},
    } as IhomeInitialState,

    reducers: {
        increment(state,{ type,payload }) { //type: home/increment payload:2
            state.counter +=payload;
        },
    },
    /* extraReducers：一个函数 */
    /* 定义一些额外的 reducer，用于处理其他 action 或异步 action 的状态变化 */
    extraReducers:(builder) =>{ // 处理 HYDRATE action 的状态变化，用于在服务端渲染时保证客户端和服务端的数据一致性
        //第一步Hydrate的操作。保证服务器端和客户端数据的一致性 是个语法 照着写 给模块添加hytration操作，保证数据状态一致性
        builder.addCase(HYDRATE ,(state ,action: any) =>{
            // state -> initialState
            // action.payload -> rootState
            return {
                ...state,// 将 initialState 中的所有属性复制到新的状态对象中
                ...action.payload.home, //这个action的payload是根的state,需要通过它来拿当当前模块--home
                 // 将服务端渲染时生成的数据中名为 home 的属性复制到新的状态对象中
            }
        })

        // 监听异步action
        // 处理 fetchSearchSuggest.fulfilled action 的状态变化，用于将获取到的数据更新到 navbar 属性中
        .addCase(fetchSearchSuggest.fulfilled,(state, {payload}) =>{
            state.navbar = payload;
        })
    }
})

// 异步的action
// 使用 createAsyncThunk 函数创建一个名为 fetchSearchSuggest 的异步 action
export const fetchSearchSuggest = createAsyncThunk(
    // 定义 action 的类型字符串，用于在 Redux DevTools 中显示 action 的类型
    'fecthSearchSuggest',
    // 定义一个异步回调函数，用于获取数据
    async () => {
        // 调用 getSearchSuggest 函数从网络获取搜索建议数据
        const res = await getSearchSuggest();
        // 返回获取到的搜索建议数据
        return res.data;
    }
);

//同步的action
export const {increment} = homeSlice.actions;
export default homeSlice.reducer;