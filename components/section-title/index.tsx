import {memo, ReactElement } from "react";
import type { FC } from "react";
import styles from "./index.module.scss"
export interface IProps {
    children?: ReactElement;
    title?: string;
}


const SectionTitle: FC<IProps> =memo(function(props) {
    const { children,title } = props;
    return (
        <div className={styles["section-title"]}>{title}</div>
    );
}) ;

export default SectionTitle;
SectionTitle.displayName ="SectionTitle";
