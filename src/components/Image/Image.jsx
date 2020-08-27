import React from 'react';

import './Image.scss';

const Image = ({ src, alt, onClick }) => (
  <span className="image" onClick={onClick}>
    <img src={src} alt={alt} />
  </span>
);

export default Image;
