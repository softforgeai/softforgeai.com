export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { label: "AI Engineering & Automation", href: "/services#ai-engineering" },
      { label: "Custom Software", href: "/services#custom-software" },
      { label: "SaaS Development", href: "/services#saas-development" },
      { label: "Cloud & DevOps", href: "/services#cloud-devops" },
      { label: "AI Consulting", href: "/services#ai-consulting" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Our Work", href: "/work" },
      { label: "Process", href: "/#process" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
