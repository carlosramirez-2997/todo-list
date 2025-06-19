pipeline {
    agent {
        docker {
            image 'node:20-alpine'
        }
    }
    tools {
        nodejs 'Node 20'
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run start-server'
            }
        }
    }
}
