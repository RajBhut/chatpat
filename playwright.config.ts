import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	preserveOutput: 'always',
	reporter: [
		['json', { outputFile: './test-results/json.json', open: 'on-failure' }],
	]
};

export default config;
