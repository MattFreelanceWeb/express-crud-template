pipeline {
    agent any
    
    tools {
        nodejs "node.js"
        maven "maven"
    }

    stages {

        stage('Restore') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Tests') {
            steps {
                sh 'npm test'
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'coverage/lcov-report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
            }
        }

        // stage('Build') {
        //     steps {
        //         sh 'npm run dev'
        //     }
        // }
    }
    
    post {
    always {
      deleteDir()
    }
  }
}
