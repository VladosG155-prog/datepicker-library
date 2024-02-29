import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import svgr from '@svgr/rollup'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import url from '@rollup/plugin-url'
import terser from '@rollup/plugin-terser'
import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const projectRootDir = path.resolve(__dirname)

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.es.js',
                format: 'es',
                exports: 'named',
            },
        ],
        plugins: [
            resolve(),
            postcss({
                minimize: true,
                modules: false,
                use: {
                    sass: null,
                    stylus: null,
                    less: { javascriptEnabled: true },
                },
                extract: true,
                config: {
                    path: './postcss.config.js',
                    ctx: null,
                },
                inject: {
                    insertAt: 'top',
                },
            }),
            commonjs(),
            svgr({ icon: true }),
            typescript(),
            babel({ babelHelpers: 'bundled' }),

            url(),
            alias({
                entries: [
                    {
                        find: '@src',
                        replacement: path.resolve(projectRootDir, 'src'),
                    },
                    {
                        find: '@components',
                        replacement: path.resolve(projectRootDir, 'src', 'components'),
                    },
                    {
                        find: '@assets',
                        replacement: path.resolve(projectRootDir, 'src', 'assets'),
                    },
                    {
                        find: '@constants',
                        replacement: path.resolve(projectRootDir, 'src', 'constants'),
                    },
                    {
                        find: '@utils',
                        replacement: path.resolve(projectRootDir, 'src', 'utils'),
                    },
                    {
                        find: '@decorators',
                        replacement: path.resolve(projectRootDir, 'src', 'decorators'),
                    },
                    {
                        find: '@hooks',
                        replacement: path.resolve(projectRootDir, 'src', 'hooks'),
                    },
                ],
            }),
            terser(),
        ],
        external: ['react', 'react-dom'],
    },
    {
        input: `dist/types/index.d.ts`,
        plugins: [dts()],
        external: [/\.css$/],
        output: {
            file: `dist/index.d.ts`,
            format: 'es',
        },
    },
]
