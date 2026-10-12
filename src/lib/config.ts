import aerodynamic from "./assets/images/aerodynamic.jpeg?enhanced";
import aeronefs from "./assets/images/aeronefs.png?enhanced";
import histoire from "./assets/images/histoire.jpeg?enhanced";
import meteo from "./assets/images/meteo.jpg?enhanced";
import nav from "./assets/images/nav.jpg?enhanced";

export const inscriptionLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSc5vj9LeefOFBf5AahQAkX4ZHMTFl2YKQoUDF3pKAjEMQXFRQ/viewform";

export const inscriptionLabel = "Inscriptions 2026-27";

export const contactMail = "contact@asso-triple-a.org";

export const ffaUrl = "https://www.ffa-aero.fr/FR/Federation_Aeronautique.awp";

export const ffaLabel = "Fédération Française Aéronautique";

export const topics = [
  {
    title: "Connaissance des aéronefs",
    img: aeronefs,
    description:
      "Découverte des différents aéronefs ! Étude des parties d’un avion, explication des différents types de moteurs, ainsi que des différents instruments que l’on retrouve dans un cockpit.",
  },
  {
    title: "Aérodynamique et principes du vol",
    img: aerodynamic,
    description:
      "Initiation à la mécanique du vol, découverte des différentes forces qui impactent un aéronef. Les attendus sont qualitatifs, il n’y a pas d’équations à résoudre.",
  },
  {
    title: "Météorologie",
    img: meteo,
    description:
      "Étude des phénomènes météo ! L’atmosphère, les différents types de nuages, précipitations, mais aussi découverte des fronts, masses d’air, et initiation à la circulation générale atmosphérique.",
  },
  {
    title: "Réglementation, sécurité des vols, navigation",
    img: nav,
    description:
      "Découverte des organisations qui gèrent la réglementation et la gestion de l’espace aérien. Description des facteurs contributifs aux incidents/accidents. Étude des différents moyens de navigation. Préparation d’une navigation en vol d’aéroclub.",
  },
  {
    title: "Histoire de l’aéronautique et du spatial",
    img: histoire,
    description:
      "Étude chronologique des faits marquants de l’histoire de l’aviation, du mythe d’Icare à nos jours, en passant par les avancées militaires et les pionniers du XXème siècle. La conquête spatiale est aussi au programme.",
  },
];
