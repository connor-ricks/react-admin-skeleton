# Dashboard

This is a dashboard skeleton that outlines a project structure that is capable of...

- Exposing an authenticated dashboard website to users
- Exposing an API to various consumers
- Interacting with a Windows COM object

## Project Structure

The project is broken down into a few sections

```
|--app
|   // This is a folder that makes up the routes/urls of both your API and website.
|   // Each folder represents a piece of the URL. (Unless the folder's name is wrapped in parentheses)
|   // The website is made up of...
|   // - LAYOUTS
|   //   Think of layouts as templates that you inject into each individual page. For example, the (dashboard) folder contains
|   //   a layout page that defines the website's dashboard (Sidebar, Footer, Header and Content) At the root of the app folder is
|   // - PAGES
|   //   Pages make up the content of the page you are visiting. The content of the page is inserted into the layout using the
|   //   children prop in the layout's definition.
|   // - API
|   //   Anything under the api folder is considered an API route that can be hit using a client or the website itself.
|
|--lib
|   |--server
|   |   // The server folder contains any helpers/utilities/functionality that is necessary to power the server side of the
|   |   // application. This could be functionality relevant to making the API or server-side rendered website work.
|   |   //
|   |   // Any files that you don't want leaked the client in any way whould make sure to import 'server-only'
|   |
|   |--client
|   |   // The client folder contains any helpers/utilities/functionality that is necessary to power the client side of the
|   |   // application. This is functionality relevant to making the client-side rendered website work.
|   |
|   |--components
|       // Components contains any helpful react ui components that are used to render your website.
|       // Next.js has two types of rendering styles. SERVER and CLIENT
|       // - SERVER
|       //   Server component files are marked 'use server'. They have access to server side functionality like accessing data
|       //   directly from the server, such as fething directly from the COM. However, Server comoponents can not make use of things
|       //   like React state, hooks and other client side only functionality.
|       // - CLIENT
|       //   Client component files are marked as 'use client'. They only have access to what's available from a browser. However,
|       //   They can contain things like state and hooks. If you need data from a client component, you must fetch it by making
|       //   a web request to your API.
|       //
|       // As a general rule of thumb. Use 'use server' as much as possible, and only create client components when you need
|       // some sort of client hook or state because of user interaction.
|
|--public
|   // This is a folder for public assets/images that you may want to render on screen. Things in here are unsecured and can
|   // viewed by anyone with the URL.
|
|--.env.development
|   // This is an environment file where you can add various configuration properties that the application can consume.
|   // Things added to this list can be retreived when running in development mode using process.env.<key>
|   // Things like secrets or configuration paths are generally added to the env file.
|
|--.env.production
|   // This is an environment file where you can add various configuration properties that the application can consume.
|   // Things added to this list can be retreived when running in production mode using process.env.<key>
|   // Things like secrets or configuration paths are generally added to the env file.
```

## Authentication

### Website Authentication

### API Authentication
