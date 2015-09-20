exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:9515/',
    specs: ['e2e/**/*.js'],
    capabilities: {
        browserName: 'android',
        autoWebview: true,
        chromeOptions: {
            androidActivity: "com.ionicframework.myapp.MainActivity",
            androidPackage: "com.ionicframework.myapp"
        }
    },
    onPrepare: function() {
        var jasmineReporters = require('jasmine-reporters');
        var junitReporter = new jasmineReporters.JUnitXmlReporter({
            savePath: 'bin/test',
            consolidateAll: false,
            filePrefix: 'TESTS-E2E-'
        });
        jasmine.getEnv().addReporter(junitReporter);
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
}
