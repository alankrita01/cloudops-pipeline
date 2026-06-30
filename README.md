# CloudOps Pipeline

End-to-end DevOps CI/CD pipeline using **Jenkins, Docker, Kubernetes, AWS, and Ansible** to deploy a containerized web application.

## Project Overview

CloudOps Pipeline is a hands-on DevOps project that demonstrates how a web application can be tested, containerized, pushed to a registry, and deployed to Kubernetes using an automated CI/CD workflow.

The application itself is intentionally simple. The main focus of this project is the DevOps process around the application:

- Source code management with GitHub
- CI/CD automation with Jenkins
- Containerization with Docker
- Deployment automation with Ansible
- Container orchestration with Kubernetes
- Cloud deployment target using AWS EKS

## Architecture

```text
Developer pushes code to GitHub
            |
            v
      Jenkins Pipeline
            |
            v
   Install dependencies
            |
            v
        Run tests
            |
            v
   Build Docker image
            |
            v
 Push image to Docker Hub/ECR
            |
            v
    Run Ansible playbook
            |
            v
 Deploy to Kubernetes on AWS
            |
            v
 Expose app through Load Balancer
```

## Tech Stack

| Tool | Purpose |
| --- | --- |
| Node.js | Sample web application |
| Jenkins | CI/CD pipeline automation |
| Docker | Container image creation |
| Kubernetes | Container deployment and scaling |
| Ansible | Deployment automation |
| AWS EKS | Managed Kubernetes cluster |
| Docker Hub / AWS ECR | Docker image registry |
| GitHub | Source code repository |

## Project Structure

```text
.
├── app/
│   ├── server.js
│   └── server.test.js
├── ansible/
│   ├── inventory.ini
│   └── deploy.yml
├── docs/
│   ├── aws-eks-setup.md
│   └── project-explanation.md
├── k8s/
│   ├── namespace.yml
│   ├── deployment.yml
│   ├── service.yml
│   ├── hpa.yml
│   └── ingress.yml
├── Dockerfile
├── Jenkinsfile
├── package.json
└── README.md
```

## Application Endpoints

| Endpoint | Description |
| --- | --- |
| `/` | Home page showing the DevOps pipeline tools |
| `/health` | Health check endpoint used by Kubernetes probes |

Example health response:

```json
{
  "status": "ok",
  "service": "cloudops-pipeline",
  "version": "1.0.0"
}
```

## Run Locally

### Prerequisites

- Node.js 20 or newer
- npm

### Commands

```bash
npm install
npm test
npm start
```

Open the app:

```text
http://localhost:3000
```

Open the health endpoint:

```text
http://localhost:3000/health
```

## Run With Docker

### Build Docker Image

```bash
docker build -t cloudops-pipeline:local .
```

### Run Docker Container

```bash
docker run -p 3000:3000 cloudops-pipeline:local
```

Open:

```text
http://localhost:3000
```

## Push Docker Image To Registry

Use Docker Hub or AWS ECR. For Docker Hub:

```bash
docker login
docker build -t your-dockerhub-username/cloudops-pipeline:latest .
docker push your-dockerhub-username/cloudops-pipeline:latest
```

Update the Kubernetes deployment image in `k8s/deployment.yml`:

```yaml
image: your-dockerhub-username/cloudops-pipeline:latest
```

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster
- kubectl configured
- Docker image available in Docker Hub or AWS ECR

### Deploy

```bash
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml
kubectl apply -f k8s/hpa.yml
```

### Verify

```bash
kubectl get pods -n cloudops
kubectl get deployment -n cloudops
kubectl get svc -n cloudops
```

If using a cloud Kubernetes cluster, the service will create a Load Balancer.

## Ansible Deployment

The Ansible playbook applies Kubernetes manifests and updates the running deployment image.

```bash
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml \
  -e image_name=your-dockerhub-username/cloudops-pipeline \
  -e image_tag=latest
```

## Jenkins CI/CD Pipeline

The `Jenkinsfile` contains the CI/CD workflow.

Pipeline stages:

1. Checkout source code from GitHub
2. Install Node.js dependencies
3. Run application tests
4. Build Docker image
5. Push Docker image to registry
6. Deploy to Kubernetes using Ansible

### Jenkins Credentials Required

Create Jenkins credentials for Docker Hub:

```text
Credential ID: dockerhub-credentials
Type: Username with password
```

If deploying to AWS EKS, Jenkins also needs AWS/kubeconfig access.

## AWS Deployment Plan

Recommended AWS services:

- **Amazon EKS** for Kubernetes
- **Amazon ECR** or Docker Hub for image registry
- **IAM** for permissions
- **Elastic Load Balancer** through Kubernetes Service
- **EC2** if Jenkins is hosted on AWS

High-level AWS flow:

```text
Create EKS cluster
Configure kubectl
Push Docker image to registry
Apply Kubernetes manifests
Expose app with LoadBalancer service
Point domain DNS to Load Balancer
```

## Domain Setup

If using a GoDaddy domain, point the domain to the AWS Load Balancer after Kubernetes deployment.

Example DNS record:

```text
Type: CNAME
Name: www
Value: your-aws-load-balancer-url
```

## What This Project Demonstrates

- CI/CD pipeline design
- Docker image creation
- Kubernetes deployment configuration
- Kubernetes health checks
- Horizontal pod autoscaling
- Ansible automation
- AWS cloud deployment planning
- GitHub-based DevOps workflow

## Resume Description

Built an end-to-end CI/CD pipeline using Jenkins, Docker, Kubernetes, AWS, and Ansible to automate testing, Docker image creation, registry publishing, and Kubernetes deployment of a sample web application.

## Interview Explanation

This project uses a simple Node.js application as the deployable artifact. Jenkins automates the CI/CD process by running tests, building a Docker image, pushing it to a registry, and triggering Ansible. Ansible applies Kubernetes manifests and updates the deployment. Kubernetes runs the containerized application and exposes it using a LoadBalancer service on AWS.

## Current Status

Completed:

- Local Node.js application
- Automated tests
- Dockerfile
- Jenkinsfile
- Kubernetes manifests
- Ansible deployment playbook
- AWS deployment documentation

Pending for full live deployment:

- Push repository to GitHub
- Push Docker image to Docker Hub or AWS ECR
- Create AWS EKS cluster
- Run Jenkins pipeline against the live cluster
- Connect GoDaddy domain to AWS Load Balancer

