import './index.scss';
import React from 'react';

interface PageProps {}
interface PageState {}

export default class extends React.Component<PageProps, PageState> {
    constructor(props) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div className="page-index">
                <h1>fefe</h1>
                <input placeholder="1212" type="text"/>
            </div>
        );
    }
}
