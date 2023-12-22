// LINK: https://lucia-auth.com/getting-started/sveltekit/#set-up-hooks

import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const luciaHandler: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};
