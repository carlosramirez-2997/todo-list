pipeline {
    agent {
        docker {
            image 'node:24-alpine'
        }
    }
    tools {
        nodejs 'Node 24'
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
                sh 'npm run build'
            }
        }
    }
}
