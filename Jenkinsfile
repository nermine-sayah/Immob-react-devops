pipeline {
    agent any
    stages {
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t immob-backend .'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t immob-frontend .'
                }
            }
        }
    }
}
