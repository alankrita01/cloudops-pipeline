# AWS EKS Setup Guide

This project can be deployed on AWS using Amazon EKS.

## Recommended AWS Services

- **EKS**: managed Kubernetes cluster
- **ECR**: private Docker image registry
- **EC2 worker nodes or Fargate**: compute for pods
- **IAM**: permissions for Jenkins, EKS, and ECR
- **Elastic Load Balancing**: public traffic to the app

## High-Level Steps

1. Create an EKS cluster.
2. Configure `kubectl` access to the cluster.
3. Create a container registry in ECR or use Docker Hub.
4. Store registry credentials in Jenkins.
5. Update `Jenkinsfile` image registry values.
6. Run the Jenkins pipeline.
7. Check the Kubernetes LoadBalancer URL.

## Example EKS Commands

```bash
aws eks update-kubeconfig --region ap-south-1 --name your-cluster-name
kubectl get nodes
kubectl get svc -n cloudops
```

## Jenkins Credentials Needed

- Docker Hub or AWS ECR credentials
- AWS credentials if Jenkins must access EKS directly
- Kubeconfig or IAM role access for Kubernetes deployment

