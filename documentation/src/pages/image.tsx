import * as React from 'react'
import {Image, Section} from 'react-material-app'

module.exports = () => (
  <div>
    <Section title="Image" />
    <Image
      src="https://c1.staticflickr.com/8/7750/17378251482_b7eeef9e17_k.jpg"
      style={{width: 400, height: 200}}
    />
  </div>
)
