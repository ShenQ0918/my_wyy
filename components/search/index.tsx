import {memo, ReactElement, useState } from "react";
import type { FC } from "react";
import styles from "./index.module.scss"
import classNames from "classnames"
import { ISearchSuggest } from "@/service/home";
import { useRouter } from "next/router";

//属性的类型声明
export interface IProps {
    children?: ReactElement;
    searchData: ISearchSuggest;
}

//memo浅层更新优化 比较
const Search: FC<IProps> =memo(function(props) {
    const { children ,searchData} = props;
    const [inputFocus , setInputFocus] =useState<boolean>(false)
    const [placeholder, setPlaceholder] =useState("蓝牙耳机")
    const router =useRouter();

    function haddleKeyDown(event:KeyboardEvent) {
        if(event.key ==="Enter"){
            const inputTarget = event.target as HTMLInputElement
            // console.log(inputTarget.value);
            goToSearchPage(inputTarget.value)
            setInputFocus(false)
            
        }
    }

    function haddleInputFocus(isFocus:boolean){
        setInputFocus(isFocus)
    }
 
    function handleItemClick(name:string){
        setPlaceholder(name)
        goToSearchPage(name)
    }

    function goToSearchPage(name:string){
        router.push({
            pathname:"/search",
            query:{
                q:name,
            }
        })
    }

    return (
        <div className={styles.search}>
            {/* 搜索输入框 */}
            <div className={styles["search-bg"]}>
                <input className={styles.input} type="text" placeholder={placeholder}
                onFocus={() => haddleInputFocus(true)}
                onBlur ={() => haddleInputFocus(false)}
                onKeyDown ={(e) =>haddleKeyDown(e as any)}/>
            </div>

            {/* 下拉面板 */}
            <div className={classNames(styles["search-panel"],
                    inputFocus? styles.show :styles.hidden)}>
                <div className={styles.shadow}></div>
                <h2>热门搜索</h2>
                <ul>
                    {
                        searchData?.configKey && 
                        searchData?.configKey.map((item,index) =>{ //item是一个对象： configKey[{"1":"耳机"}，{"2":"xxx"}]
                            return (<li key={item[index+1]} onMouseDown={()=>handleItemClick(item[index+1])}>{item[index+1]}</li>)
                        })
                    }
                </ul>
            </div>
        </div>
    );
}) ;

export default Search;
Search.displayName ="Search";
