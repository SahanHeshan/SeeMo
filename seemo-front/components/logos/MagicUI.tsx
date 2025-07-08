import { SVGProps } from 'react';

export default function BlockfrostLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Blockfrost</title>
      <rect width="512" height="512" rx="20" fill="#1C1C1E" />
      <circle cx="130" cy="130" r="25" fill="#4E47F4" />
      <circle cx="256" cy="130" r="25" fill="#4E47F4" />
      <circle cx="382" cy="130" r="25" fill="#4E47F4" />
      <circle cx="130" cy="256" r="25" fill="#4E47F4" />
      <circle cx="256" cy="256" r="25" fill="#4E47F4" />
      <circle cx="382" cy="256" r="25" fill="#4E47F4" />
      <circle cx="130" cy="382" r="25" fill="#4E47F4" />
      <circle cx="256" cy="382" r="25" fill="#4E47F4" />
      <circle cx="382" cy="382" r="25" fill="#4E47F4" />
    </svg>
  );
}
