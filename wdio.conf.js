exports.config = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Modelo_Estandar_Aplicaciones_Moviles_I',
        'appium:platformVersion': '14.0', // O la versión de Android de tu emulador
        'appium:automationName': 'UiAutomator2',
        'appium:app': 'C:\\path\\to\\tu\\app.apk', // Reemplaza con la ruta a tu APK si es necesario
        'appium:noReset': true
    }],

    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://127.0.0.1',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // IMPORTANTE: Dejamos los servicios vacíos de Appium para evitar errores de ES Modules
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