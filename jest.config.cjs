module.exports = {
    moduleNameMapper: {
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',

        '^.+\\.svg$': 'jest-transform-stub',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/svgTransformer.js',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
}
