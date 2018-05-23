# SummitSync Development Environment

## Install Deps/Build Code
```bash
# Build common SummitSync code
cd code.summitsync.com
npm install
gulp

# Link code & build
cd ../crossbar.summitsync.com
npm link ../code.summitsync.com
npm install
gulp

# Link code & build
cd ../fe.summitsync.com
npm link ../code.summitsync.com
npm install
# Start up the front-end on localhost:8080
npm start
```
Now the frontend is running, but we need to turn on crossbar with a little help from docker. 


## Run crossbar.summitsync.com with Docker

### Build scdp-crossbar docker image
From this directory, build the Docker image: 
```bash
sudo docker build -t scdp-crossbar -f Dockerfile .
```
This image extends the `crossbario/crossbar:cpy3-18.3.1` image, which will get pulled automatically when you build our version. It is based on alpine linux.

*Verify* 
To make sure that the build worked, run `docker images`. You should see the following images listed:
```bash
scdp-crossbar         latest
crossbario/crossbar   cpy3-18.3.1
```

### Run scdp-crossbar
Now we can use the `scdp-crossbar` image like so. Again, run this from the root directory (this one), or adjust your host volume paths accordingly.

```bash
sudo docker run \
        -v ${PWD}/crossbar.summitsync.com:/node \
        -v ${PWD}/code.summitsync.com:/code.summitsync.com \
        -p 9090:9090 \
        --name crossbar \
        --rm -it scdp-crossbar
```

_todo_ Move this whole thing to docker-compose, along with containerizing the above mentioned processes as well.