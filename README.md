# A template for Google Apps Script Project

## REQUIREMENTS

- [mise](https://mise.jdx.dev/)

## USAGE

### SETUP

- install Node.js, pnpm dependencies and git hooks

  ```shell
  mise install
  ```

- login to clasp

  ```shell
  pnpm run clasp:login
  ```

- create new project

  ```shell
  pnpm run clasp:create
  ```

- clone project already exists

  ```shell
  pnpm run clasp:clone <SCRIPT_ID>
  ```

### COMMANDS FOR GAS

- list available tasks

  ```shell
  mise tasks
  ```

- run tests

  ```shell
  mise run test
  ```

- build project

  ```shell
  mise run build
  ```

- push project (lint, format, test and build are run first)

  ```shell
  mise run push
  ```

- pull project

  ```shell
  mise run pull
  ```

- open project on the web

  ```shell
  mise run open
  ```

- create new version

  ```shell
  mise run version
  ```

- list versions

  ```shell
  mise run version:list
  ```

- create new deployment

  ```shell
  mise run deploy
  ```

- list deployments

  ```shell
  mise run deploy:list
  ```
