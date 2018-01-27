/// <reference types="react" />
import React from 'react';
export declare type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
/**
 * Displays an image that is animated in when loaded following the
 * [loading images pattern](https://material.io/guidelines/patterns/loading-images.html).
 */
export declare class Image extends React.Component<ImageProps, {
    loaded: false;
}> {
    render(): JSX.Element;
}
