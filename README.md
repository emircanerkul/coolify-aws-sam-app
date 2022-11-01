# Coolify AWS SAM Application

This application was created to learn, practice, and explore the potential of AWS SAM with CLI.
> **Spoiler:** I really like *IT!*

This app uses AWS SAM, SES, S3, API Gateway, Lambda, CodeCommit, CodeBuild, CodeDeploy, and CodePipeline services.

After you trigger the URL it creates an image tailored for you and sends this coolified image's access URL to your email via AWS SES.

## How to Deploy

First, you need to have your email approved in AWS SES then change SESCrudPolicy IdentityName in template.yaml file and Source parameter in coolify.js file.

* `sam build`
* `sam deploy --guided`

## How to Deploy with CI/CD Pipelines

> Note: Required resources need to be fulfilled before deployment.

To deploy this template and connect to the main git branch, run this against the leading account:
* `sam deploy -t codepipeline.yaml --stack-name coolifier --capabilities=CAPABILITY_IAM`.

If later you need to deploy a new CodePipeline to connect to a non-main git branch, run
* `sam deploy -t codepipeline.yaml --stack-name coolifier --capabilities=CAPABILITY_IAM --parameter-overrides="FeatureGitBranch=<branch-name>`

> Special Thanks goes to EPAM & EPAM Learn Team for Giving me AWS Courses and TIME!