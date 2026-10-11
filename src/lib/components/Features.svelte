<script lang="ts">
	import InscriptionButton from "#lib/components/InscriptionButton.svelte";
	import { ffaUrl, ffaLabel } from "#lib/config.js";
</script>

<section id="main" class="wrapper style2">
	<div class="title">Les cours</div>
	<div class="container">
		<div class="image featured"><img src="/images/laptop-throttle.png" alt="" /></div>
		<section id="features">
			<header class="style1">
				<p>
					Les cours sont donnés en <strong>visioconférence</strong> à partir du mois
					<strong>d’octobre</strong> jusqu’à <strong>la date de l’examen</strong>, suivant les
					<strong>périodes scolaires</strong> de la <strong>zone C</strong> (Paris). Durant les
					vacances scolaires des cours de révisions peuvent être proposés.
				</p>
			</header>
			<ul>
				<li>Le format en visioconférence permet de suivre les cours dans le monde entier</li>
				<li>
					Nos professeurs, directement issus du secteur aérien, peuvent aider pour l'orientation
					professionnelle
				</li>
				<li>Notre site d'annales mis à disposition, pour bien se préparer à l'examen</li>
				<li>
					Notre partenariat avec la <a href={ffaUrl}>{ffaLabel}</a> afin de potentiellement
					bénéficier d'une subvention pour un vol d'initiation
				</li>
				<li>
					Nos cours adaptés à tous les profils : accessible aux plus jeunes, et possédant des
					encarts "Pour aller plus loin" pour les plus avertis
				</li>
				<li>
					Nous avons eu à coeur de distiller du contenu environnemental dans nos cours : nous
					évoquons en toute transparence l'impact environnemental de l'aérien et du spatial tout
					en soulignant les solutions déjà mises en place ainsi que les perspectives futures
				</li>
			</ul>
			<div class="feature-list">
				<div class="row">
					<div class="col-6 col-12-medium">
						<section>
							<h3 class="icon solid fa-plane">Créneau du mercredi</h3>
							<p>De 17h30 à 19h30</p>
						</section>
					</div>
					<div class="col-6 col-12-medium">
						<section>
							<h3 class="icon solid fa-plane">Créneau du samedi</h3>
							<p>De 10h à 12h</p>
						</section>
					</div>
				</div>
			</div>
			<InscriptionButton isFeatures />
		</section>
	</div>
</section>

<style>
	#main {
		margin-bottom: 0;
	}

	.wrapper {
		position: relative;
		padding: 6em 0 9em 0;
	}

	.wrapper.style2 {
		background: #fff;
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
		background: #fff;
		color: #484d55;
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

	.image.featured {
		display: block;
		width: 100%;
		margin: 0 0 2em 0;
	}

	.image img {
		display: block;
		width: 100%;
	}

	header.style1 {
		text-align: center;
		padding: 3em 0 3em 0;
	}

	header.style1 p {
		color: #989ba0;
		display: block;
		margin: 1.15em 0 0 0;
		font-size: 1.3em;
		letter-spacing: 0.075em;
		line-height: 1.5em;
	}

	#features header.style1 {
		padding-bottom: 5em;
	}

	ul {
		list-style: disc;
		padding-left: 1em;
	}

	ul li {
		padding-left: 0.5em;
	}

	.feature-list {
		max-width: 58em;
		margin-left: auto;
		margin-right: auto;
		position: relative;
		top: 0.75em;
	}

	.feature-list section {
		border-top: solid 1px #eee;
		padding-left: 5em;
		position: relative;
	}

	.feature-list h3 {
		color: #e97770 !important;
		margin: -0.35em 0 0.75em 0;
		font-size: 1.15em;
		letter-spacing: 0.05em;
	}

	.feature-list h3:before {
		display: block;
		color: #fff;
		background: #2f333b;
		border-radius: 2.5em;
		text-align: center;
		width: 2.5em;
		height: 2.5em;
		line-height: 2.5em;
		margin-right: 0.75em;
		position: absolute;
		left: 0;
		margin-top: -0.5em;
	}

	.icon {
		text-decoration: none;
	}

	.icon:before {
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		display: inline-block;
		font-style: normal;
		font-variant: normal;
		text-rendering: auto;
		line-height: 1;
		text-transform: none !important;
		font-family: "Font Awesome 5 Free";
		font-weight: 400;
		line-height: inherit;
		font-size: 1.25em;
	}

	.icon.solid:before {
		font-weight: 900;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		align-items: stretch;
		margin-top: -50px;
		margin-left: -50px;
	}

	.row > * {
		box-sizing: border-box;
		padding: 50px 0 0 50px;
	}

	.row > .col-6 {
		width: 50%;
	}

	@media (min-width: 979.3px) {
		.container {
			width: calc(100% - 100px);
		}

		.feature-list section {
			border-top: 0;
			padding-top: 0;
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

		.row {
			margin-top: -35px;
			margin-left: -35px;
		}

		.row > * {
			padding: 35px 0 0 35px;
		}
	}

	@media (max-width: 979.29px) {
		.feature-list {
			max-width: 40em;
		}

		.feature-list section {
			padding-top: 4em;
		}

		.feature-list > .row > :first-child > section {
			border-top: 0;
			padding-top: 0;
		}

		.row {
			margin-top: -50px;
			margin-left: -50px;
		}

		.row > * {
			padding: 50px 0 0 50px;
		}

		.row > .col-12-medium {
			width: 100%;
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

		header.style1 {
			padding: 0 0 1em 0;
		}

		header.style1 p {
			font-size: 1em;
			letter-spacing: 0;
			display: block;
			margin: 0;
		}

		#features header.style1 {
			padding-bottom: 4em;
		}

		.feature-list section {
			padding-top: 2em;
			padding-left: 4em;
		}

		.feature-list h3:before {
			font-size: 0.9em;
		}

		.row {
			margin-top: -30px;
			margin-left: -30px;
		}

		.row > * {
			padding: 30px 0 0 30px;
		}
	}
</style>
