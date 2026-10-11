<script lang="ts">
	import { inscriptionLink, inscriptionLabel } from "$lib/config";

	let { isFeatures = false }: { isFeatures?: boolean } = $props();
</script>

<ul class="actions special" class:in-features={isFeatures}>
	<li>
		<a href={inscriptionLink} class="button style1 large">{inscriptionLabel}</a>
	</li>
</ul>

<style>
	ul.actions {
		list-style: none;
		padding-left: 0;
		margin: 3em 0 0 0;
	}

	ul.actions li {
		display: inline-block;
		margin: 0 0.75em 0 0.75em;
		padding-left: 0;
	}

	ul.actions li:first-child {
		margin-left: 0;
	}

	ul.actions li:last-child {
		margin-right: 0;
	}

	ul.actions.special {
		text-align: center;
	}

	.button {
		transition: all 0.25s ease-in-out;
		display: inline-block;
		background: #444;
		text-align: center;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.25em;
		text-decoration: none;
		border-radius: 0.35em;
		border: 0;
		outline: 0;
		cursor: pointer;
		padding: 0 2.25em 0 2.25em;
		font-size: 0.9em;
		min-width: 12em;
		height: 4em;
		line-height: 4em;
	}

	.button:hover {
		background-color: #f98780;
	}

	.button.large {
		font-size: 1em;
		min-width: 14em;
	}

	.button.style1 {
		background: #e97770;
		color: #fff;
	}

	.button.style1:hover {
		background-color: #f98780;
	}

	.button.style1:active {
		background-color: #d96760;
	}

	ul.actions.in-features {
		margin-top: 5em;
	}

	@media (max-width: 735.29px) {
		ul.actions {
			margin: 2em 0 0 0;
		}

		ul.actions li {
			margin: 15px 0 0 0;
			display: block;
		}

		ul.actions li:first-child {
			margin-top: 0;
		}

		ul.actions.in-features {
			margin-top: 4em;
		}

		.button {
			display: block;
			width: 100%;
			font-size: 1em;
			max-width: 30em;
			margin: 0 auto;
		}
	}
</style>
