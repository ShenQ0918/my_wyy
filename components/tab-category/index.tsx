import {memo, ReactElement } from "react";
import classNames from "classnames";
import { Col, Row } from 'antd';
import Image from "next/image";

import type { ICategory } from "@/service/home";
import type { FC } from "react";
import styles from "./index.module.scss"

export interface IProps {
    children?: ReactElement;
    categorys?: ICategory[];
}


const TabCategory: FC<IProps> =memo(function(props) {
    const { children,categorys } = props;
    return (
        <div className={styles["tab-category"]}>
           <div className={classNames("wrapper",styles.content)}>
           <Row>
            {
                categorys?.map((category)=>{
                    return (
                        <Col key={category.cid} span={6}>
                            <div  className={styles['category-item']}>
                                <Image 
                                    className={styles.image}
                                    src={category.picStr!} 
                                    alt="category"
                                    width={48}
                                    height ={48}
                                >
                                </Image>

                                <div className={styles.right}>
                                    <div className={styles.title}>{category.title}</div>
                                    {/* 描述type===1 才会显示 */}
                                    {
                                        category.type===1 &&(
                                            <div className={styles["sub-title"]}>
                                                <span className={styles.count}>{category.count}</span>
                                                <span className={styles.desc}>{category.desc}</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Col>
                                
                    )
                })
            }
            </Row>
               
           </div>
        </div>
    );
}) ;

export default TabCategory;
TabCategory.displayName ="TabCategory";
