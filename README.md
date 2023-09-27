# NEXT-STATIC-WEBSITE TEMPLATE (08/2023) 🎯

<!-- TOC -->

-   [Content](#content)
    -   [Prerequisites 🔨](#prerequisites-)
    -   [Installing dependencies 📦](#installing-dependencies-)
    -   [CSS build 📦](#css-build-)
    -   [CSS usage](#css-usage)
    -   [Workflow 🗳️](#Workflow-%EF%B8%8F)
    -   [Additional notices 📎](#additional-notices-)
    -   [Folder structure 📁](#folder-structure-)
    -   [Cypress](#cypress-)
    -   [Fixtures 📄](#fixtures-)
    -   [Modules 🗃️](#modules-%EF%B8%8F)
    -   [Pages 🔖](#pages-)
    -   [Public 📚](#public-)
    -   [Shared 🔓](#shared-)
    -   [Storybook 📖](#storybook-)
    -   [Styles 🖌️](#styles-%EF%B8%8F)
    -   [Types ⚒️](#types-%EF%B8%8F)
    -   [UI 💻](#ui-)
    -   [Troubleshooting](#troubleshooting)
    -   [Writing translations](#writing-translations)

<!-- /TOC -->

## Prerequisites 🔨

To run locally you need to have **Node.js** and **yarn**

## Installing dependencies 📦

### App 📂

In order to install project dependencies for the App run the following command from the project root:

```
yarn install
```

### Localization

In order to run localization and dev server dependent on it, you need to install [entr](https://formulae.brew.sh/formula/entr), a command line utility for running running tasks after files specified in the glob pattern, change.

```bash
brew install entr
```

## Running the project 🚀

```
yarn dev
```

Run the project locally on mobile device or tablet:

```
yarn dev

http://192.168.1.13:8000/ or whatever ip address the project assigns
P.S. Watch out that your mobile/tablet device is on same network as your computer

```

The project will start automatically on a localhost with port 3000.

## CSS build 📦

We are using Tailwind CSS. Tailwind is a weird but functional approach to writing maintainable css. Please read the docs to familiarize yourselves:

https://tailwindcss.com/docs/installation

Writing Tailwind for the first time can be tricky. There are couple of plugins that can help you:

-   bradlc.vscode-tailwindcss - Tailwind CSS intellisense **(essential)**
-   alfredbirk.tailwind-documentation - Access documentation directly inside VSCode
-   kalimahapps.tailwind-config-viewer - View generated TWCSS config in sidebar

## NEXT.js App Router

Next.js uses App router as default. App router comes with new routing logic, but also new way of structuring React apps. Please read the following before writing any code:

https://nextjs.org/docs/getting-started/react-essentials

You can use `server-only` package in the project, to make sure server stuff stays on server. More info here: https://nextjs.org/docs/getting-started/react-essentials#the-server-only-package

## Git Workflow 🗳️

This project follows [Trunk Based Development](https://trunkbaseddevelopment.com/).

Deployments for this template are triggered automatically and they are triggered in two ways:

-   Deployment to **development/staging** is triggered when PR is merged to main.
-   Deployment to **production** is triggered when Release is published.

It's recommended to delete deploy workflow that you don't need, for example:

-   Delete `firebase` deploy workflows if you are deploying this project to vercel.
-   Delete `vercel` deploy workflows if you are deploying this project to firebase.

**Disclaimer**
For every deploy action you have the `start_action` variable set to `false` so that deploy actions don't run by default.
In order for deploy actions (firebase or vercel deploy) to start, you need to enable them by setting the `start_action` variable to `true`.

## Additional notices 📎

-   Ensure that no sensitive data is commited to the repository such as:
-   env files
-   service account files

## Folder structure 📁

Some folder are prepopulated with examples. You can delete them if you don't need them.

```
next-firebase
 ┣ 📂.github
 ┃  ┗ 📂workflows
 ┣ 📂.storybook
 ┣ 📂.vscode
 ┣ 📂app
 ┃  ┗ 📂_components
 ┃  ┗ 📂_fragments
 ┃  ┗ 📂view
 ┃     ┗ 📜page.tsx
 ┃  ┗ 📜page.tsx
 ┃  ┗ layout.tsx
 ┣ 📂cypress
 ┣ 📂modules
 ┃  ┗ 📂module
 ┃    ┗ 📂components
 ┃    ┗ 📂hooks
 ┃    ┗ 📂models
 ┃    ┗ 📂store
 ┃    ┗ 📂utils
 ┣ 📂public
 ┃  ┗ 📂assets
 ┃  ┗ 📂translations
 ┣ 📂stories
 ┣ 📂types

```

## Cypress 🧪

Cypress is test automation tool used for functional testing of web apps by automating browser actions. On static website we will test: design, does some elements exist, are links leading to correct site, viewport and responsivity of elements.
With Cypress we can create:

```
 - Unit tests
 - Integration tests
 - End to End tests
```

## Fixtures 📄

Fixtures folder is used for storing .json files used for local testing or mock database.

## Modules 🗃️

In this folder store modules for the app. One feature is one module. Every module should include 4folders:

```
 - components - folder for components.
 - hooks - folder for hooks.
 - models - folder for models.
 - store - folder for store(recoil).
```

Also you can have folders: styles, utils, services, http for module. It depends on project.

## App 🔖

App folder is the routing and all visual components of the app. If a folder is not a routing folder, but an organisational one, prefix it with \_, for example \_fragments. Use layout components extensively.

Read more about routing here: https://nextjs.org/docs/app/building-your-application/routing

Create view components in the `views` folder and just import the view you need in `pages`.

## Public 📚

In public/assets folder store:

```
 - Favicons are small 16x16px icon that serves as branding for your website. They are located in tabs,   - bookmarks, toolbar apps, etc.
 - Fonts
 - Icons are used to store svg icons in project. Store 16x16 and 24x24 versions of same icon.
 - Images
```

In public/translations are stored all compiled translations.

## Storybook 📖

Storybook is a development environment tool that is used as a playground for UI components. It allows developers to create and test components in isolation. It runs outside of the app so project dependencies won't affect the behaviour of components.

## Types ⚒️

Types folder is used for storing global types.

```
 P.S. Watch out what to store in types folder. If something doesn't have to be global store it in folder of that module.
```

## Troubleshooting

### My new translation file is not being hot-reloaded

`translations:watch` will watch all files that existed at the time of running the command, or development server. Hot reload only works on files that existed during startup. In case you add a new translation file to a specific module, please restart the web server.

## Writing translations

Generally we use a 3 way keys as `module.context.action` or `component.context.action`

```
button.submit.title
button.submit.description
input.email.name
input.email.placeholder
seo.twitter.title
home.hero.title
authentication.login.message
```
