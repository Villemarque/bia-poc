<script lang="ts">
	import Nav from "#lib/components/Nav.svelte";
	import Header from "#lib/components/Header.svelte";
	import Highlights from "#lib/components/Highlights.svelte";
	import Features from "#lib/components/Features.svelte";
	import Intro from "#lib/components/Intro.svelte";
	import Footer from "#lib/components/Footer.svelte";
</script>

<div id="page-wrapper">
	<a class="skip-link" href="#content">Aller au contenu</a>
	<Nav />
	<main id="content">
		<Header />
		<Highlights />
		<Features />
		<Intro />
	</main>
	<Footer />
</div>

<style>
	.skip-link {
		position: absolute;
		top: 0;
		left: -9999px;
		z-index: 2000;
		padding: 0.75em 1.25em;
		background: var(--color-nav);
		color: #fff;
		text-decoration: none;
	}

	.skip-link:focus {
		left: 0;
	}

	@media (max-width: 979.29px) {
		#page-wrapper {
			backface-visibility: hidden;
			padding-bottom: 1px;
		}
	}
</style>
