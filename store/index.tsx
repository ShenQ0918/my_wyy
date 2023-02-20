import { configureStore } from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper"
import homeReducer from "./modules/home"


const store = configureStore({
    reducer: {
        home: homeReducer,
    },
});

//相较于react nextjs的SSR多了hydration过程，多了个next-redux-wrapper库的作用

//Hydrate的第二步操作 通过函数创造store,将store包裹了一层 变成wrapper
// const  makeStore = () =>store
// const wrapper = createWrapper( makeStore);
const wrapper = createWrapper( () => store);
export default wrapper

//APP中接入store react里面使用Provider包裹，但nextjs里面使用wrapper包裹后使用useWrapperStore接入App,再使用Provider包裹

// 这个是dispatch函数的类型
export type IAppDispatch = typeof store.dispatch;
// 这个是rootState的类型
export type IAppRootState = ReturnType<typeof store.getState>