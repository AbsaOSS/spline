module.exports = {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": [
        "<rootDir>/src/setup-jest.ts"
    ],
    "transformIgnorePatterns": [
        "node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic)"
    ],
    "coverageReporters": [
        "text",
        "html",
        "cobertura"
    ],
    "moduleNameMapper": {
    },
    "resolver": null,
    "globals": {
        "ts-jest": {
            tsConfig: "<rootDir>/src/tsconfig.spec.json"
        }
    }
};
