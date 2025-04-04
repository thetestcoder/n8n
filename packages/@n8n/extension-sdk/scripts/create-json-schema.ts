import { extensionManifestSchema } from '../src/schema';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Properly derive __dirname on all platforms
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

const jsonSchema = zodToJsonSchema(extensionManifestSchema, {
	name: 'N8nExtensionSchema',
	nameStrategy: 'title',
});

(async () => {
	const outputPath = resolve(rootDir, 'schema.json');
	console.log('Writing to:', outputPath); // Debug the path
	await writeFile(outputPath, JSON.stringify(jsonSchema, null, 2));
})();
