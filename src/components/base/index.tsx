import * as React from 'react';
import { match, RouteProps, withRouter } from 'react-router-dom';
import { History, Location } from 'history';
import classnames from 'classnames';
import { queryToJson } from '@utils/url';

interface ClassDictionary {
    [id: string]: boolean | undefined | null;
}
type ClassArray = Array<ClassValue>;
type ClassValue =
    | string
    | number
    | ClassDictionary
    | ClassArray
    | undefined
    | null
    | boolean;
export interface BaseProps {
    route?: any;
    match?: match<any>;
    history?: History;
    location?: Location;
    className?: string;
    style?: React.CSSProperties;
}

export default abstract class Base<
    TProps = {},
    TState = {}
> extends React.Component<TProps & BaseProps, TState> {
    // state: TState;

    get queryParams() {
        return queryToJson();
    }

    classNames(...args: Array<ClassValue>) {
        return classnames(args);
    }

    className(...args: Array<ClassValue>) {
        return this.classNames.apply(this, args.concat([this.props.className]));
    }

    style(args?: React.CSSProperties) {
        return Object.assign({}, args, this.props.style);
    }

    shouldComponentUpdate(nextProps = {}, nextState = {}) {
        // const thisProps = this.props || {};
        // const thisState = this.state || {};

        // if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
        //     Object.keys(thisState).length !== Object.keys(nextState).length) {
        //     return true;
        // }

        // for (const key in nextProps) {
        //     if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
        //         return true;
        //     }
        // }

        // for (const key in nextState) {
        //     if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
        //         return true;
        //     }
        // }
        // TODO 待整体immutable改造
        return true;
    }
}
