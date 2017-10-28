import React from 'react'

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export class Image extends React.Component<ImageProps, {loaded: false}> {
  render() {
    return <img {...this.props} />
  }
}
