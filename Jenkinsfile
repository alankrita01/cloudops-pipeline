pipeline {
  agent any

  environment {
    IMAGE_NAME = 'cloudops-pipeline'
    IMAGE_TAG = "${env.BUILD_NUMBER}"
    REGISTRY = 'docker.io'
    REGISTRY_NAMESPACE = 'your-dockerhub-user'
    FULL_IMAGE = "${REGISTRY_NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

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

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $FULL_IMAGE .'
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-credentials',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASSWORD'
        )]) {
          sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USER" --password-stdin'
          sh 'docker push $FULL_IMAGE'
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          ansible-playbook -i ansible/inventory.ini ansible/deploy.yml \
            -e image_name=$REGISTRY_NAMESPACE/$IMAGE_NAME \
            -e image_tag=$IMAGE_TAG
        '''
      }
    }
  }

  post {
    always {
      sh 'docker logout || true'
    }
  }
}

