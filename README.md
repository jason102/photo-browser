# Unsplash photo browser app

This is a demo app written using TypeScript/React/Vite that allows the user to browse [Unsplash](https://unsplash.com/) photos using the [Unsplash Photo API](https://unsplash.com/developers).

## Running the app locally

1. In the root directory of the project run `npm install` to install the dependencies.
2. Create a `.env.local` file in the root directory and add the following environment variable with your local testing Unsplash API access key (replace `XXXXXXX`):

```
VITE_UNSPLASH_ACCESS_KEY=XXXXXXX
```

3. Run `npm run dev` to run the app on localhost. The app should be available at the default Vite server port at http://localhost:5173/

## Building the app for production

1. Create a `.env.production` file in the root directory of the project and specify your production environment Unsplash API key the same way the `.env.local` file was configured.
2. Build the app using `npm run build`. The files in the generated `dist` directory can be uploaded to your hosting provider.
