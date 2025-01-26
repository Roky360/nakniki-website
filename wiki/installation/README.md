# Nakniki-Netflix - Installation

_Avi Ben David, Eden Shaked, Kfir Eitan._

This document explains how to run the entire project.

The system consists of 4 GitHub repositories:
- Recommendation server ([project-netflix](https://github.com/Roky360/project-netflix))
- Web server ([nakniki-web-server](https://github.com/Roky360/nakniki-web-server))
- React website ([nakniki-website](https://github.com/Roky360/nakniki-website))
- Android application ([nakniki-app](https://github.com/Roky360/nakniki-app))

You may also visit our [Jira](https://edenshkd.atlassian.net/jira/software/projects/NP/boards/2/backlog) to find out about our journey of making this project :P

Below are the system requirements to run the project, and how to set up and run each part.
Note that this is a summarized guide focusing on how to run the entire system. For more information, feel free to visit
the readme of each repository.

## Requirements

* Docker Desktop
* MongoDB Server
* Java 18 or above
* Emulated or real Android device with **Android 8.0 or above**.

## 1. Recommendation server

Clone the [project-netflix](https://github.com/Roky360/project-netflix) repo with:
```bash
git clone https://github.com/Roky360/project-netflix.git
```

Set a port in the env file that the recommendation server will run on in localhost.
Then, in the root directory, run:
```bash
docker-compose up app -d
```

## 2. Web server & React website

The web server and the website runs together (the web server serves the website statically).

First, clone the [nakniki-web-server](https://github.com/Roky360/nakniki-web-server) and [nakniki-website](https://github.com/Roky360/nakniki-website)
repositories, with:
```bash
git clone https://github.com/Roky360/nakniki-web-server.git
```
```bash
git clone https://github.com/Roky360/nakniki-website.git
```

### Run MongoDB

Simply make sure that **MongoDB Server** is up and running.

### Bundle the website with the web-server
In the **website**'s root directory, create a build with:
```bash
npm run build
```

This will create a `build` directory. Copy its contents (not the folder, just its contents) to the `public` directory 
of the **web server** (if there is no "public" directory, create one).

### Setup web-server

Configure an env file to the **web server** and then run it by following steps 3, 4 in its README file.

TODO build docker for server & react and put instructions here
-

Now the website is available at localhost at the port you set.

## 3. Android app

Clone the [nakniki-app](https://github.com/Roky360/nakniki-app) repo with:
```bash
git clone https://github.com/Roky360/nakniki-app.git
```

TODO: how to deploy it??
-



**Now the system should be up and running, and you can start using the website and app using the guides in the "usage"
folder.**

We wish you happy Nakniki-time watching movies in our nakniki-website and nakniki-app :)
