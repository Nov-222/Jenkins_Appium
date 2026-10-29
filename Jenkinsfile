pipeline {
    agent any

    tools {
        // Asegúrate de que coincida con el nombre de tu instalación de NodeJS en Jenkins
        nodejs 'NodeJS20'
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                // Instalación limpia usando package-lock.json para entornos CI/CD
                sh 'npm ci'
            }
        }

        stage('Ejecutar Pruebas Appium') {
            steps {
                script {
                    // Try-catch para asegurar que si una prueba falla, el pipeline 
                    // continúe a la etapa de generación del reporte Allure
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
            // Publica el reporte de Allure en la interfaz de Jenkins
            allure includeProperties: false,
                   results: 'allure-results',
                   reportBuildPolicy: 'ALWAYS',
                   reportName: 'Allure Report - Android Appium'
        }
    }
}