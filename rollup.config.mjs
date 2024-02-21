import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import svgr from '@svgr/rollup'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import url from '@rollup/plugin-url'
import alias from '@rollup/plugin-alias'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const projectRootDir = path.resolve(__dirname)

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
    },
    plugins: [
        resolve(),
        commonjs(),
        svgr(),
        typescript(),
        babel({ babelHelpers: 'bundled' }),
        postcss({ plugins: [] }),
        url(),
        alias({
            entries: [
                {
                    find: '@src',
                    replacement: path.resolve(projectRootDir, 'src'),
                },
                {
                    find: '@components',
                    replacement: path.resolve(
                        projectRootDir,
                        'src',
                        'components'
                    ),
                },
                {
                    find: '@assets',
                    replacement: path.resolve(projectRootDir, 'src', 'assets'),
                },
                {
                    find: '@constants',
                    replacement: path.resolve(
                        projectRootDir,
                        'src',
                        'constants'
                    ),
                },
                {
                    find: '@utils',
                    replacement: path.resolve(projectRootDir, 'src', 'utils'),
                },
            ],
        }),
    ],
}
