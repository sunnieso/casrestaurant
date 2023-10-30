### TODO
- 煮麵的技巧
- 煮餃子的技巧
- 食譜放照片


### Deployment update
## Azure
Command to rebuild docker image and upload to Azure Container Registry:
`az acr build --registry sun50registory --image casrestaurant .`

## AWS
Command to rebuild coker image and update to AWS ECR
`docker tag casrestaurantweb_casrestaurant:latest 651166442832.dkr.ecr.us-east-2.amazonaws.com/sunnieprojects:latest`
`aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 651166442832.dkr.ecr.us-east-2.amazonaws.com`
`docker push 651166442832.dkr.ecr.us-east-2.amazonaws.com/sunnieprojects:latest`