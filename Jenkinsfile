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
            // Genera y publica el reporte de Allure al finalizar
            allure includeProperties: false,
                   results: [[path: 'allure-results']],
                   reportBuildPolicy: 'ALWAYS',
                   reportName: 'Allure Report - Android'
        }
    }
}