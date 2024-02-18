echo "Unpacking the tar file  ~/sunnieso/docker_packed.tar ..."
tar -xvf ~/sunnieso/docker_packed.tar -C ~/sunnieso
echo "Loading the docker image tar file: ~/sunnieso/docker_packed.tar"
docker load -i ~/sunnieso/sunniesoweb_image.tar

# Specify the name or ID of your Docker container
container_name="sunniesoweb"

# Check if the container exists
if docker ps -a --format '{{.Names}}' | grep -q $container_name; then
    # Container exists, stop and remove it
    echo "Stopping and removing the existing container: $container_name"
    docker stop $container_name && docker rm $container_name
fi

echo "Running new container $container_name at port 80"
docker run -d -p 80:8081 --env-file config.env --name $container_name sunniesoweb:latest