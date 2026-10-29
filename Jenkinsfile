pipeline {
    agent any

    tools {
        nodejs 'NodeJS20' // Asegúrate de que coincida con el nombre en tu configuración de Jenkins
    }

    environment {
        // Define el nombre exacto de tu emulador (el que ves al ejecutar 'emulator -list-avds' en tu terminal)
        ANDROID_EMULATOR = 'emulator' 
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Iniciar Emulador Android') {
            steps {
                script {
                    // Ejecuta el emulador en segundo plano sin interfaz gráfica (headless con '-no-window') 
                    // y con '-no-audio' para ahorrar recursos. Ajusta la ruta del SDK si es necesario.
                    bat '''
                    start /b emulator -avd %ANDROID_EMULATOR% -no-window -no-audio -gpu off
                    '''
                    
                    // Comando de ADB para esperar a que el emulador encienda y responda al 100%
                    echo 'Esperando a que el emulador arranque...'
                    bat 'adb wait-for-device'
                    
                    // Bucle extra para asegurar que Android terminó de cargar el escritorio virtual
                    bat '''
                    :check_boot
                    for /f "delims=" %%i in ('adb shell getprop sys.boot_completed') do set BOOT=%%i
                    if "%BOOT%"=="1" (
                        echo Emulador listo y operativo.
                    ) else (
                        timeout /t 5 >nul
                        goto check_boot
                    )
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
                   
            // Apagar el emulador ordenadamente al terminar la ejecución
            bat 'adb emu kill' catchError: true
        }
    }
}