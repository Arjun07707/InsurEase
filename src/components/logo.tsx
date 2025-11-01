import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="200"
      height="50"
      aria-label="InsurEase Logo"
      {...props}
    >
      <g>
        <path
          d="M10 10 L10 40 L25 25 Z"
          className="fill-accent"
          transform="translate(5, 0)"
        />
        <text
          x="40"
          y="35"
          fontFamily="var(--font-headline), sans-serif"
          fontSize="30"
          fontWeight="bold"
          className="fill-foreground"
        >
          InsurEase
        </text>
      </g>
    </svg>
  );
}
