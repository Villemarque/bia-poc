<script lang="ts">
	import { contactMail } from "$lib/config";
</script>

<section id="footer" class="wrapper">
	<div class="title">Devenir volontaire</div>
	<div class="container">
		<header class="style1">
			<h2>Envie de devenir professeur bénévole ?</h2>
			<p>Quel que soit votre domaine d’activité, si vous souhaitez partager votre passion pour l’aéronautique, vous êtes le bienvenu !<br /><br />Nous proposons un <strong>programme adaptable</strong> à vos disponibilités, et de <strong>nombreuses facilités</strong> pour alléger la préparation des cours.<br /><br /><a href={`mailto:${contactMail}`}>N’hésitez pas à nous contacter pour de plus amples informations !</a></p>
		</header>
		<section class="feature-list small">
			<div class="row">
				<div class="col-6 col-12-small">
					<section class="no-top-line">
						<h3 class="icon solid fa-envelope">Email</h3>
						<p><a href={`mailto:${contactMail}`}>{contactMail}</a></p>
					</section>
				</div>
				<div class="col-6 col-12-small">
					<section>
						<h3 class="icon solid fa-comment">Réseaux sociaux</h3>
						<p>
							Instagram
							<a href="https://www.instagram.com/aerien_ambassadeurs_avenir"
								>@aerien_ambassadeurs_avenir</a
							>
							<br />
							LinkedIn
							<a href="https://www.linkedin.com/company/aerien-ambassadeurs-avenir"
								>aerien-ambassadeurs-avenir</a
							>
						</p>
					</section>
				</div>
			</div>
		</section>
		<div id="copyright">
			<ul
				><li>© Solal LORCY, CCA 3.0</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li><li
					><a href="https://github.com/Villemarque/bia-poc">Source code</a></li
				></ul
			>
		</div>
	</div>
</section>

<style>
	#footer {
		background: #282b34;
		color: #eee;
		color: rgba(255, 255, 255, 0.5);
		padding-bottom: 6em;
		margin-bottom: 0;
	}

	.wrapper {
		position: relative;
		padding: 6em 0 9em 0;
	}

	#footer h1,
	#footer h2,
	#footer h3,
	#footer h4,
	#footer h5,
	#footer h6,
	#footer strong,
	#footer b,
	#footer a {
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
		background: #282b34;
		color: #eee;
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

	header.style1 {
		text-align: center;
		padding: 3em 0 3em 0;
	}

	header.style1 h2 {
		font-weight: 700;
		font-size: 2em;
		letter-spacing: 0.075em;
		line-height: 1.5em;
	}

	header.style1 p {
		color: #989ba0;
		display: block;
		margin: 1.15em 0 0 0;
		font-size: 1.3em;
		letter-spacing: 0.075em;
		line-height: 1.5em;
	}

	#footer header.style1 {
		padding-bottom: 6em;
		margin-bottom: 6em;
		border-bottom: solid 1px rgba(255, 255, 255, 0.05);
	}

	#footer header.style1 h2 {
		color: #fff;
	}

	#footer header.style1 p {
		text-align: left;
	}

	ul {
		list-style: disc;
		padding-left: 1em;
	}

	ul li {
		padding-left: 0.5em;
	}

	.feature-list {
		max-width: 100%;
		margin-left: auto;
		margin-right: auto;
		position: relative;
		top: 0.75em;
	}

	.feature-list section {
		border-top: solid 1px rgba(255, 255, 255, 0.05);
		padding-left: 5em;
		position: relative;
	}

	.feature-list.small section {
		padding-left: 3.5em;
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

	.feature-list.small h3:before {
		font-size: 0.8em;
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

	#copyright {
		text-align: center;
		padding-top: 6em;
		margin-top: 6em;
		border-top: solid 1px rgba(255, 255, 255, 0.05);
	}

	#copyright ul {
		display: inline-block;
		border-radius: 0.35em;
		box-shadow: inset 0px 0px 1px 1px rgba(255, 255, 255, 0.05);
		color: #aaa;
		color: rgba(255, 255, 255, 0.25);
		padding: 0.75em 2em;
		font-size: 0.9em;
	}

	#copyright ul li {
		display: inline-block;
		margin-left: 1em;
		padding-left: 1em;
		border-left: solid 1px #333;
		border-left-color: rgba(255, 255, 255, 0.05);
	}

	#copyright ul li:first-child {
		border-left: 0;
		margin-left: 0;
		padding-left: 0;
	}

	#copyright a {
		color: inherit;
	}

	#copyright a:hover {
		color: #fff;
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

		#footer {
			padding-bottom: 4em;
		}

		#footer header.style1 {
			padding-bottom: 4em;
			margin-bottom: 4em;
		}

		.row {
			margin-top: -35px;
			margin-left: -35px;
		}

		.row > * {
			padding: 35px 0 0 35px;
		}

		#copyright {
			padding-top: 4em;
			margin-top: 4em;
		}
	}

	@media (max-width: 979.29px) and (min-width: 735.3px) {
		.feature-list > .row > :nth-child(2) > section {
			border-top: 0;
			padding-top: 0;
		}
	}

	@media (max-width: 979.29px) {
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
	}

	@media (max-width: 735.29px) {
		.wrapper {
			padding: 3em 0 6em 0;
		}

		#footer {
			padding-bottom: 0;
		}

		#footer header.style1 {
			padding-bottom: 2em;
			margin-bottom: 2em;
		}

		header.style1 {
			padding: 0 0 1em 0;
		}

		header.style1 h2 {
			font-size: 1.5em;
			letter-spacing: 0.075em;
			line-height: 1.25em;
		}

		header.style1 p {
			font-size: 1em;
			letter-spacing: 0;
			display: block;
			margin: 0;
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

		.feature-list {
			border-top: 0;
			padding-top: 0;
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

		.row > .col-12-small {
			width: 100%;
		}

		#copyright {
			padding-top: 0;
			margin-top: 4em;
			border-top: 0;
		}

		#copyright ul {
			padding: 1em 2em;
			width: 100%;
		}

		#copyright ul li {
			display: block;
			margin: 0.5em 0 0 0;
			border-left: 0;
			padding: 0;
		}

		#copyright ul li:first-child {
			margin-top: 0;
		}
	}
</style>
