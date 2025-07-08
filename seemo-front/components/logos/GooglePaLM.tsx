import { SVGProps } from 'react';

export default function CardanoLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" width="1em" height="1em" {...props}>
      <title>Cardano</title>
      <circle cx="128" cy="128" r="128" fill="#0033AD" />
      <g fill="#FFF">
        <circle cx="128" cy="128" r="24" />
        <circle cx="128" cy="64" r="16" />
        <circle cx="128" cy="192" r="16" />
        <circle cx="192" cy="128" r="16" />
        <circle cx="64" cy="128" r="16" />
        <circle cx="176" cy="176" r="12" />
        <circle cx="80" cy="80" r="12" />
        <circle cx="80" cy="176" r="12" />
        <circle cx="176" cy="80" r="12" />
      </g>
    </svg>
  );
}
