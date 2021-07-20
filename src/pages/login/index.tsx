import React from 'react';

interface PageProps {}
interface PageState {}

export default class Login extends React.Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render(): JSX.Element {
        return <div className="page-login">login</div>;
    }
}
