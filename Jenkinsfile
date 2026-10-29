pipeline {
    agent any

    tools {
        nodejs 'NodeJS20' // 🔹 Coincide exactamente con el nombre que pusiste en Jenkins
    }

    environment {
        ANDROID_EMULATOR = 'Modelo_Estandar_Aplicaciones_Moviles_I' 
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Iniciar Emulador Automáticamente') {
            steps {
                script {
                    echo 'Iniciando el emulador en segundo plano...'
                    bat 'start /b emulator -avd %ANDROID_EMULATOR% -no-window -no-audio -gpu off'
                    
                    echo 'Esperando a que el dispositivo responda...'
                    bat 'adb wait-for-device'
                    
                    echo 'Esperando a que Android termine de cargar el sistema...'
                    bat '''
                    :check_boot
                    for /f "delims=" %%i in ('adb shell getprop sys.boot_completed') do set BOOT=%%i
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
                        sh 'npm test'
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
                   results: 'allure-results',
                   reportBuildPolicy: 'ALWAYS',
                   reportName: 'Allure Report - Android'
                   
            // Apaga el emulador automáticamente al terminar
            script {
                try {
                    echo 'Apagando el emulador...'
                    bat 'adb emu kill'
                } catch (e) {
                    echo 'El emulador ya estaba apagado.'
                }
            }
        }
    }
}