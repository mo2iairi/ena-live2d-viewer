import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
	if (mode === 'development') {
		return {
			base: '/ena-live2d-viewer/',
			plugins: [react()],
			root: './dev',
		};
	} else {
		return {
			plugins: [
				react(),
				dts({
					insertTypesEntry: true,
					tsconfigPath: './tsconfig.app.json',
				})
			],
			build: {
				lib: {
					entry: './src/index.ts',
					name: 'Live2dViewer',
					fileName: 'index',
					formats: ['es', 'cjs'],
				},
				rollupOptions: {
					external: ['react', 'react-dom'],
				},
			},
		};
	}
});