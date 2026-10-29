pipeline {
    agent any

    tools {
        nodejs 'NODE22'
    }

    environment {
    ANDROID_HOME = 'C:\\Users\\arima\\AppData\\Local\\Android\\Sdk'
    APPIUM_HOME  = 'C:\\Users\\arima\\.appium'
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
                bat 'node -v'
                bat 'start /B cmd /c "npx appium --port 4723 > appium.log 2>&1"'
                powershell '''
                    $ok = $false
                    for ($i = 0; $i -lt 40; $i++) {
                        try {
                            Invoke-WebRequest -Uri http://127.0.0.1:4723/status -UseBasicParsing -TimeoutSec 2 | Out-Null
                            $ok = $true; break
                        } catch { Start-Sleep -Seconds 3 }
                    }
                    if (-not $ok) { Get-Content appium.log; throw "Appium no arrancó a tiempo" }
                    Write-Host "Appium listo"
                '''
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