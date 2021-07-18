import React from 'react';

interface PageProps {}
interface PageState {}

export default class AgentMgCreate extends React.Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render(): JSX.Element {
        return <div>代理商创建</div>;
    }
}
