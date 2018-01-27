import React from 'react'

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

/**
 * Displays an image that is animated in when loaded following the
 * [loading images pattern](https://material.io/guidelines/patterns/loading-images.html).
 */
export class Image extends React.Component<ImageProps, {loaded: false}> {
  render() {
    return <img {...this.props} />
  }
}
