# Overview

This side project is a template on how to utilize AWS AppSync Subscriptions with Amazon Bedrock.
![alt text](<appsync diagram.jpeg>)

# Prerequisites

1. Configure your AWS profile: export `AWS_PROFILE=<your-profile-name> `
2. Install dependencies: `npm install`
3. Request for Anthropic's Claude V2 foundational model in the AWS Management Console.
   ![alt text](image.png)

# Deploy and test

1. Deploy the serverless application: `npm run sls -- deploy`
2. Create a `.env` file and supply the `API_URL` environment variable with your corresponding GraphQL endpoint.
3. Deploy the serverless application again: `npm run sls -- deploy`
