<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import Header from "$lib/components/Header.svelte";
	import Highlights from "$lib/components/Highlights.svelte";
	import Features from "$lib/components/Features.svelte";
	import Intro from "$lib/components/Intro.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<div id="page-wrapper">
	<Nav />
	<Header />
	<Highlights />
	<Features />
	<Intro />
	<Footer />
</div>

<style>
	@media (max-width: 979.29px) {
		#page-wrapper {
			backface-visibility: hidden;
			padding-bottom: 1px;
		}
	}
</style>
