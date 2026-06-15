export interface NavLink {
  label: string;
  href: string;
}

export interface Pillar {
  id: string;
  label: string;
  title: string;
  abbr: string;
  image: string;
  color: string;
  description: string;
  stats: { value: string; label: string }[];
}
