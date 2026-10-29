exports.config = {
    runner: 'local',
    port: 4723,
    
    // 🔹 Ajusta la ruta exacta según tu estructura de carpetas
    specs: [
        './test/specs/**/*.js'
    ],
    
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    maxInstances: 10,
    
    capabilities: [{
        platformName: 'Android',
        "appium:deviceName": "emulator",          
        "appium:automationName": "UiAutomator2",
        "appium:appPackage": "com.google.android.deskclock",  
        "appium:appActivity": "com.android.deskclock.DeskClock", 
        "appium:newCommandTimeout": 300,
        "appium:autoGrantPermissions": true
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    services: ['appium'],
    framework: 'mocha',
    
    // 🔹 Añadimos el reportero de Spec y Allure configurado
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
    },
}