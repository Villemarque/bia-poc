<script lang="ts">
	import { inscriptionLink, inscriptionLabel } from "#lib/config.js";
</script>

<div id="nav">
	<!-- svelte-ignore a11y_invalid_attribute -->
	<a href="#"><img src="/images/logo-white.svg" alt="logo" class="nav-logo" /></a>
	<ul class="nav-list">
		<li class="nav-not-essential nav-item">
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#">Accueil</a>
		</li>
		<li class="nav-item"><a href="#highlights">Le BIA</a></li>
		<li class="nav-item"><a href="#features">Les cours</a></li>
		<li class="nav-not-essential nav-item"><a href="#intro">Nous connaitre</a></li>
		<li class="nav-not-essential nav-item"><a href="#footer">Devenir volontaire</a></li>
	</ul>
	<a class="nav-inscription-link" href={inscriptionLink}>{inscriptionLabel}</a>
</div>

<style>
	#nav {
		--nav-dark-blue: #000a33;
		--nav-yellow: #ffe484;

		position: fixed;
		display: flex;
		align-items: center;
		top: 0;
		width: 100%;
		text-align: center;
		z-index: 1050;
		background: var(--nav-dark-blue);
		min-height: 3em;
		padding: 0.5em 1.5em 0.5em 1em;
	}

	.nav-logo {
		display: block;
		max-width: inherit;
		max-height: inherit;
		height: 3em;
		object-fit: contain;
		left: 0;
	}

	.nav-list {
		display: flex;
		flex-direction: row;
		list-style: none;
		padding-left: 1em;
		align-content: center;
		align-items: center;
		margin-bottom: 0;
	}

	.nav-item {
		display: block;
		text-align: center;
		padding: 0.5rem 1rem;
	}

	.nav-item > a {
		color: rgba(255, 255, 255, 0.75);
		text-decoration: none;
		font-size: 16px;
	}

	.nav-item:hover > a {
		color: #fff;
	}

	.nav-inscription-link {
		margin-left: auto;
		font-weight: 500;
		color: var(--nav-yellow);
		text-decoration: none;
		border: 1px solid var(--nav-yellow);
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.25rem;
		transition:
			color 0.15s ease-in-out,
			background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
	}

	.nav-inscription-link:hover {
		color: var(--nav-dark-blue);
		background-color: var(--nav-yellow);
	}

	@media (max-width: 979.29px) {
		.nav-item {
			padding: 0 1.2em 0 1.2em;
		}
	}

	@media (max-width: 735.29px) {
		.nav-not-essential {
			display: none;
		}
	}
</style>
