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
                    echo 'Iniciando el servidor de Appium...'
                    // Usamos cmd start para asegurar que corra en un proceso separado estable
                    bat 'start /b cmd /c npx appium --port 4723'
                    
                    echo 'Esperando a que Appium esté completamente listo (8 segundos)...'
                    sleep(time: 8, unit: 'SECONDS')
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
                echo 'Cerrando procesos de Node/Appium activos...'
                try {
                    bat 'taskkill /f /im node.exe'
                } catch (e) {
                    echo 'No hay procesos de node activos o ya se cerraron.'
                }
            }
            
            // Genera y publica el reporte de Allure en Jenkins de manera automática
            allure includeProperties: false,
                   results: [[path: 'allure-results']],
                   reportBuildPolicy: 'ALWAYS',
                   reportName: 'Allure Report - Android'
        }
    }
}