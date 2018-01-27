/// <reference types="react" />
import * as React from 'react';
export declare const attributes: {
    title: string;
};
declare module 'material-ui/List' {
    interface ListItemProps {
        to?: string;
    }
}
export default class  extends React.Component<{}, {
    page?: string;
}> {
    render(): JSX.Element;
}
