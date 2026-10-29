pipeline {
    agent any

    tools {
        nodejs 'NodeJS20'
    }

    environment {
        ANDROID_HOME = 'C:\\Users\\arima\\AppData\\Local\\Android\\Sdk'
        ANDROID_EMULATOR = 'Modelo_Estandar_Aplicaciones_Moviles_I' 
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Iniciar Emulador Automáticamente') {
            steps {
                script {
                    echo 'Iniciando el servidor ADB desde la ruta absoluta...'
                    bat "\"%ANDROID_HOME%\\platform-tools\\adb.exe\" start-server"
                    
                    echo 'Iniciando el emulador de forma visible para depuración...'
                    bat "start \"\" \"%ANDROID_HOME%\\emulator\\emulator.exe\" -avd %ANDROID_EMULATOR% -no-audio -gpu off"
                    
                    echo 'Esperando a que el dispositivo responda...'
                    bat "\"%ANDROID_HOME%\\platform-tools\\adb.exe\" wait-for-device"
                    
                    echo 'Esperando a que Android termine de cargar el sistema...'
                    bat '''
                    :check_boot
                    for /f "delims=" %%i in ('"%ANDROID_HOME%\\platform-tools\\adb.exe" shell getprop sys.boot_completed') do set BOOT=%%i
                    if "%BOOT%"=="1" (
                        echo Emulador listo y operativo al 100%.
                    ) else (
                        timeout /t 5 >nul
                        goto check_boot
                    }
                    '''
                }
            }
        }

        stage('Ejecutar Pruebas Appium') {
            steps {
                script {
                    try {
                        bat 'npm test'
                    } catch (err) {
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
    }

    post {
        always {
            // Genera y publica el reporte de Allure
            allure includeProperties: false,
                   results: [[path: 'allure-results']],
                   reportBuildPolicy: 'ALWAYS',
                   reportName: 'Allure Report - Android'
                   
            // Apaga el emulador automáticamente al terminar
            script {
                try {
                    echo 'Apagando el emulador...'
                    bat "\"%ANDROID_HOME%\\platform-tools\\adb.exe\" emu kill"
                } catch (e) {
                    echo 'El emulador ya estaba apagado.'
                }
            }
        }
    }
}