<script lang="ts">
	import { ffaUrl, ffaLabel } from "$lib/config";
</script>

<section id="intro" class="wrapper style1">
	<div class="title">Nous connaitre</div>
	<div class="container">
		<p class="style3">
			Créée en décembre 2020,
			<a
				href="https://www.journal-officiel.gouv.fr/pages/associations-detail-annonce/?q.id=id:202100021965"
				>notre association loi 1901</a
			>
			« Aérien Ambassadeurs Avenir » a pour objectifs de partager notre passion pour l'aéronautique
			avec la jeunesse, les passionnés de demain, de susciter des vocations et de développer une
			conscience environnementale. Voici notre histoire :
			<br />
			<br />
			En 2020, alors que la France se confine, la compagnie Air France souhaite proposer aux enfants
			de ses salariés des cours en ligne pour se former au Brevet d’Initiation Aéronautique.
			<br />
			<br />
			Répondant à cet appel, l’association « Aérien Ambassadeurs Avenir », dite « Triple A » est
			créée, se composant à la fois d’employés d’Air France, de Cadets Air France, et d'Elèves
			Pilotes de Ligne (EPL) de l’ENAC. Cette opération est un grand succès puisque plus de 900
			élèves sont formés sur 2 ans.
			<br />
			<br />
			En 2022, l’association prend son indépendance pour s’ouvrir à tous, jeunes et moins jeunes,
			leur permettant ainsi d’obtenir un premier diplôme aéronautique reconnu par l’Etat.
			<br />
			Le profil des professeurs bénévoles s’est aussi diversifié comprenant des pilotes de multiples
			compagnies, mais aussi personnels navigants de cabine, ingénieurs, dispatcheurs, instructeurs
			planeur, et d’autres ! Tous nos enseignants bénévoles mettent ainsi à profit leurs diverses
			expériences au service des élèves pour leur transmettre leur passion.
			<br />
			En parallèle des cours de BIA, notre association se diversifie, notamment au travers de
			partenariats avec l'association
			<a href="https://unmorceaudecielbleu.wixsite.com/unmorceaudecielbleu"
				>Un morceau de ciel bleu</a
			>, avec <a href="https://www.ecole-air-espace.fr">l'Ecole de l'air et de l'espace</a> ou
			encore avec la <a href={ffaUrl}>{ffaLabel}</a>. Notre association, pleine d'ambition, n'est
			encore qu'au tout début de son histoire !
		</p>
	</div>
</section>

<style>
	#intro {
		padding-bottom: 8em;
		text-align: center;
		margin-bottom: 0;
	}

	.wrapper {
		position: relative;
		padding: 6em 0 9em 0;
	}

	.wrapper.style1 {
		background: #e97770;
		color: #eee;
		color: rgba(255, 255, 255, 0.75);
	}

	.wrapper.style1 a {
		color: #fff;
	}

	.title {
		position: absolute;
		top: 0;
		left: 50%;
		text-align: center;
		text-transform: uppercase;
		display: block;
		font-weight: 700;
		letter-spacing: 0.25em;
		font-size: 1.2em;
		width: 25em;
		height: 3.25em;
		top: -3.25em;
		line-height: 3.25em;
		margin-bottom: -3.25em;
		margin-left: -12.5em;
		padding-top: 0.5em;
		background: #e97770;
		color: #fff;
	}

	.title:before {
		content: "";
		position: absolute;
		bottom: -38px;
		left: -35px;
		width: 35px;
		height: 38px;
	}

	.title:after {
		transform: scaleX(-1);
		content: "";
		position: absolute;
		bottom: -38px;
		right: -35px;
		width: 35px;
		height: 38px;
	}

	.container {
		margin: 0 auto;
		max-width: 100%;
		width: calc(100% - 40px);
	}

	#intro p.style3 {
		font-size: 1.1em;
		width: 48em;
		margin: 0 auto;
		text-align: left;
	}

	@media (min-width: 979.3px) {
		.container {
			width: calc(100% - 100px);
		}
	}

	@media (min-width: 1279.3px) {
		.container {
			width: calc(100% - 100px);
		}
	}

	@media (min-width: 1679.3px) {
		.container {
			width: 70em;
		}
	}

	@media (max-width: 1279.29px) {
		.wrapper {
			padding: 4em 0 7em 0;
		}

		#intro {
			padding-bottom: 7em;
		}
	}

	@media (max-width: 979.29px) {
		#intro p.style3 {
			width: auto;
		}
	}

	@media (max-width: 735.29px) {
		.wrapper {
			padding: 3em 0 6em 0;
		}

		.title {
			font-size: 0.9em;
			width: 18em;
			height: 2.5em;
			top: -2.5em;
			line-height: 2.5em;
			margin-bottom: -2.5em;
			margin-left: -9em;
			padding-top: 0.5em;
		}

		.title:before,
		.title:after {
			height: 15px;
			bottom: -15px;
			background-size: 100% 100%;
		}

		#intro {
			text-align: center;
			padding-right: 2em;
			padding-left: 2em;
			padding-bottom: 5em;
			margin: 0 auto;
		}
	}
</style>
