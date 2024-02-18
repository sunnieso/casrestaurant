### TODO
- 煮麵的技巧
- 煮餃子的技巧
- 食譜放照片


### Deployment update
## AWS EC2
- EC2 instance name: `i-0954bf467d264004f (sunnieso_ec2)`
- Elastic IP: `3.20.111.241``
- run `pack.sh` to build docker image, save it, and send it over to EC2 instance
- ssh into the instance from my WSL 2 home directory `ssh -i "sunnieso_ec2_key.pem" ubuntu@ec2-3-20-111-241.us-east-2.compute.amazonaws.com`

- run `unpack_n_run.sh` in the remote machine to start the docker container.

## Azure (deleted)
Command to rebuild docker image and upload to Azure Container Registry:
`az acr build --registry sun50registory --image casrestaurant .`

## AWS ECS (deleted)
Command to rebuild coker image and update to AWS ECR
`docker tag casrestaurantweb_casrestaurant:latest 651166442832.dkr.ecr.us-east-2.amazonaws.com/sunnieprojects:latest`
`aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 651166442832.dkr.ecr.us-east-2.amazonaws.com`
`docker push 651166442832.dkr.ecr.us-east-2.amazonaws.com/sunnieprojects:latest`