exports.config = {
    runner: 'local',
    
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],

    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Modelo_Estandar_Aplicaciones_Moviles_I',
        'appium:udid': 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.google.android.deskclock',
        'appium:appActivity': 'com.android.deskclock.DeskClock',
        'appium:appWaitActivity': '*',
        'appium:noReset': true
    }],

    // Configuración explícita de conexión a Appium
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [],

    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};