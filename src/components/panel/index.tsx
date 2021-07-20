import './index.scss';

import React from 'react';
import classnames from 'classnames';

interface IProps {
    className?: string;
    contentPadding?: string;
}

class Panel extends React.Component<IProps> {
    render(): JSX.Element {
        const { className, contentPadding = '15px' } = this.props;

        return (
            <div className={classnames(className, 'panel-wrap')}>
                <div className="panel-content" style={{ padding: contentPadding }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Panel;
