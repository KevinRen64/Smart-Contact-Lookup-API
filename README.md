# Smart Contact Lookup API (AWS Lambda + RDS + API Gateway)

A serverless contact lookup API built using **AWS Lambda**, **Amazon RDS (MySQL)**, and **API Gateway**, deployed with **AWS SAM**.

## 🛠 Features

- Retrieves contact details by ID via REST API
- MySQL database hosted in Amazon RDS
- VPC-enabled Lambda function
- IAM-based security
- CloudWatch logging
- Deployed using AWS SAM

## 🚀 Live API

[Click to Test getContactById](https://bzkqk5ka4j.execute-api.ap-southeast-2.amazonaws.com/Prod/contact/2)

## 📁 Project Structure

- `index.js` – Lambda function code
- `template.yaml` – SAM template


## 📦 Install & Deploy (SAM CLI)

```bash
sam build
sam deploy --guided
