import { luciaHandler } from '$lib/server/lucia/handler';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(luciaHandler);
