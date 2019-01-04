import {animationCurve} from 'material-definitions'
import React, {CSSProperties, useLayoutEffect, useState} from 'react'
import {fill} from 'style-definitions'

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  aspectRatio: number
  defer?: boolean
  duration?: number
  color?: string
  imgStyle?: CSSProperties
}

/**
 * Displays an image that is animated in when loaded following the
 * [loading images pattern](https://material.io/guidelines/patterns/loading-images.html).
 */
export const Image = ({
  srcSet,
  src,
  aspectRatio,
  defer,
  duration = 1000,
  color,
  style,
  imgStyle,
  ...props
}: ImageProps) => {
  const key = srcSet === undefined ? src : srcSet

  const [shouldRender, setShouldRender] = useState(defer || false)
  const [loadedKey, setLoadedKey] = useState<string | undefined>(undefined)

  if (defer) {
    useLayoutEffect(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldRender(true)
        })
      })
    }, [])
  }

  return (
    <div
      style={{
        position: 'relative',
        alignSelf: 'stretch',
        overflow: 'hidden',
        paddingTop: `${aspectRatio * 100}%`,
        height: 0,
        ...style,
      }}
    >
      {shouldRender && (
        <img
          {...props}
          onLoad={e => {
            setLoadedKey(key)
            if (props.onLoad) return props.onLoad(e)
          }}
          style={{
            ...fill(),
            backgroundColor: color,
            ...(loadedKey !== key
              ? {
                  filter: `saturate(0)`,
                  opacity: 0,
                }
              : undefined),
            transform: `opacity ${duration / 2}ms ${
              animationCurve.sharp
            }, filter ${duration}ms ${animationCurve.sharp}`,
            ...imgStyle,
          }}
        />
      )}
    </div>
  )
}
