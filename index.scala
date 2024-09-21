//> using scala "3.5.0"
//> using dep "com.lihaoyi::scalatags:0.13.1"

import scalatags.Text.all._
import scalatags.Text.tags2.{title, style, section}

val inscriptionLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSdFUCkiHjYpZ714cT6zaPTPSlPBZNL_CmDl9eFY2xCnag6KLQ/viewform"

val contactMail = "contact@asso-triple-a.org"

object BIAWebsite {
  def main(_args: Array[String]): Unit = {
    val pageHtml = "<!DOCTYPE html>" + html(
      head(
        title("BIA par Triple A"),
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
            img(
              src := "images/logo-white.svg",
              alt := "logo",
              cls := "nav-logo"
            ),
            ul(
              li(cls := "nav-not-essential", a(href := "#")("Accueil")),
              li(a(href := "#highlights")("Le BIA")),
              li(a(href := "#features")("Les cours")),
              li(
                cls := "nav-not-essential",
                a(href := "#intro")("Nous connaitre")
              ),
              li(
                strong(
                  a(href := inscriptionLink)("S’incrire")
                )
              ),
              li(
                cls := "nav-not-essential",
                a(href := "#footer")("Devenir volontaire")
              )
            )
          ),

          // Header
          section(
            id := "header",
            cls := "wrapper",
            div(
              id := "logo",
              h1(
                a(href := "index.html")(
                  "cours du BIA en visio, gratuit, pour tous"
                )
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
                  "à partir de 13 ans à la date de l'examen puis sans limite d'âge"
                ),
                li(
                  "valide un niveau d’initiation à la culture scientifique et technique dans le domaine de l’aéronautique et du spatial ;"
                ),
                li(
                  "et est reconnu par les différentes fédérations aéronautiques."
                )
              ),
              p(
                cls := "style1",
                "L’examen est un QCM de ",
                strong("2h30"),
                ", prévue entre fin mai et début juin. Il y a 20 questions par matière, soit 100 QCM au total, environ 30 minutes par chapitre. ",
                br,
                "Une ",
                strong("épreuve facultative d’anglais aéronautique"),
                " dont seuls les points supérieurs à 10 sont comptés. ",
                br,
                "La note moyenne de chaque candidat est calculée en divisant par cinq la somme des points obtenus."
              ),
              // The 5 topics of BIA
              div(
                cls := "row aln-center",
                topic(
                  "Connaissance des aéronefs",
                  "images/aeronefs.png",
                  "Découverte des différents aéronefs qui existent ! Etude des parties d’un avion, explication des différents types de moteurs, ainsi que des différents instruments que l’on retrouve dans un cockpit."
                ),
                topic(
                  "Aérodynamique et principes du vol",
                  "images/aerodynamic.jpeg",
                  "Initiation à la mécanique du vol, découverte des différentes forces qui impactent un aéronef. Les attendus sont qualitatifs, il n’y a pas d’équations à résoudre."
                ),
                topic(
                  "Météorologie",
                  "images/meteo.jpg",
                  "Etude des phénomènes météo ! L’atmosphère, les différents type de nuages, précipitation, mais aussi découverte des fronts, masses d’air, et initiation à la circulation générale atmosphérique."
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
                    strong("visioconférences"),
                    " à partir du mois ",
                    strong("d’octobre"),
                    " jusqu’à ",
                    strong("la date de l’examen"),
                    ", suivant les ",
                    strong("périodes scolaires"),
                    " de la ",
                    strong("zone A"),
                    " (Paris). Durant les vacances scolaires ",
                    "des cours de révisions peuvent être proposés."
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
                "Créée en décembre 2020, notre assocation « Aérien Ambassadeurs Avenir » a pour objectifs de partager notre passion pour l'aéronautique avec la jeunesse, les passionnés de demain, de susciter des vocations et de développer une conscience environnementale juste. Voici notre histoire :",
                br,
                br,
                "Alors que la France se confine, la compagnie Air France souhaite proposer aux enfants de ses salariés des cours en ligne pour se former au Brevet d’Initiation Aéronautique.",
                br,
                br,
                "Répondant à cet appel, l’association « Aérien Ambassadeurs Avenir », dite « Triple A » est créée, se composant à la fois d’employés d’Air France, de Cadets Air France, et d'Elèves Pilotes de Ligne (EPL) de l’ENAC. Cette opération est un grand succès puisque plus de 900 élèves sont formés sur 2 ans.",
                br,
                br,
                "En 2022, l’association prend son indépendance pour s’ouvrir à tous, jeunes et moins jeunes, leur permettant ainsi d’obtenir un premier diplôme aéronautique reconnu par l’Etat.",
                br,
                "Le profil des professeurs bénévoles s’est aussi diversifié comprenant des pilotes de multiples compagnies, mais aussi personnels navigants de cabine, ingénieurs, dispatcheurs, instructeurs planeur, et d’autres ! Tous nos enseignants bénévoles mettent ainsi à profit leurs diverses expériences au service des élèves pour leur transmettre notre passion.",
                br,
                "En parallèle des cours de BIA, notre association se diversifie, notamment au travers de partenariats avec l'association Un morceau de ciel bleu, avec l'Ecole de l'air et de l'espace ou encore avec la FFA. Notre association, pleine d'ambition n'est encore qu'au tout début de son histoire !"
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
                  "Quelque soit votre domaine d’activité, si vous souhaitez partager votre passion pour l’aéronautique, vous êtes le bienvenu !",
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
                    cls := "col-3 col-6-medium col-12-small",
                    section(
                      h3(cls := "icon solid fa-home", "Mailing Address"),
                      p(
                        "Untitled Corp",
                        br,
                        "1234 Somewhere Rd",
                        br,
                        "Nashville, TN 00000"
                      )
                    )
                  ),
                  div(
                    cls := "col-3 col-6-medium col-12-small",
                    section(
                      h3(cls := "icon solid fa-comment", "Social"),
                      p(
                        a(href := "#")("@untitled-corp"),
                        br,
                        a(href := "#")("linkedin.com/untitled"),
                        br,
                        a(href := "#")("facebook.com/untitled")
                      )
                    )
                  ),
                  div(
                    cls := "col-3 col-6-medium col-12-small",
                    section(
                      cls := "no-top-line",
                      h3(cls := "icon solid fa-envelope", "Email"),
                      p(a(href := s"mailto:$contactMail")(contactMail))
                    )
                  ),
                  div(
                    cls := "col-3 col-6-medium col-12-small",
                    section(
                      cls := "no-top-line",
                      h3(cls := "icon solid fa-phone", "Phone"),
                      p("(000) 555-0000")
                    )
                  )
                )
              ),
              div(
                id := "copyright",
                ul(
                  li("© Solal LORCY."),
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
          "S’inscrire"
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
