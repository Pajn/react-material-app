/// <reference types="react" />
import { ButtonProps } from '@material-ui/core/Button';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';
import React from 'react';
import { Omit } from './types';
export declare type ProgressButtonProps = Omit<ButtonProps, 'onClick'> & {
    loading?: boolean;
    timeout?: number;
    progressProps?: CircularProgressProps;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => any;
};
/**
 * Displays an material button that when clicked can display
 * a progress until an asyncronous action has compleated.
 */
export declare class ProgressButton extends React.Component<ProgressButtonProps, {
    isLoading: boolean;
}> {
    cancel?: () => void;
    state: {
        isLoading: boolean;
    };
    timeout: any;
    onClick: (e: any) => any;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
