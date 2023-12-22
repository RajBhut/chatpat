// LINK: https://orm.drizzle.team/docs/get-started-postgresql#node-postgres

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { DATABASE_URL } from '$env/static/private';

export const pool = new pg.Pool({
	connectionString: DATABASE_URL
});

await pool.connect().then(() => {
	console.log('Connected to database');
});
export const db = drizzle(pool);
