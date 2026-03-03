export const SITE_CONFIG = {
  name: "L3B Construction & Rénovation",
  shortName: "L3B",
  description:
    "L3B Construction & Rénovation, société spécialisée en gros œuvre, construction et rénovation en Île-de-France. Pégase, notre branche nettoyage professionnel.",
  url: "https://www.l3b-construction.fr",
  slogan: "Construisons ensemble pour un avenir plus serein et plus durable.",
  phone: "+33 1 00 00 00 00",
  email: "contact@l3b-construction.fr",
  address: {
    street: "156 Chemin Royal",
    city: "Linas",
    postalCode: "91310",
    region: "Île-de-France",
    country: "France",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/l3b-construction-rénovation",
  },
  siret: "891 992 919 00011",
  founded: 2020,
} as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Construction", href: "/construction" },
  { label: "Nettoyage", href: "/nettoyage" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES_CONSTRUCTION = [
  {
    title: "Gros Œuvre",
    description:
      "Terrassement, fondations, structures béton armé, dalles et planchers. Notre cœur de métier depuis la création de L3B.",
    icon: "building" as const,
  },
  {
    title: "Rénovation",
    description:
      "Renforcement structurel, réhabilitation de bâtiments existants, mise aux normes et transformation d'espaces.",
    icon: "hammer" as const,
  },
  {
    title: "Maîtrise d'Œuvre",
    description:
      "Coordination et pilotage de chantiers, gestion de projet de la conception à la livraison.",
    icon: "clipboard" as const,
  },
  {
    title: "Béton Armé",
    description:
      "Dalles de compression, murs de soutènement, cages d'ascenseur, longrines et ouvrages spéciaux en béton.",
    icon: "layers" as const,
  },
] as const;

export const SERVICES_NETTOYAGE = [
  {
    title: "Nettoyage Fin de Chantier",
    description:
      "Remise en état complète après travaux : dépoussiérage, nettoyage des surfaces, évacuation des déchets.",
    icon: "sparkles" as const,
  },
  {
    title: "Nettoyage Industriel",
    description:
      "Entretien et nettoyage de locaux industriels, entrepôts et sites de production.",
    icon: "factory" as const,
  },
  {
    title: "Entretien de Bureaux",
    description:
      "Nettoyage régulier de bureaux et espaces professionnels pour un environnement de travail impeccable.",
    icon: "briefcase" as const,
  },
  {
    title: "Nettoyage de Copropriétés",
    description:
      "Entretien des parties communes, halls d'entrée, escaliers et espaces partagés.",
    icon: "home" as const,
  },
] as const;

export const KEY_FIGURES = [
  { value: 5, suffix: "+", label: "Années d'expérience" },
  { value: 50, suffix: "+", label: "Projets réalisés" },
  { value: 100, suffix: "%", label: "Clients satisfaits" },
  { value: 9, suffix: "", label: "Collaborateurs" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Groupe ADF",
    role: "Maître d'ouvrage",
    content:
      "L3B a su relever le défi technique de notre projet à Collégien avec une réactivité exemplaire. Qualité et délais respectés.",
    rating: 5,
  },
  {
    name: "Lidl France",
    role: "Client",
    content:
      "Inauguration réussie de notre magasin au Centre Bourse de Marseille grâce au travail remarquable de L3B sur le renforcement structurel.",
    rating: 5,
  },
  {
    name: "Transdev IDF",
    role: "Donneur d'ordre",
    content:
      "Une dalle béton livrée en 4 jours. L3B a démontré une capacité d'exécution impressionnante sans compromis sur la qualité.",
    rating: 5,
  },
] as const;
