import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './Image.scss';

const Image = ({ src, alt, onClick }) => (
  <span className="image-wrapper" onClick={onClick}>
    <LazyLoadImage
      src={src}
      alt={alt}
      width={'100%'}
      height={'100%'}
      effect="blur"
      style={{ display: 'flex', objectFit: 'cover' }}
    />
  </span>
);

export default Image;
