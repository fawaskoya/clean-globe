export interface NavLink {
  name: string;
  href: string;
  children?: NavLink[];
}

export const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "Who we are",
    href: "/about",
    children: [
      { name: "Mission / Vision", href: "/about/mission-vision" },
      { name: "About us", href: "/about" },
      { name: "Advisory board", href: "/about/advisory-board" },
    ],
  },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "ESG Advisory", href: "/services/esg-advisory" },
      { name: "Sustainability Advisory", href: "/services/sustainability-advisory" },
      { name: "Energy Advisory", href: "/services/energy-advisory" },
      { name: "Climate Change Advisory", href: "/services/climate-change-advisory" },
      { name: "Net Zero Advisory", href: "/services/net-zero-advisory" },
    ],
  },
  { name: "Projects", href: "/projects" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

