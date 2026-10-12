<script lang="ts">
	import { onMount } from "svelte";
	import { inscriptionLink, inscriptionLabel } from "#lib/config.js";

	let active = $state("");

	onMount(() => {
		const sections = ["header", "highlights", "features", "intro", "footer"]
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => !!el);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						// the hero maps back to "no section active" (Accueil)
						active = entry.target.id === "header" ? "" : entry.target.id;
					}
				}
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);
		for (const section of sections) observer.observe(section);
		return () => observer.disconnect();
	});
</script>

<nav id="nav" aria-label="Navigation principale">
	<a href="#page-wrapper" aria-label="Retour en haut"
		><img src="/images/logo-white.svg" alt="" class="nav-logo" /></a
	>
	<ul class="nav-list">
		<li class="nav-not-essential nav-item">
			<a href="#page-wrapper" class:active={active === ""}>Accueil</a>
		</li>
		<li class="nav-item">
			<a href="#highlights" class:active={active === "highlights"}>Le BIA</a>
		</li>
		<li class="nav-item">
			<a href="#features" class:active={active === "features"}>Les cours</a>
		</li>
		<li class="nav-not-essential nav-item">
			<a href="#intro" class:active={active === "intro"}>Nous connaître</a>
		</li>
		<li class="nav-not-essential nav-item">
			<a href="#footer" class:active={active === "footer"}>Devenir volontaire</a>
		</li>
	</ul>
	<a class="nav-inscription-link" href={inscriptionLink}>{inscriptionLabel}</a>
</nav>

<style>
	#nav {
		--nav-dark-blue: var(--color-nav);
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

	.nav-item > a.active,
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

	.nav-inscription-link:active {
		background-color: #e6c94f;
	}

	/* Larger tap targets on touch devices (B2) */
	@media (pointer: coarse) {
		.nav-item {
			padding: 0.75rem 1.15rem;
		}

		.nav-item > a {
			display: inline-block;
			padding: 0.375rem 0;
		}
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
