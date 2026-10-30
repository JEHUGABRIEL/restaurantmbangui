import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 9 7 7 7-7" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.3 3.5h-2A1.8 1.8 0 0 0 2.5 5.3c0 8.6 8.2 16.8 16.8 16.8a1.8 1.8 0 0 0 1.8-1.8v-2a1.8 1.8 0 0 0-1.5-1.8l-2.3-.4a1.8 1.8 0 0 0-1.7.6l-1 1.2a14.6 14.6 0 0 1-6.6-6.6l1.2-1a1.8 1.8 0 0 0 .6-1.7l-.4-2.3a1.8 1.8 0 0 0-1.7-1.5Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 7.3 5.4a2 2 0 0 0 2.4 0L20.5 7" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 10.4c0 5.4-8 11.1-8 11.1s-8-5.7-8-11.1a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.2" r="2.8" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" />
    </svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18M8 14h2M14 14h2M8 17h2" />
    </svg>
  );
}

export function Utensils(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 3v7a3 3 0 0 0 6 0V3M7 10v11M17 3c-1.7 1.5-2.5 3.5-2.5 6.5 0 2 .8 3 2.5 3.2V21M17 3v9.7" />
    </svg>
  );
}

export function Pizza(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.8 21.5 20a1 1 0 0 1-1.3 1.4A24 24 0 0 1 12 22a24 24 0 0 1-8.2-.6A1 1 0 0 1 2.5 20L12 2.8Z" />
      <path d="M8 10.5c2.6-1 5.4-1 8 0M11 15.2c.7-.3 1.3-.3 2 0" />
      <circle cx="12" cy="5.5" r=".4" />
    </svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z" />
      <path d="M4 20c3.5-6 7.5-9 12-11" />
    </svg>
  );
}

export function Cake(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 10.5h16V20H4zM3 20h18M5.5 10.5V7.8c0-1 1-1.8 2.2-1.8s2.1.8 2.1 1.8v2.7M14.2 10.5V7.8c0-1 1-1.8 2.2-1.8s2.1.8 2.1 1.8v2.7" />
      <path d="M12 6V3.5M12 9.5h.01" />
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 4h2.2l2.2 10.4A1.8 1.8 0 0 0 9.2 16h8.6a1.8 1.8 0 0 0 1.8-1.5L21 8H6" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.83c0 1.94.56 3.75 1.54 5.28L2 22l5.03-1.7a9.86 9.86 0 0 0 5.01 1.36h.01c5.43 0 9.84-4.4 9.84-9.83a9.78 9.78 0 0 0-2.88-6.95A9.78 9.78 0 0 0 12.04 2Zm0 17.96h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1 1.05 1.04-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.35c0-4.5 3.67-8.17 8.18-8.17 2.18 0 4.23.85 5.77 2.4a8.12 8.12 0 0 1 2.39 5.78c0 4.51-3.67 8.17-8.18 8.17Zm4.49-6.12c-.25-.12-1.46-.72-1.68-.8-.23-.09-.4-.13-.56.12-.17.25-.65.8-.8.97-.15.16-.3.18-.55.06-.25-.13-1.04-.39-1.98-1.23-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.01-.39.11-.51.11-.11.25-.3.37-.45.13-.15.17-.25.25-.42.09-.17.05-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.44.06-.67.3-.23.26-.88.87-.88 2.11 0 1.25.9 2.45 1.03 2.62.12.16 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.59.1.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function Facebook(props: IconProps) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M14.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.25-1.55 1.6-1.55h1.65V3.4a22 22 0 0 0-2.4-.12c-2.4 0-4.05 1.46-4.05 4.15v2.37H8.5V13h2.8v8h3.2Z" />
    </svg>
  );
}
