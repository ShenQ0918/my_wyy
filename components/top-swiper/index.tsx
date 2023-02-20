import {ElementRef, memo, ReactElement, useRef, useState } from "react";
import type { FC } from "react";
import { Carousel } from 'antd'
import styles from "./index.module.scss"
import classNames from "classnames";
import { Ibanner } from "@/service/home";
import Image from "next/image";

export interface IProps {
    children?: ReactElement;
    banners?: Ibanner[];
}

const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

const TopSwiper: FC<IProps> =memo(function(props) {
    const { children , banners} = props;
    const [ currentIndex,setCurrentIndex] = useState<number>(0)
    const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

    const onSwiperChange = (index: number) => {
        console.log(index);
        setCurrentIndex(index);

    }

    function handlePrevPage(){
        bannerRef.current?.prev()
    }

    function handleNextPage(){
        bannerRef.current?.next()
    }

    return (
        <div className={styles["top-swiper"]}>
           <div className={classNames("wrapper", styles.content)}>
            <Carousel 
                ref={bannerRef}
                className={styles.carousel}
                autoplay
                autoplaySpeed={3000}
                fade
                dots ={false}
                afterChange={onSwiperChange }
            >
                {
                    banners?.map((banner)=>{
                        return (
                            <div key={banner.id} className={styles["swiper-item"]}>
                                {/* 背景 */}
                                <div 
                                    className={styles['swiper-bg']}
                                    style ={
                                        {backgroundImage: `url(${banner.backendPicStr})`}
                                    } 
                                >
                                </div>
                                <Image 
                                    className={styles.image}
                                    src={banner.picStr!}
                                    alt ="banner"
                                    width={1100}
                                    height={480}
                                >

                                </Image>
                            </div>
                        )
                    })
                }
            </Carousel>

                {/* 指示器 */}
            <ul className={styles.dots}>
                {
                    banners?.map((banner,index) =>{
                        return (
                            <li key={banner.id} 
                                className={classNames(
                                    styles.dot,
                                    currentIndex ===index? styles.active:"")}></li>
                        )
                    })
                }
            </ul>
           </div>

           {/* 上一页 下一页 */}
           <button className={styles.prev} onClick={handlePrevPage}>
                <span></span>
           </button>
           <button className={styles.next} onClick={handleNextPage}>
                <span></span>
           </button>
           
        </div>
    );
}) ;

export default TopSwiper;
TopSwiper.displayName ="TopSwiper";
