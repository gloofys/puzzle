// jest.config.cjs
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },

    transformIgnorePatterns: [
        'node_modules/(?!(react-dnd|react-dnd-test-backend|dnd-core|@react-dnd)/)',
    ],
    moduleNameMapper: {
        '\\.(css|sass|scss)$': 'identity-obj-proxy',
        '\\.(png|jpe?g|gif|svg|mp3)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
