export type PublicNavigationLink = {
  href: string;
  label: string;
};

export const publicNavigationLinks = [
  {
    href: "/",
    label: "Início",
  },
  {
    href: "/produtos",
    label: "Atrações",
  },
  {
    href: "/fotografia",
    label: "Fotografia",
  },
  {
    href: "/por-que-contratar",
    label: "Por que contratar",
  },
  {
    href: "/representante-alugagames",
    label: "Representante",
  },
] satisfies PublicNavigationLink[];
