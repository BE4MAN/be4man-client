import React from 'react';

import { useIsIOSSafari } from '@/hooks/useIsIOSSafari';

export default function SafeSvg({
  src,
  alt = '',
  width = 120,
  height = 60,
  className,
  style,
  imgProps = {},
  objectProps = {},
}) {
  const isIOSSafari = useIsIOSSafari();

  const w = Number(width);
  const h = Number(height);

  if (isIOSSafari) {
    return (
      <object
        type="image/svg+xml"
        data={src}
        aria-label={alt || undefined}
        role={alt ? 'img' : undefined}
        className={className}
        style={style}
        width={w}
        height={h}
        {...objectProps}
      >
        <img src={src} alt={alt} width={w} height={h} {...imgProps} />
      </object>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      className={className}
      style={style}
      {...imgProps}
    />
  );
}
