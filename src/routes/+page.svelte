<script lang="ts">
	import links from '$lib/data/links.json';
</script>

<div class="page">
	<header class="header">
		<img src="/logos/logo-flamtools-logotype.png" alt="FlamTools" class="logotype" />
		<p class="strapline">Tools for creators</p>
	</header>

	<main class="main">
		<!-- Flam Apps -->
		<section class="section apps">
			{#each links.apps as app}
				<a href={app.url} class="btn-app" rel="noreferrer">
					<img src="/icons/icon-{app.icon}.svg" alt="" class="btn-icon btn-icon-invert" />
					<span class="btn-label">{app.name}</span>
				</a>
			{/each}
		</section>

		<!-- External Toolkit -->
		<section class="section toolkit">
			<h2 class="section-title">Extras</h2>
			<div class="toolkit-grid">
				{#each links.toolkit as tool}
					<a href={tool.url} class="btn-toolkit" rel="noreferrer">
						{tool.name}
					</a>
				{/each}
			</div>
		</section>

		<!-- Training Apps -->
		<section class="section training">
			<h2 class="section-title">Training apps</h2>
			{#each links.training as app}
				<a href={app.url} class="btn-training" rel="noreferrer">
					<img src="/icons/icon-{app.icon}.svg" alt="" class="btn-icon btn-icon-purple" />
					<span class="btn-label">{app.name}</span>
				</a>
			{/each}
		</section>
	</main>

	<footer class="footer">
		<p>Made with <img src="/icons/icon-flamtools-drum.svg" alt="drum" class="footer-drum" /> by <a href="mailto:dan@flamtools.com">Dan Mason</a></p>
	</footer>
</div>

<style>
	@font-face {
		font-family: 'Saira';
		src: url('$lib/assets/fonts/saira.ttf') format('truetype');
		font-weight: 400 700;
		font-display: swap;
	}

	@font-face {
		font-family: 'Inter';
		src: url('$lib/assets/fonts/Inter-VariableFont_opsz,wght.ttf') format('truetype');
		font-weight: 100 900;
		font-display: swap;
	}

	.page {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		max-width: 480px;
		width: 100%;
		margin: 0 auto;
		padding: 0 1rem;
		background-color: #f2f2f2;
	}

	@media (min-width: 481px) {
		.page {
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		}
	}

	/* Header */
	.header {
		text-align: center;
		padding: 2rem 0 1.5rem;
	}

	.logotype {
		height: 52px;
		width: auto;
	}

	.strapline {
		font-family: 'Saira', sans-serif;
		font-size: 1.25rem;
		font-weight: 500;
		color: #333;
		margin-top: 0.25rem;
	}

	/* Sections */
	.section {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.section-title {
		font-family: 'Saira', sans-serif;
		font-size: 1rem;
		font-weight: 500;
		color: #555;
		margin-bottom: 0.125rem;
		padding-left: 0.125rem;
	}

	/* Main Apps – Brand Purple */
	.btn-app {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background-color: #5422b0;
		color: #fff;
		border-radius: 10px;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 1.1rem;
		font-weight: 500;
		transition: opacity 150ms ease;
	}

	.btn-app:hover {
		opacity: 0.9;
	}

	.btn-app:active {
		opacity: 0.8;
	}

	/* External Toolkit – White / Purple Border */
	.toolkit {
		margin-top: 1.25rem;
	}

	.toolkit-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.625rem;
	}

	.btn-toolkit {
		display: flex;
		align-items: center;
		padding: 0.625rem 0.75rem;
		background-color: #fff;
		color: #5422b0;
		border: 1.5px solid #5422b0;
		border-radius: 8px;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 0.95rem;
		font-weight: 450;
		transition: background-color 150ms ease;
	}

	.btn-toolkit:hover {
		background-color: #f8f4fd;
	}

	.btn-toolkit:active {
		background-color: #f0e6f7;
	}

	/* Training Apps – Pale Purple */
	.training {
		margin-top: 1.25rem;
	}

	.btn-training {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background-color: #f0e6f7;
		color: #5422b0;
		border: 1.5px solid #5422b0;
		border-radius: 10px;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 1.1rem;
		font-weight: 500;
		transition: background-color 150ms ease;
	}

	.btn-training:hover {
		background-color: #e6d9f2;
	}

	.btn-training:active {
		background-color: #dccded;
	}

	/* Icon styles */
	.btn-icon {
		width: 28px;
		height: 28px;
		flex-shrink: 0;
	}

	.btn-icon-invert {
		filter: brightness(0) invert(1);
	}

	.btn-icon-purple {
		filter: brightness(0) saturate(100%) invert(15%) sepia(80%) saturate(5000%) hue-rotate(262deg) brightness(80%) contrast(110%);
	}

	.btn-label {
		line-height: 1;
	}

	/* Main */
	.main {
		flex: 1;
	}

	/* Footer */
	.footer {
		text-align: center;
		padding: 1.5rem 0 1.25rem;
		margin-top: 1.5rem;
		border-top: 1px solid #e0e0e0;
	}

	.footer p {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 0.8rem;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
	}

	.footer a {
		color: #999;
	}

	.footer a:hover {
		color: #5422b0;
	}

	.footer-drum {
		width: 16px;
		height: 16px;
		opacity: 0.5;
	}

	/* Responsive: single column for very narrow screens */
	@media (max-width: 340px) {
		.toolkit-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
