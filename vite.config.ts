import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
	if (mode === 'development') {
		return {
			base: '/ena-live2d-viewer/',
			plugins: [react()],
			root: './dev',
		};
	} else {
		return {
			plugins: [react()],
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