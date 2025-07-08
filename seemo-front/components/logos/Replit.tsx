import { SVGProps } from 'react';

export default function LaceWalletLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 160 160"
      {...props}
    >
      <title>Lace Wallet</title>
      <defs>
        <linearGradient id="laceGradient" x1="80" y1="0" x2="80" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4E47F4" />
          <stop offset="1" stopColor="#9159E5" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r="80" fill="url(#laceGradient)" />
      <path fill="#fff" d="M80 120l30-60H50l30 60z" />
    </svg>
  );
}
