module.exports = {
    "setupFiles": [ "./test-setup.js" ],
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "moduleFileExtensions": [ "ts", "tsx", "js" ],
    "transform": {
        "^.+\\.(ts|tsx)$": "./test-preprocessor.js",
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    "testMatch": [ "./**/**/**/**test.tsx" ],
    rootDir: "./",
    "moduleNameMapper": {
        "^App(.*)": "<rootDir>/src/app/$1",
        "^Actions(.*)": "<rootDir>/src/redux/actions/$1",
        "^Api(.*)": "<rootDir>/src/redux/api/$1",
        "^Constants(.*)": "<rootDir>/src/constants/$1",
        "^Layouts(.*)": "<rootDir>/src/layouts/$1",
        "^Reducers(.*)": "<rootDir>/src/redux/reducers/$1",
        "^ReduxConstants(.*)": "<rootDir>/src/redux/constants/$1",
        "^Enums(.*)": "<rootDir>/src/enums/$1",
        "^Utilities(.*)": "<rootDir>/src/utilities/$1",
        "^Routes(.*)": "<rootDir>/src/routes/$1",
        "^.+\\.(css|less|scss)$": "babel-jest"
    },
}