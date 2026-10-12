<script lang="ts">
	let { children }: { children: import("svelte").Snippet } = $props();
</script>

{@render children()}

<style>
	/* Design tokens (H1): single source for the shared palette + timing.
	   Values are identical to the literals they replace. */
	:global(:root) {
		--color-accent: #e97770;
		--color-accent-hover: #f98780;
		--color-accent-active: #d96760;
		--color-ink: #777b80;
		--color-ink-muted: #73777c;
		--color-ink-faint: #989ba0;
		--color-heading: #484d55;
		--color-link: #717479;
		--color-nav: #000a33;
		--color-icon-circle: #2f333b;
		--color-footer: #282b34;
		--transition: 0.25s ease-in-out;
	}

	:global(html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, output, ruby, section, summary, time, mark, audio, video) {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}

	:global(article, aside, details, figcaption, figure, footer, header, hgroup, menu, section) {
		display: block;
	}

	:global(body) {
		line-height: 1;
	}

	:global(ol, ul) {
		list-style: none;
	}

	:global(blockquote, q) {
		quotes: none;
	}

	:global(blockquote:before, blockquote:after, q:before, q:after) {
		content: "";
		content: none;
	}

	:global(table) {
		border-collapse: collapse;
		border-spacing: 0;
	}

	:global(body) {
		-webkit-text-size-adjust: none;
	}

	:global(mark) {
		background-color: transparent;
		color: inherit;
	}

	:global(input::-moz-focus-inner) {
		border: 0;
		padding: 0;
	}

	:global(input, select, textarea) {
		-moz-appearance: none;
		-webkit-appearance: none;
		-ms-appearance: none;
		appearance: none;
	}

	:global(html) {
		box-sizing: border-box;
	}

	:global(*), :global(*:before), :global(*:after) {
		box-sizing: inherit;
	}

	:global(body, input, textarea, select) {
		font-family: "Source Sans Pro", sans-serif;
		font-weight: 400;
		color: var(--color-ink);
		font-size: 14pt;
		line-height: 1.75em;
		letter-spacing: 0.025em;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-weight: 700;
		color: var(--color-heading);
	}

	:global(h1 a, h2 a, h3 a, h4 a, h5 a, h6 a) {
		color: inherit;
		text-decoration: none;
	}

	:global(a) {
		transition: color var(--transition);
		text-decoration: underline;
		color: var(--color-link);
	}

	:global(a:hover) {
		text-decoration: none;
	}

	:global(strong), :global(b) {
		font-weight: 700;
		color: var(--color-heading);
	}

	:global(blockquote) {
		border-left: solid 0.5em #ddd;
		padding: 1em 0 1em 2em;
		font-style: italic;
	}

	:global(em), :global(i) {
		font-style: italic;
	}

	:global(hr) {
		border: 0;
		border-top: solid 1px #ddd;
		margin: 2em 0 2em 0;
	}

	:global(sub) {
		position: relative;
		top: 0.5em;
		font-size: 0.8em;
	}

	:global(sup) {
		position: relative;
		top: -0.5em;
		font-size: 0.8em;
	}

	:global(.nobr) {
		white-space: nowrap;
	}

	:global(p, ul, ol, dl, table, blockquote, form) {
		margin-bottom: 2em;
	}

	:global(section, article) {
		margin: 0 0 4em 0;
	}

	:global(section > :last-child, article > :last-child, section:last-child, article:last-child) {
		margin-bottom: 0;
	}

	@media (max-width: 1679.29px) {
		:global(body, input, textarea, select) {
			font-size: 12pt;
		}
	}

	@media (max-width: 1279.29px) {
		:global(body, input, select, textarea) {
			font-size: 11pt;
			line-height: 1.5em;
			letter-spacing: 0.015em;
		}
	}

	@media (max-width: 979.29px) {
		:global(header br) {
			display: none;
		}
	}

	@media (max-width: 735.29px) {
		:global(body, input, select, textarea) {
			line-height: 1.5em;
			font-size: 10.5pt;
			letter-spacing: 0;
		}

		:global(h2, h3, h4, h5, h6) {
			font-size: 1.2em;
			letter-spacing: 0.05em;
			margin: 0 0 1em 0;
		}

		:global(hr) {
			margin: 1em 0 1em 0;
		}

		:global(section, article) {
			clear: both;
		}

		:global(header br) {
			display: none;
		}
	}

	/* Visible keyboard focus (A1) */
	:global(:focus-visible) {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	/* Offset in-page anchors under the fixed nav (B1) + smooth scrolling (C2) */
	:global(html) {
		scroll-padding-top: 4em;
		scroll-behavior: smooth;
	}

	/* Respect reduced-motion (A5) */
	@media (prefers-reduced-motion: reduce) {
		:global(*) {
			scroll-behavior: auto !important;
			transition-duration: 0.01ms !important;
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
		}
	}
</style>
