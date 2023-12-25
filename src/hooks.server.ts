import { luciaHandler } from '$lib/server/lucia/handler';
import { LogType, logger } from '$lib/server/modules/log';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(luciaHandler, async ({ event, resolve }) => {

    logger()
        .type(LogType.SUCCESS)
        .prefix("hook")
        .prefix(event.request.method.toLowerCase())
        .message(event.url.pathname)
        .commit()

    return resolve(event);
});
