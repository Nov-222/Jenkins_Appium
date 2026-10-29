pipeline {
    agent any

    tools {
        nodejs 'NodeJS20'
    }

    environment {
        ANDROID_HOME = 'C:\\Users\\arima\\AppData\\Local\\Android\\Sdk'
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Verificar Emulador Activo') {
            steps {
                script {
                    echo 'Verificando dispositivos conectados mediante ADB...'
                    bat "\"%ANDROID_HOME%\\platform-tools\\adb.exe\" devices"
                }
            }
        }

        stage('Iniciar Appium Server') {
            steps {
                script {
                    echo 'Iniciando el servidor de Appium en segundo plano...'
                    bat 'start /b npx appium --port 4723'
                    
                    echo 'Esperando a que Appium esté listo en el puerto 4723...'
                    // Pequeña pausa de seguridad para que el servidor acepte conexiones
                    sleep(time: 5, unit: 'SECONDS')
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
            script {
                echo 'Intentando cerrar procesos de Appium...'
                try {
                    bat 'taskkill /f /im node.exe'
                } catch (e) {
                    echo 'No hay procesos de node activos o ya se cerraron.'
                }
            }
            
            // Genera y publica el reporte de Allure al finalizar
            allure includeProperties: false,
                   results: [[path: 'allure-results']],
                   reportBuildPolicy: 'ALWAYS',
                   reportName: 'Allure Report - Android'
        }
    }
}