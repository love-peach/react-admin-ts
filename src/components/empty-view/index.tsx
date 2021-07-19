import './index.scss';

import React from 'react';

import classnames from 'classnames';

interface Props {
    text?: string;
    image?: string;
}

export class EmptyView extends React.Component<Props> {
    render(): React.ReactNode {
        const { text = '暂无数据' } = this.props;
        return (
            <div className={classnames('component-no-data')}>
                <img
                    className="component-no-data-img"
                    src="https://img13.360buyimg.com/imagetools/jfs/t1/154634/15/6103/63766/5fb250f7E19df53b8/5bdf5b233bfff69e.png"></img>
                <div className="component-no-data-des">{text}</div>
            </div>
        );
    }
}
