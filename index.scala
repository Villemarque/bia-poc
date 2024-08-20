//> using scala "3.5.0"
//> using dep "com.lihaoyi::scalatags:0.13.1"

import scalatags.Text.all._
import scalatags.Text.tags2.{title, style, section}

object BIAWebsite {
  def main(args: Array[String]): Unit = {
    val pageHtml = html(
      head(
        title("BIA par Triple A"),
        meta(charset := "utf-8"),
        meta(name := "viewport", content := "width=device-width, initial-scale=1, user-scalable=no"),
        link(rel := "stylesheet", href := "assets/css/main.css"),
        link(rel := "icon", href := "images/logo.svg"),
      ),
      body(cls := "homepage is-preload",
        div(id := "page-wrapper",
          // Navigation
          div(id := "nav",
            img(src := "images/logo-white.svg", alt := "logo", cls := "nav-logo"),
            ul(
              li(cls := "nav-not-essential", a(href := "#")("Accueil")),
              li(a(href := "#highlights")("Le BIA")),
              li(a(href := "#features")("Les cours")),
              li(cls := "nav-not-essential", a(href := "#intro")("Nous connaitre")),
              li(strong(a(href := "https://docs.google.com/forms/d/e/1FAIpQLSdFUCkiHjYpZ714cT6zaPTPSlPBZNL_CmDl9eFY2xCnag6KLQ/viewform")("S'incrire"))),
              li(cls := "nav-not-essential", a(href := "#footer")("Devenir volontaire"))
            )
          ),

          // Header
          section(id := "header", cls := "wrapper",
            div(id := "logo",
              h1(a(href := "index.html")("cours du BIA en visio, gratuit, pour tous")),
              p("Par l'association Ambassadeur Aérien Avenir")
            )
          ),

          // Highlights
          section(id := "highlights", cls := "wrapper style3",
            div(cls := "title", "Le BIA"),
            div(cls := "container",
              p(cls := "style1",
                "Le ", strong("Brevet d'Initiation Aéronautique"), " (BIA) est :"
              ),
              ul(
                li("le tout premier brevet théorique sur le thème de l'aéronautique"),
                li("un diplôme de l'éducation nationale"),
                li("valide un niveau d'initiation à la culture scientifique et technique dans le domaine de l'aéronautique et du spatial ;"),
                li("et est reconnu par les différentes fédérations aéronautiques.")
              ),
              p(cls := "style1",
                "L'examen est un QCM de ", strong("2h30"), ", prévue entre fin mai et début juin. Il y a 20 questions par matière, soit 100 QCM au total, environ 30 minutes par chapitre. ",
                br,
                "Une ", strong("épreuve facultative d'anglais aéronautique"), " dont seuls les points supérieurs à 10 sont comptés. ",
                br,
                "La note moyenne de chaque candidat est calculée en divisant par cinq la somme des points obtenus."
              ),
              // The 5 topics of BIA
              div(cls := "row aln-center",
                div(cls := "col-4 col-6-medium col-12-small",
                  section(cls := "highlight",
                    a(href := "#", cls := "image featured",
                      img(src := "images/aeronefs.png", alt := "")
                    ),
                    h3("Aéronefs"),
                    p("Étude des différents types d'aéronefs, de leur structure et de leurs systèmes.")
                  )
                ),
                div(cls := "col-4 col-6-medium col-12-small",
                  section(cls := "highlight",
                    a(href := "#", cls := "image featured",
                      img(src := "images/aerodynamic.jpeg", alt := "")
                    ),
                    h3("Aérodynamique"),
                    p("Principes physiques du vol, forces agissant sur un aéronef et mécanique du vol.")
                  )
                ),
                div(cls := "col-4 col-6-medium col-12-small",
                  section(cls := "highlight",
                    a(href := "#", cls := "image featured",
                      img(src := "images/meteo.jpg", alt := "")
                    ),
                    h3("Météorologie"),
                    p("Phénomènes atmosphériques, prévisions météorologiques et leur impact sur le vol.")
                  )
                ),
                div(cls := "col-4 col-6-medium col-12-small",
                  section(cls := "highlight",
                    a(href := "#", cls := "image featured",
                      img(src := "images/nav.jpg", alt := "")
                    ),
                    h3("Navigation"),
                    p("Techniques de navigation aérienne, lecture de cartes et planification de vol.")
                  )
                ),
                div(cls := "col-4 col-6-medium col-12-small",
                  section(cls := "highlight",
                    a(href := "#", cls := "image featured",
                      img(src := "images/histoire.jpeg", alt := "")
                    ),
                    h3("Histoire"),
                    p("Histoire de l'aviation, des pionniers aux développements modernes de l'aéronautique.")
                  )
                )
              )
            )
          ),

          // Main
          section(id := "main", cls := "wrapper style2",
            div(cls := "title", "Les cours"),
            div(cls := "container",
              a(href := "#", cls := "image featured",
                img(src := "images/laptop-throttle.png", alt := "")
              ),
              section(id := "features",
                header(cls := "style1",
                  p(
                    "Les cours sont donnés en ", strong("visioconférences"), " à partir du mois ",
                    strong("d'octobre"), " jusqu'à ", strong("la date de l'examen"), ", suivant les ",
                    strong("périodes scolaires"), " de la ", strong("zone A"), " (Paris). Durant les vacances scolaires des cours de révisions peuvent être proposés."
                  )
                ),
                div(cls := "feature-list",
                  div(cls := "row",
                    div(cls := "col-6 col-12-medium",
                      section(
                        h3(cls := "icon fa-plane", "Créneau du mercredi"),
                        p("De 17h30 à 19h30")
                      )
                    ),
                    div(cls := "col-6 col-12-medium",
                      section(
                        h3(cls := "icon solid fa-plane", "Créneau du samedi"),
                        p("De 10h à 12h")
                      )
                    )
                  )
                ),
                ul(cls := "actions special",
                  li(
                    a(href := "https://docs.google.com/forms/d/e/1FAIpQLSdFUCkiHjYpZ714cT6zaPTPSlPBZNL_CmDl9eFY2xCnag6KLQ/viewform", cls := "button style1 large", "S'inscrire")
                  )
                )
              )
            )
          ),

          // Intro
          section(id := "intro", cls := "wrapper style1",
            div(cls := "title", "Nous connaitre"),
            div(cls := "container",
              p(cls := "style3",
                "En 2020, alors que la France se confine, la compagnie Air France souhaite proposer aux enfants de ses employés en ligne des cours pour se former au Brevet d'Initiation Aéronautique.",
                br, br,
                "Répondant à cet appel, l'association « Ambassadeur Aérien Avenir », dite « triple A » est créée, se composants à la fois d'employés d'Air France, de Cadets Air France, et de Elèves Pilotes de Ligne (EPL) de l'ENAC. Cette opération est un grand succès puisque X élèves sont formés.",
                br, br,
                "L'opération est reconduite en 2021, et en 2022 l'association prend son indépendance pour s'ouvrir à tous, jeunes et moins jeunes volontaires d'obtenir un premier diplôme aéronautique reconnu par l'Etat.",
                br,
                "Le profil des professeurs bénévoles s'est aussi diversifié comprenant des pilotes de multiples compagnies, mais aussi personnels navigants de cabine, ingénieurs, dispatcheurs, instructeurs planeur, et d'autres ! Mettant à profit leurs diverses expériences au service des élèves."
              )
            )
          ),

          // Footer
          section(id := "footer", cls := "wrapper",
            div(cls := "title", "Devenir volontaire"),
            div(cls := "container",
              header(cls := "style1",
                h2("Envie de devenir professeur bénévole ?"),
                p(
                  "Quelque soit votre domaine d'activité, si vous souhaitez partager votre passion pour l'aéronautique, vous êtes le bienvenu !",
                  br, br,
                  "Nous proposons un ", strong("programme adaptable"), " à vos disponibilités, et de ", strong("nombreuses facilités"), " pour alléger la préparation des cours.",
                  br, br,
                  a(href := "#")("N'hésitez pas à nous contacter pour de plus amples informations !")
                )
              ),
              section(cls := "feature-list small",
                div(cls := "row",
                  div(cls := "col-3 col-6-medium col-12-small",
                    section(
                      h3(cls := "icon solid fa-home", "Mailing Address"),
                      p(
                        "Untitled Corp", br,
                        "1234 Somewhere Rd", br,
                        "Nashville, TN 00000"
                      )
                    )
                  ),
                  div(cls := "col-3 col-6-medium col-12-small",
                    section(
                      h3(cls := "icon solid fa-comment", "Social"),
                      p(
                        a(href := "#")("@untitled-corp"), br,
                        a(href := "#")("linkedin.com/untitled"), br,
                        a(href := "#")("facebook.com/untitled")
                      )
                    )
                  ),
                  div(cls := "col-3 col-6-medium col-12-small",
                    section(cls := "no-top-line",
                      h3(cls := "icon solid fa-envelope", "Email"),
                      p(a(href := "#")("info@untitled.tld"))
                    )
                  ),
                  div(cls := "col-3 col-6-medium col-12-small",
                    section(cls := "no-top-line",
                      h3(cls := "icon solid fa-phone", "Phone"),
                      p("(000) 555-0000")
                    )
                  )
                )
              ),
              div(id := "copyright",
                ul(
                  li("© Solal LORCY."),
                  li("Design: ", a(href := "http://html5up.net")("HTML5 UP")),
                  li(a(href := "https://github.com/Villemarque/bia-poc")("Source code"))
                )
              )
            )
          )
        )
      )
    )

    println("<!DOCTYPE html>")
    println(pageHtml.render)
  }
}
