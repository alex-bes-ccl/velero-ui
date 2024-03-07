# Velero-UI

> [!WARNING]  
**Attention Users:** This project is in active development, and certain tools or features might still be under construction. We kindly urge you to exercise caution while utilizing the tools within this environment. While every effort is being made to ensure the stability and reliability of the project, there could be unexpected behaviors or limited functionalities in some areas.
We highly recommend thoroughly testing the project in non-production or sandbox environments before implementing it in critical or production systems. Your feedback is invaluable to us; if you encounter any issues or have suggestions for improvement, please feel free to [report them](https://github.com/seriohub/velero-ui/issues). Your input helps us enhance the project's performance and user experience.
Thank you for your understanding and cooperation.

![alt text](/screenshots/dashboard.png)

Other screenshots:

* [Schedules managment](/screenshots/schedules.png)
* [Create/Edit Schedule](/screenshots/create_schedule.png)
* [Storage Class Map](/screenshots/storage_class_map.png)
* [Login](/screenshots/login.png)

## Description

This project was created to simplify through a user interface some velero backup operations. This project needs the [velero-api](https://github.com/seriohub/velero-api) project.

## Features

  1. Intuitive usability

  2. Real-time dashboard and monitoring

  3. Backups management

  4. Restores management

  5. Schedules management

  6. Storage class map

  7. Restic features (check locks, unlock, unlock --remove-all)

  see [changelog](CHANGELOG.md) for details.

## Configuration

| FIELD                                 | TYPE   | DEFAULT                   | DESCRIPTION                                                              |
|---------------------------------------|--------|---------------------------|--------------------------------------------------------------------------|
| `NEXT_PUBLIC_REFRESH_DATATABLE_AFTER` | Number | 1500                      | Milliseconds delay for datatable update after each operation.            |
| `NEXT_PUBLIC_REFRESH_RECENT`          | Number | 5000                      | Polling **task in progress** updates in milliseconds.                    |
| `NEXT_PUBLIC_VELERO_API_URL`          | String | <http://127.0.0.1:8001>   | Url to http [velero-api](https://github.com/seriohub/velero-api) project |
| `NEXT_PUBLIC_VELERO_API_WS`           | String | ws://127.0.0.1:8001       | Url to ws [velero-api](https://github.com/seriohub/velero-api) project   |

## Installation

Clone the repository:

  ``` bash
  git clone https://github.com/seriohub/velero-ui.git
  cd velero-ui
  ```

### Run native

#### Requirements

* Nodejs
* YARN

1. Navigate to the [src](src) folder

2. Dependencies installation:

    ``` bash
    yarn
    ```

3. Run development

    ``` bash
    yarn run dev
    ```

### Run in Kubernetes 

#### Install with HELM

   See [helm readme](https://github.com/seriohub/velero-ui/tree/main/helm)

#### Install with Kubernetes YAML

1. Setup docker image:

    >   [!INFO]  
    You can use skip the *Setup docker image* and use a deployed image published on DockerHub.</br>
    Docker hub: <https://hub.docker.com/r/dserio83/velero-ui>

   1. Navigate to the root folder
   2. Build image

      ``` bash
      docker build --target velero-ui -t <your-register>/<your-user>/velero-ui:<tag> -f ./docker/Dockerfile .
      ```

   3. Push image

        ``` bash
        docker push <your-register>/<your-user>/velero-ui --all-tags
        ```

      >   [!INFO]  
      In case you run the custom build of the image and use the files inside the k8s folder to deploy to kubernetes, remember to update in the 20_deployment.yaml file with references for the built image

2. Kubernetes create objects

   1. Navigate to the [k8s](k8s) folder

   2. Create namespace (If it does not exist, the namespace should already be created if you have installed the [Velero API](https://github.com/seriohub/velero-api)):

      ``` bash
      kubectl create ns velero-ui
      ```

   3. Create the ConfigMap:

      >   [!WARNING]  
      Set the parameters in the [10_config_map.yaml](k8s/10_config_map.yaml) file before applying it according to your environment.</br>
      You need to set **NEXT_PUBLIC_VELERO_API_URL** and **NEXT_PUBLIC_VELERO_API_WS** to the port of the Velero API service.

      ``` bash
      kubectl apply -f 10_config_map.yaml -n velero-ui
      ```

   4. Create the deployment:

      ``` bash
      kubectl apply -f 20_deployment.yaml -n velero-ui
      ```

   5. Create the service:

      >   [!WARNING]  
      Customizes the [30_service_lb.yaml](k8s/30_service_lb.yaml) or [30_service_nodeport.yaml](k8s/30_service_nodeport.yaml) file before applying it according to your environment.

      ``` bash
      kubectl apply -f 30_service_lb.yaml -n velero-ui
      ```

      or

      ``` bash
      kubectl apply -f 30_service_nodeport.yaml -n velero-ui
      ```

## Test Environment

The project is developed, tested and put into production on several clusters with the following configuration

1. Kubernetes v1.28.2
2. Velero Server 1.11.1/Client v1.11.1
3. Velero Server 1.12.1/Client v1.12.1

## How to Contribute

1. Fork the project
2. Create your feature branch

    ``` bash
    git checkout -b feature/new-feature
    ```

3. Commit your changes

    ``` bash
   git commit -m 'Add new feature'
   ```

4. Push to the branch

    ``` bash
   git push origin feature/new-feature
   ```

5. Create a new pull request

## License

This project is licensed under the [Apache 2.0 license](LICENSE).

---

Feel free to modify this template according to your project's specific requirements.

In case you need more functionality, create a PR. If you find a bug, open a ticket.
