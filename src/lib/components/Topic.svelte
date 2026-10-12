<script lang="ts">
	import type { Picture } from "@sveltejs/enhanced-img";
	let { title, img, description }: { title: string; img: Picture; description: string } =
		$props();
</script>

<section class="highlight">
	<enhanced:img
		src={img}
		class="image featured"
		alt=""
		sizes="(max-width: 979.29px) 100vw, 320px"
		loading="lazy"
		decoding="async"
	/>
	<h3>{title}</h3>
	<p>{description}</p>
</section>

<style>
	.highlight {
		text-align: center;
	}

	.highlight h3 {
		color: #e97770;
		margin: 0 0 0.75em 0;
		font-size: 1.15em;
		letter-spacing: 0.05em;
	}

	.image.featured {
		display: block;
		width: 100%;
		height: auto;
		margin: 0 0 2em 0;
		border: solid 10px #fff;
	}

	@media (max-width: 979.29px) {
		.highlight {
			max-width: 40em;
			margin-left: auto;
			margin-right: auto;
		}
	}
</style>
