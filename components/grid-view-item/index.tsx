import {memo, ReactElement } from "react";
import type { FC } from "react";
import Image from "next/image";
import styles from "./index.module.scss"
import type { IHotproduct, IProduct } from "@/service/home";
import Link from "next/link";
export interface IProps {
    children?: ReactElement;
    product?: any;
    showTip?: boolean;
}


const GridViewItem: FC<IProps> =memo(function(props) {
    const { children ,product,showTip } = props;
    const newProduct = product.products ? product.products: product; //判断是编辑推荐还是热门商品
    return (
        <div className={styles["grid-view-item"]}>
           <div className={styles["item-image"]}>
             <Image 
                className={styles.image}
                src={newProduct?.coverUrl!} 
                alt="image" 
                width={263} 
                height={263}>
             </Image>

             {
                showTip && (
                    <div className={styles.tip}>
                        <div className={styles["min-price"]}>￥{newProduct?.minPrice}</div>
                        <div className={styles["original-cost"]}>￥{newProduct?.originalCost}</div>
                    </div>
                )
             }
           </div>
           <div className={styles["item-info"]}>
            {/* label */}
                {
                    newProduct?.couponLabelDesc && (
                        <span className={styles.label}>{newProduct.couponLabelDesc}</span>
                    )
                }
            {/* name */}
                <Link href="/" className={styles.name}>{newProduct?.name}</Link>
           </div>
           <div className={styles["item-price"]}>￥{newProduct?.minPrice}</div>
        </div>
    );
}) ;

export default GridViewItem;
GridViewItem.displayName ="GridViewItem";
