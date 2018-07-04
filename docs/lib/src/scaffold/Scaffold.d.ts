/// <reference types="react" />
import { History, Location } from 'history';
import { StyledComponentProps } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { Action } from '../Actions';
import { ScaffoldContext, Section } from './context';
export declare type ScaffoldProps = {
    appName: string;
    drawer?: ReactNode;
};
export declare type PrivateScaffoldProps = ScaffoldProps & StyledComponentProps<'docked' | 'drawerPaper' | 'navIconHide' | 'appBar'> & {
    location: Location;
    history: History;
};
export declare type State = {
    sections: Array<Section>;
    contextActions?: Array<Action>;
    drawerOpen: boolean;
};
export declare class ScaffoldView extends React.Component<PrivateScaffoldProps, State> {
    static childContextTypes: {
        activeSection?: ((object: ScaffoldContext, key: string, componentName: string, ...rest: any[]) => Error | null) | undefined;
        pushSection?: ((object: ScaffoldContext, key: string, componentName: string, ...rest: any[]) => Error | null) | undefined;
        popSection?: ((object: ScaffoldContext, key: string, componentName: string, ...rest: any[]) => Error | null) | undefined;
        replaceSection?: ((object: ScaffoldContext, key: string, componentName: string, ...rest: any[]) => Error | null) | undefined;
        setContextActions?: ((object: ScaffoldContext, key: string, componentName: string, ...rest: any[]) => Error | null) | undefined;
        clearContextActions?: ((object: ScaffoldContext, key: string, componentName: string, ...rest: any[]) => Error | null) | undefined;
    };
    context: ScaffoldContext;
    state: State;
    readonly activeSection: Section;
    readonly currentUrl: string | undefined;
    back: () => void;
    pushSection: (section: Section) => void;
    popSection: (title?: string | undefined) => void;
    replaceSection: (newSection: Section, oldTitle?: string | undefined) => void;
    handleDrawerToggle: () => void;
    getChildContext(): ScaffoldContext;
    render(): JSX.Element;
}
/**
 * A component to help you manage the application level
 * toolbar while still keeping logic cleanly seperated.
 * It also help with managing the history so that the back
 * button works as expected.
 */
export declare const Scaffold: React.ComponentClass<ScaffoldProps>;
