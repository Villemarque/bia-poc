<script lang="ts">
	import Topic from "#lib/components/Topic.svelte";
	import InscriptionButton from "#lib/components/InscriptionButton.svelte";
	import { topics } from "#lib/config.js";
</script>

<section id="highlights" class="wrapper style3">
	<div class="title">Le BIA</div>
	<div class="container">
		<p class="style1">
			Le <strong>Brevet d’Initiation Aéronautique</strong> (BIA) est :
		</p>
		<ul>
			<li>le tout premier brevet théorique sur le thème de l’aéronautique</li>
			<li>un diplôme de l’éducation nationale</li>
			<li>à partir de 13 ans à la date de l'examen (début juin) et sans limite d'âge</li>
			<li>
				valide un niveau d’initiation à la culture scientifique et technique dans le domaine de
				l’aéronautique et du spatial
			</li>
			<li>
				est reconnu par les <a href="https://cnfas.fr">différentes fédérations aéronautiques</a>.
			</li>
		</ul>
		<p class="style1">
			L’examen est un QCM de <strong>2h30</strong>, prévu entre fin mai et début juin. Il y a 20
			questions par matière, soit 100 QCM au total, environ 30 minutes par chapitre.
			<br />
			Une <strong>épreuve facultative d’anglais aéronautique</strong>, dont seuls les points
			supérieurs à 10 sont comptés, est proposée.
			<br />
			La note moyenne de chaque candidat est calculée en divisant par cinq la somme des points
			obtenus.
		</p>
		<div class="row aln-center">
			{#each topics.slice(0, 3) as topic}
				<div class="col-4 col-12-medium">
					<Topic title={topic.title} img={topic.img} description={topic.description} />
				</div>
			{/each}
		</div>
		<div class="row aln-center">
			{#each topics.slice(3) as topic}
				<div class="col-4 col-12-medium">
					<Topic title={topic.title} img={topic.img} description={topic.description} />
				</div>
			{/each}
		</div>
		<InscriptionButton />
	</div>
</section>

<style>
	#highlights {
		margin-bottom: 0;
	}

	.wrapper {
		position: relative;
		padding: 6em 0 9em 0;
	}

	.wrapper.style3 {
		background: linear-gradient(to top, #cecece, #fafafa);
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
		background-color: #fafafa;
		color: #071037;
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

	.row.aln-center {
		justify-content: center;
	}

	.row > .col-4 {
		width: 33.3333333333%;
	}

	ul {
		list-style: disc;
		padding-left: 1em;
	}

	ul li {
		padding-left: 0.5em;
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

		.row {
			margin-top: -35px;
			margin-left: -35px;
		}

		.row > * {
			padding: 35px 0 0 35px;
		}
	}

	@media (max-width: 979.29px) {
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

		.row {
			margin-top: -30px;
			margin-left: -30px;
		}

		.row > * {
			padding: 30px 0 0 30px;
		}
	}
</style>
