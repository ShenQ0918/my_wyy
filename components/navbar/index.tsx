import {memo, ReactElement } from "react";
import type { FC } from "react";
import Link from "next/link";
import {shallowEqual,useSelector} from "react-redux"
import styles from './index.module.scss'
import classNames from "classnames";
import Search from "../search";
import { IAppRootState } from "@/store";


export interface IProps {
    children?: ReactElement;
}

// 从redux读取数据
const NavBar: FC<IProps> =memo(function(props) {
    const { children } = props;
    const { counter,navbar} = useSelector((rootState: IAppRootState) =>{
        return {
            navbar: rootState.home.navbar,
            counter: rootState.home.counter,
        }
    },shallowEqual)
    
    return (
        <div className={styles.navbar}>
            <div className={classNames("wrapper",styles.content)}>
                <div className={styles["content-left"]}>
                    <Link href="/" className={styles.logo}></Link>
                    {/* h1是为了seo优化，爬虫，左移 隐藏 */}
                    <h1 className={styles.title}>云音乐商城 - 音乐购有趣</h1>
                </div>
                <div className={styles["content-right"]}>
                    {/* 热门搜索的列表->服务器接收更新 */}
                    {/* 1. CSR渲染： NavBar -> useEffect -> axios -> data -> javascript动态渲染的这个列表 */}
                    {/* 2. SSR+Redux: Index Page -> SSR ->axios ->data -> Redux ->Navbar ->Redux */}
                    {/* npm i next-redux-wrapper --save       npm i @reduxjs/toolkit react-redux --save */}
                    <Search searchData ={navbar}></Search>
                    <div className={styles["right-cart"]}>
                        <Link href="/" className={styles.cart}>
                            <span className={styles.count}>{counter}</span>
                        </Link>
                    </div>
                    <div className={styles["right-login"]}>登录</div>
                </div>
            </div>
        </div>
    );
}) ;

export default NavBar;
NavBar.displayName ="NavBar";
