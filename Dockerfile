FROM node:10

# create the application directory
WORKDIR /usr/src/app

# copy package (package.json and package-lock.json) files into application container
COPY ["package.json", "yarn.lock", "./"]

#copy all local files into container
COPY . .

# run the installer to install all dependencies
RUN yarn install

# compile all es6 to es5
RUN yarn build

# expose application default port
EXPOSE 3000

# start the application
CMD [ "yarn", "start:dev" ]
