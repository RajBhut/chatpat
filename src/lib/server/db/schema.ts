// LINK: https://lucia-auth.com/guidebook/drizzle-orm/#postgresql

import { pgTable, bigint, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('auth_user', {
	id: varchar('id', {
		length: 15
	}).primaryKey(),
	// other user attributes
	username: varchar('username').unique()
});

export const sessionsTable = pgTable('auth_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => usersTable.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const keysTable = pgTable('auth_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	})
		.notNull()
		.references(() => usersTable.id),
	hashedPassword: varchar('hashed_password', {
		length: 255
	})
});
