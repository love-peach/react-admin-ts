import './index.scss';
import React from 'react';

interface PageProps {}
interface PageState {}

export default class extends React.Component<PageProps, PageState> {
    constructor(props) {
        super(props);
    }

    render(): JSX.Element {
        return <div className="page-login">login</div>;
    }
}
