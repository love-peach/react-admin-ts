import React, { CSSProperties, FC } from "react";
import classnames from "classnames";

import "./index.scss";
interface IProps {
    style?: CSSProperties;
    className?: string;
    title?: string;
}
const Panel: FC<IProps> = ({ style, className, title, children }) => {
    return (
        <div className={classnames("comp-panel", className)} style={style}>
            {!!title && <div className="comp-panel__title">{title}</div>}
            <div className="comp-panel__content">{children}</div>
        </div>
    );
};

export default Panel;
