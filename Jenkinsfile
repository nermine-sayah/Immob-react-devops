pipeline {
    agent any

    // Paramètre pour déclencher le pipeline versionné
    parameters {
        string(name: 'TAG', defaultValue: '', description: 'Version tag (vX.Y.Z)')
    }

    environment {
        BACKEND_IMAGE = "immob-backend:${env.BUILD_NUMBER}"
        FRONTEND_IMAGE = "immob-frontend:${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = "" // si tu veux pousser sur DockerHub
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checkout du code..."
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                echo "Setup environnement..."
                sh 'docker --version'
                sh 'docker-compose --version || echo "docker-compose pas installé"'
            }
        }

        stage('Build Backend Docker') {
            steps {
                echo "Build du backend..."
                sh 'docker build -t $BACKEND_IMAGE ./backend'
            }
        }

        stage('Build Frontend Docker') {
            steps {
                echo "Build du frontend..."
                sh 'docker build -t $FRONTEND_IMAGE .'
            }
        }

        stage('Run Containers') {
            steps {
                echo "Lancement des containers..."
                // Stoppe et supprime les anciens containers si existants
                sh 'docker rm -f backend_container || true'
                sh 'docker rm -f frontend_container || true'

                // Lance les nouveaux containers
                sh 'docker run -d --name backend_container -p 5000:5000 $BACKEND_IMAGE'
                sh 'docker run -d --name frontend_container -p 80:80 $FRONTEND_IMAGE'
            }
        }

        stage('Smoke Test') {
            steps {
                echo "Smoke test..."
                // Test simple pour vérifier que l'API backend répond
                script {
                    def response = sh(script: "curl -s -o /dev/null -w \"%{http_code}\" http://localhost:5000/api/test", returnStdout: true).trim()
                    if (response != "200") {
                        error "Smoke test échoué : code HTTP ${response}"
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo "Archiver les artefacts..."
                archiveArtifacts artifacts: '**/dist/**', allowEmptyArchive: true
                archiveArtifacts artifacts: '**/backend/**', allowEmptyArchive: true
            }
        }

        stage('Cleanup') {
            steps {
                echo "Nettoyage..."
                sh 'docker rm -f backend_container frontend_container || true'
                sh 'docker rmi $BACKEND_IMAGE $FRONTEND_IMAGE || true'
            }
        }
    }

    post {
        always {
            echo "Fin du pipeline : vérifier les logs et artefacts"
        }
        success {
            echo "Pipeline Passed ✅"
        }
        failure {
            echo "Pipeline Failed ❌"
        }
    }
}
