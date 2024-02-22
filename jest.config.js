module.exports = {
    moduleNameMapper: {
        '\\.svg$': '<rootDir>/__mocks__/svg.js',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
    },

    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
        '^.+\\.svg$': 'jest-transformer-svg',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
}
