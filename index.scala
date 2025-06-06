//> using scala "3.7.0"
//> using dep "com.lihaoyi::scalatags:0.13.1"

import scalatags.Text.all.*
import scalatags.Text.tags2.{title, style, section}

val inscriptionLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSeu8ZHdog42LRXl4MPZAsOylifXWIY00o5mtw3Q987Q9G6cZA/viewform"

val inscriptionLabel =
  "S’inscrire pour 2025-26"

val contactMail = "contact@asso-triple-a.org"

val aHrefFFA = a(
  href := "https://www.ffa-aero.fr/FR/Federation_Aeronautique.awp"
)("Fédération Française Aéronautique")

object BIAWebsite {
  def main(_args: Array[String]): Unit = {
    val pageHtml = "<!DOCTYPE html>" + html(
      head(
        title("BIA par Aérien Ambassadeurs Avenir (Triple A)"),
        link(
          rel := "icon",
          tpe := "image/x-icon",
          href := "/images/favicon.ico"
        ),
        meta(charset := "utf-8"),
        meta(
          name := "viewport",
          content := "width=device-width, initial-scale=1, user-scalable=no"
        ),
        link(rel := "stylesheet", href := "assets/css/main.css"),
        link(rel := "icon", href := "images/logo.svg")
      ),
      body(
        cls := "homepage is-preload",
        div(
          id := "page-wrapper",
          // Navigation
          div(
            id := "nav",
            a(href := "#")(
              img(
                src := "images/logo-white.svg",
                alt := "logo",
                cls := "nav-logo"
              )
            ),
            ul(cls := "nav-list")(
              li(
                cls := "nav-not-essential nav-item",
                a(href := "#")("Accueil")
              ),
              li(cls := "nav-item")(a(href := "#highlights")("Le BIA")),
              li(cls := "nav-item")(a(href := "#features")("Les cours")),
              li(
                cls := "nav-not-essential nav-item",
                a(href := "#intro")("Nous connaitre")
              ),
              li(
                cls := "nav-not-essential nav-item",
                a(href := "#footer")("Devenir volontaire")
              )
            ),
            a(cls := "nav-inscription-link", href := inscriptionLink)(
              inscriptionLabel
            )
          ),

          // Header
          section(
            id := "header",
            cls := "wrapper",
            div(id := "logo")(
              h1(
                "cours du BIA à distance par visioconférence, gratuit, pour tous"
              ),
              p("Par l’association Aérien Ambassadeurs Avenir")
            )
          ),

          // Highlights
          section(
            id := "highlights",
            cls := "wrapper style3",
            div(cls := "title", "Le BIA"),
            div(
              cls := "container",
              p(
                cls := "style1",
                "Le ",
                strong("Brevet d’Initiation Aéronautique"),
                " (BIA) est :"
              ),
              ul(
                li(
                  "le tout premier brevet théorique sur le thème de l’aéronautique"
                ),
                li("un diplôme de l’éducation nationale"),
                li(
                  "à partir de 13 ans à la date de l'examen (début juin) et sans limite d'âge"
                ),
                li(
                  "valide un niveau d’initiation à la culture scientifique et technique dans le domaine de l’aéronautique et du spatial"
                ),
                li(
                  "est reconnu par les ",
                  a(href := "https://cnfas.fr")(
                    "différentes fédérations aéronautiques"
                  ),
                  "."
                )
              ),
              p(
                cls := "style1",
                "L’examen est un QCM de ",
                strong("2h30"),
                ", prévu entre fin mai et début juin. Il y a 20 questions par matière, soit 100 QCM au total, environ 30 minutes par chapitre. ",
                br,
                "Une ",
                strong("épreuve facultative d’anglais aéronautique"),
                ", dont seuls les points supérieurs à 10 sont comptés, est proposée.",
                br,
                "La note moyenne de chaque candidat est calculée en divisant par cinq la somme des points obtenus."
              ),
              // The 5 topics of BIA
              div(
                cls := "row aln-center",
                topic(
                  "Connaissance des aéronefs",
                  "images/aeronefs.png",
                  "Découverte des différents aéronefs ! Etude des parties d’un avion, explication des différents types de moteurs, ainsi que des différents instruments que l’on retrouve dans un cockpit."
                ),
                topic(
                  "Aérodynamique et principes du vol",
                  "images/aerodynamic.jpeg",
                  "Initiation à la mécanique du vol, découverte des différentes forces qui impactent un aéronef. Les attendus sont qualitatifs, il n’y a pas d’équations à résoudre."
                ),
                topic(
                  "Météorologie",
                  "images/meteo.jpg",
                  "Etude des phénomènes météo ! L’atmosphère, les différents types de nuages, précipitations, mais aussi découverte des fronts, masses d’air, et initiation à la circulation générale atmosphérique."
                )
              ),
              div(
                cls := "row aln-center",
                topic(
                  "Réglementation, sécurité des vols, navigation",
                  "images/nav.jpg",
                  "Découverte des organisations qui gèrent la réglementation et la gestion de l’espace aérien. Description des facteurs contributifs aux incidents/accidents. Etude des différents moyens de navigation. Préparation d’une navigation en vol d’aéroclub."
                ),
                topic(
                  "Histoire de l’aéronautique et du spatial",
                  "images/histoire.jpeg",
                  "Etude chronologique des faits marquants de l’histoire de l’aviation, du mythe d’Icare à nos jours, en passant par les avancées militaires et les pionniers du XXème siècle. La conquête spatiale est aussi au programme."
                )
              ),
              inscriptionButton
            )
          ),

          // Main
          section(
            id := "main",
            cls := "wrapper style2",
            div(cls := "title", "Les cours"),
            div(
              cls := "container",
              div(
                cls := "image featured",
                img(src := "images/laptop-throttle.png", alt := "")
              ),
              section(
                id := "features",
                header(
                  cls := "style1",
                  p(
                    "Les cours sont donnés en ",
                    strong("visioconférence"),
                    " à partir du mois ",
                    strong("d’octobre"),
                    " jusqu’à ",
                    strong("la date de l’examen"),
                    ", suivant les ",
                    strong("périodes scolaires"),
                    " de la ",
                    strong("zone C"),
                    " (Paris). Durant les vacances scolaires ",
                    "des cours de révisions peuvent être proposés."
                  )
                ),
                ul(
                  li(
                    "Le format en visioconférence permet de suivre les cours dans le monde entier"
                  ),
                  li(
                    "Nos professeurs, directement issus du secteur aérien, peuvent aider pour l'orientation professionnelle"
                  ),
                  li(
                    "Notre site d'annales mis à disposition, pour bien se préparer à l'examen"
                  ),
                  li(
                    "Notre partenariat avec la ",
                    aHrefFFA,
                    " afin de potentiellement bénéficier d'une subvention pour un vol d'initiation"
                  ),
                  li(
                    "Nos cours adaptés à tous les profils : accessible aux plus jeunes, et possédant des encarts \"Pour aller plus loin\" pour les plus avertis"
                  ),
                  li(
                    "Nous avons eu à coeur de distiller du contenu environnemental dans nos cours : nous évoquons en toute transparence l'impact environnemental de l'aérien et du spatial tout en soulignant les solutions déjà mises en place ainsi que les perspectives futures"
                  )
                ),
                div(
                  cls := "feature-list",
                  div(
                    cls := "row",
                    div(
                      cls := "col-6 col-12-medium",
                      section(
                        h3(cls := "icon solid fa-plane", "Créneau du mercredi"),
                        p("De 17h30 à 19h30")
                      )
                    ),
                    div(
                      cls := "col-6 col-12-medium",
                      section(
                        h3(cls := "icon solid fa-plane", "Créneau du samedi"),
                        p("De 10h à 12h")
                      )
                    )
                  )
                ),
                inscriptionButton
              )
            )
          ),

          // Intro
          section(
            id := "intro",
            cls := "wrapper style1",
            div(cls := "title", "Nous connaitre"),
            div(
              cls := "container",
              p(
                cls := "style3",
                "Créée en décembre 2020, ",
                a(
                  href := "https://www.journal-officiel.gouv.fr/pages/associations-detail-annonce/?q.id=id:202100021965"
                )("notre association loi 1901"),
                " « Aérien Ambassadeurs Avenir » a pour objectifs de partager notre passion pour l'aéronautique avec la jeunesse, les passionnés de demain, de susciter des vocations et de développer une conscience environnementale. Voici notre histoire :",
                br,
                br,
                "En 2020, alors que la France se confine, la compagnie Air France souhaite proposer aux enfants de ses salariés des cours en ligne pour se former au Brevet d’Initiation Aéronautique.",
                br,
                br,
                "Répondant à cet appel, l’association « Aérien Ambassadeurs Avenir », dite « Triple A » est créée, se composant à la fois d’employés d’Air France, de Cadets Air France, et d'Elèves Pilotes de Ligne (EPL) de l’ENAC. Cette opération est un grand succès puisque plus de 900 élèves sont formés sur 2 ans.",
                br,
                br,
                "En 2022, l’association prend son indépendance pour s’ouvrir à tous, jeunes et moins jeunes, leur permettant ainsi d’obtenir un premier diplôme aéronautique reconnu par l’Etat.",
                br,
                "Le profil des professeurs bénévoles s’est aussi diversifié comprenant des pilotes de multiples compagnies, mais aussi personnels navigants de cabine, ingénieurs, dispatcheurs, instructeurs planeur, et d’autres ! Tous nos enseignants bénévoles mettent ainsi à profit leurs diverses expériences au service des élèves pour leur transmettre leur passion.",
                br,
                "En parallèle des cours de BIA, notre association se diversifie, notamment au travers de partenariats avec l'association ",
                a(
                  href := "https://unmorceaudecielbleu.wixsite.com/unmorceaudecielbleu"
                )("Un morceau de ciel bleu"),
                ", avec ",
                a(href := "https://www.ecole-air-espace.fr")(
                  "l'Ecole de l'air et de l'espace"
                ),
                " ou encore avec la ",
                aHrefFFA,
                ". Notre association, pleine d'ambition, n'est encore qu'au tout début de son histoire !"
              )
            )
          ),

          // Footer
          section(
            id := "footer",
            cls := "wrapper",
            div(cls := "title", "Devenir volontaire"),
            div(
              cls := "container",
              header(
                cls := "style1",
                h2("Envie de devenir professeur bénévole ?"),
                p(
                  "Quel que soit votre domaine d’activité, si vous souhaitez partager votre passion pour l’aéronautique, vous êtes le bienvenu !",
                  br,
                  br,
                  "Nous proposons un ",
                  strong("programme adaptable"),
                  " à vos disponibilités, et de ",
                  strong("nombreuses facilités"),
                  " pour alléger la préparation des cours.",
                  br,
                  br,
                  a(href := s"mailto:$contactMail")(
                    "N’hésitez pas à nous contacter pour de plus amples informations !"
                  )
                )
              ),
              section(
                cls := "feature-list small",
                div(
                  cls := "row",
                  div(
                    cls := "col-6 col-12-small",
                    section(
                      cls := "no-top-line",
                      h3(cls := "icon solid fa-envelope", "Email"),
                      p(a(href := s"mailto:$contactMail")(contactMail))
                    )
                  ),
                  div(
                    cls := "col-6 col-12-small",
                    section(
                      h3(cls := "icon solid fa-comment", "Réseaux sociaux"),
                      p(
                        "Instagram ",
                        a(
                          href := "https://www.instagram.com/aerien_ambassadeurs_avenir"
                        )("@aerien_ambassadeurs_avenir"),
                        br,
                        "LinkedIn ",
                        a(
                          href := "https://www.linkedin.com/company/aerien-ambassadeurs-avenir"
                        )("aerien-ambassadeurs-avenir")
                      )
                    )
                  )
                )
              ),
              div(
                id := "copyright",
                ul(
                  li("© Solal LORCY, CCA 3.0"),
                  li("Design: ", a(href := "http://html5up.net")("HTML5 UP")),
                  li(
                    a(href := "https://github.com/Villemarque/bia-poc")(
                      "Source code"
                    )
                  )
                )
              )
            )
          )
        )
      )
    ).render

    println(pageHtml)
  }

  // TODO, refactor SCSS so that it can really a button, and without the need of ul, li container
  private def inscriptionButton =
    ul(
      cls := "actions special",
      li(
        a(
          href := inscriptionLink,
          cls := "button style1 large",
          inscriptionLabel
        )
      )
    )

  private def topic(
      title: String,
      imgPath: String,
      description: String
  ): Frag = {
    div(
      cls := "col-4 col-12-medium",
      section(
        cls := "highlight",
        img(src := imgPath, cls := "image featured", alt := ""),
        h3(title),
        p(description)
      )
    )
  }
}
