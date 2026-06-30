# Project Explanation

## Project Title

CI/CD Pipeline for Dockerized Application Deployment on Kubernetes using Jenkins, Ansible, and AWS

## Simple Explanation

This project automates the deployment of a web application. When code is pushed to GitHub, Jenkins starts a pipeline. The pipeline tests the app, builds a Docker image, pushes that image to a registry, and uses Ansible to deploy the image to Kubernetes running on AWS.

## Role of Each Tool

**Jenkins** automates the pipeline.

**Docker** packages the app and all required runtime files into a container image.

**Kubernetes** runs the Docker container, keeps it healthy, and scales it.

**AWS** provides the cloud infrastructure where Kubernetes runs.

**Ansible** automates deployment commands and environment setup.

## Why Companies Use This

Manual deployment is slow and risky. A CI/CD pipeline makes deployment repeatable, faster, and less error-prone. Kubernetes helps keep the application available even if a container crashes. AWS provides scalable infrastructure, and Ansible makes setup repeatable.

## How To Explain In An Interview

I created a sample web application and built a DevOps pipeline around it. Jenkins pulls the code, runs tests, builds a Docker image, pushes it to a registry, and then triggers Ansible. Ansible applies Kubernetes manifests and updates the deployment image. Kubernetes runs the application on AWS and exposes it through a LoadBalancer service.

