docker build -t sunniesoweb:latest ./server
docker save -o sunniesoweb_image.tar sunniesoweb
tar -cvf docker_packed.tar sunniesoweb_image.tar config.env
echo "tar file created: docker_packed.tar"
echo ""

REMOTE="ubuntu@ec2-3-20-111-241.us-east-2.compute.amazonaws.com:./sunnieso/."
echo "Sending over docker image and config to remote machine..."
scp -i ~/sunnieso_ec2_key.pem docker_packed.tar $REMOTE
scp -i ~/sunnieso_ec2_key.pem unpack_n_run.sh $REMOTE
echo ""

echo "Cleanup generated tar files..."
rm sunniesoweb_image.tar docker_packed.tar
