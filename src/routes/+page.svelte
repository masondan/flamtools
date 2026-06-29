<script lang="ts">
	import links from '$lib/data/links.json';
	import moreTools from '$lib/data/more-tools.json';

	let drawerOpen = false;

	function toggleDrawer() {
		drawerOpen = !drawerOpen;
	}

	function closeDrawer() {
		drawerOpen = false;
	}
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

		<!-- More Tools Button -->
		<section class="section more-tools-section">
			<button on:click={toggleDrawer} class="btn-more-tools">
				<img src="/icons/icon-more-tools.svg" alt="" class="btn-icon btn-icon-purple" />
				<span class="btn-label">More Tools</span>
			</button>
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

	<!-- More Tools Drawer -->
	{#if drawerOpen}
		<div class="drawer-overlay" on:click={closeDrawer}></div>
		<div class="drawer">
			<div class="drawer-header">
				<button class="drawer-close" on:click={closeDrawer}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
				<h2 class="drawer-title">More Tools</h2>
				<div class="drawer-spacer"></div>
			</div>
			<div class="drawer-separator"></div>

			<div class="drawer-content">
				{#each moreTools.categories as category}
					<div class="category-group">
						<h3 class="category-title">{category.name}</h3>
						<div class="tools-grid">
							{#each category.tools as tool}
								<a href={tool.url} class="btn-toolkit" rel="noreferrer" target="_blank">
									{tool.name}
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

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

	/* More Tools Button – Pale Purple (Training style) */
	.more-tools-section {
		margin-top: 1.25rem;
	}

	.btn-more-tools {
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
		cursor: pointer;
		transition: background-color 150ms ease;
	}

	.btn-more-tools:hover {
		background-color: #e6d9f2;
	}

	.btn-more-tools:active {
		background-color: #dccded;
	}

	/* Toolkit Buttons – White / Purple Border */
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
		text-decoration: none;
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
		/* colour baked into SVG fill="#5422b0" — no filter needed */
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

	/* Drawer Overlay */
	.drawer-overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: 480px;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 9998;
		animation: fadeIn 250ms ease;
	}

	/* Drawer Panel */
	.drawer {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: 480px;
		background-color: #f2f2f2;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		animation: slideUp 250ms ease;
		box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
	}

	/* Drawer Header */
	.drawer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1rem;
		flex-shrink: 0;
	}

	.drawer-close {
		background: none;
		border: none;
		cursor: pointer;
		color: #5422b0;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 150ms ease;
	}

	.drawer-close:hover {
		opacity: 0.7;
	}

	.drawer-title {
		font-family: 'Saira', sans-serif;
		font-size: 1.25rem;
		font-weight: 500;
		color: #333;
		margin: 0;
		flex: 1;
		text-align: center;
	}

	.drawer-spacer {
		width: 40px;
	}

	.drawer-separator {
		height: 1px;
		background-color: #e0e0e0;
		margin: 0 1rem;
	}

	/* Drawer Content */
	.drawer-content {
		flex: 1;
		overflow-y: auto;
		padding: 1.25rem 1rem;
	}

	.category-group {
		margin-bottom: 1.5rem;
	}

	.category-group:last-child {
		margin-bottom: 0;
	}

	.category-title {
		font-family: 'Saira', sans-serif;
		font-size: 1rem;
		font-weight: 500;
		color: #555;
		margin: 0 0 0.625rem 0;
		padding-left: 0.125rem;
	}

	.tools-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.625rem;
	}

	/* Animations */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			transform: translateX(-50%) translateY(100%);
		}
		to {
			transform: translateX(-50%) translateY(0);
		}
	}

	/* Responsive: single column for very narrow screens */
	@media (max-width: 340px) {
		.toolkit-grid,
		.tools-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
