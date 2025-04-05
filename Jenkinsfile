pipeline {
    agent any

    environment {
        AZURE_FUNCTIONAPP_NAME = 'HelloFunctionNK'
        AZURE_RESOURCE_GROUP = 'db-nk-rs'
    }

    tools {
        nodejs 'NodeJS 18'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm i'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Function App Package') {
            steps {
                sh '''
                mkdir -p package
                cd package
                cp -rf ../Jenkinsfile ../README.md ../host.json ../local.settings.json ../node_modules ../package-lock.json ../package.json ../src ./
                zip -r ../functionapp.zip .
                '''
            }
        }

        stage('Deploy to Azure') {
            steps {
                withCredentials([string(credentialsId: 'AZURE_SDK_AUTH_JSON', variable: 'AZURE_JSON')]) {
                    writeFile file: 'azureauth.json', text: AZURE_JSON
                    sh '''
                      az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                      az functionapp deployment source config-zip \
                        --resource-group $AZURE_RESOURCE_GROUP \
                        --name $AZURE_FUNCTIONAPP_NAME \
                        --src functionapp.zip
                    '''
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'functionapp.zip', fingerprint: true
        }
    }
}
