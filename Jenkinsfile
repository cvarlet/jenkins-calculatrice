pipeline {
    agent any
    stages {
        stage('Preparation') {
            steps {
                script {
                    try {
                        sh 'docker stop calculatrice-app'
                        sh 'docker rm calculatrice-app'
                    } catch (Exception e) {
                        echo "No existing container to stop/remove."
                    }
                }
            }
        }
        stage('Build') {
            steps {
                build job: 'BuildCalculatriceJob'
            }
        }
        stage('Results') {
            steps {
                build job: 'TestCalculatriceJob'
            }
        }
    }
}