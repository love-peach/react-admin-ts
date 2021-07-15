import React from 'react';

interface PageProps {}
interface PageState {}

export default class extends React.Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    handleDemo = () => {
        console.log(this, 'this');
    };

    render(): JSX.Element {
        return (
            <div className="page-login" onClick={this.handleDemo}>
                login
            </div>
        );
    }
}
