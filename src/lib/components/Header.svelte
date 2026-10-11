<section id="header" class="wrapper">
	<div id="logo">
		<h1>cours du BIA à distance par visioconférence, gratuit, pour tous</h1>
		<p>Par l’association Aérien Ambassadeurs Avenir</p>
	</div>
</section>

<style>
	#header {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		height: 35em;
		background: url("/images/ia-runway.webp") center top;
		padding: 0;
		margin-bottom: 0;
	}

	#logo {
		width: 90%;
		text-align: center;
		position: relative;
		top: 1.5em;
	}

	#logo h1 {
		font-weight: 900;
		text-transform: uppercase;
		color: #fff;
		font-size: 2em;
		letter-spacing: 0.25em;
	}

	#logo p {
		color: #eee;
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		margin: 1.25em 0 0 0;
		display: block;
		letter-spacing: 0.2em;
		font-size: 0.9em;
	}

	@media (max-width: 1279.29px) {
		#logo h1 {
			font-size: 1.75em;
		}

		#logo {
			margin-top: -0.5em !important;
		}
	}

	@media (max-width: 979.29px) {
		#logo {
			top: 0;
		}
	}

	@media (max-width: 735.29px) {
		#header {
			height: 17em;
			padding-top: 4em;
		}

		:global(.homepage) #header {
			height: 20em;
		}

		#logo {
			text-align: center;
			padding-left: 2em;
			padding-right: 2em;
		}

		#logo h1 {
			font-size: 1.5em;
			letter-spacing: 0.2em;
		}

		#logo p {
			margin: 1.25em 0 0 0;
			display: block;
			letter-spacing: 0.2em;
			font-size: 0.9em;
		}
	}
</style>
