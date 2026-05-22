<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let deferredPrompt: any = $state(null);

	onMount(() => {
		// Register service worker
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js').catch(() => {
				// Service worker registration failed, app continues to work
			});
		}

		// Capture beforeinstallprompt event for later trigger
		window.addEventListener('beforeinstallprompt', (e: any) => {
			e.preventDefault();
			deferredPrompt = e;
		});

		// Clean up on uninstall
		window.addEventListener('appinstalled', () => {
			deferredPrompt = null;
		});
	});
</script>

{@render children()}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		background-color: #f2f2f2;
		color: #333;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(a) {
		text-decoration: none;
		color: inherit;
	}

	@media (min-width: 481px) {
		:global(body) {
			display: flex;
			justify-content: center;
		}
	}
</style>
