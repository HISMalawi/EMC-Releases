# Requirements

- Nodejs > v10.19.0

# Installation

1. Install nodejs

    `sudo apt install nodejs`

    also see: [Using NVM to install latest node version](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)

2. Install Ionic vue cli

    `npm install -g @ionic/cli`

3. Install His-Core dependancies

    `npm install`

# API Configuration

1. Rename /public/config.json.example to /public/config.json
2. Change Url, port or host to match API environment

# Configuring Minimum API version

The system supports API version locking which prevents older versions of the BHT-EMR-API from crashing updates on the front-end.
Minimum supported version can be configured in `src/MasterConfig.ts`.
Versions configured should correspond with tags available on BHT-EMR-API.
Versions should follow format `[0-9].[0-9].[0-9]` e.g. `4.16.1` or `5.0.0`

# Running Development App

Run `ionic serve`

# Building for production

## Building Web version

Run `ionic build`

## Building for Android

To build for Android, make sure you have the latest version of Android studio installed.

1. On the terminal, Run `ionic cap sync`
2. Open Android Studio and click `Build` and then `Generate Signed Bundle or APK`

## Running web version for production
After running `ionic build`, the output files generated are kept in `dist` folder.
You can run the built version using a local web server such as `python3 -m http.server` or use ngx. For optimal serving when testing in development, install `npm install --global serve` and run `serve -s dist`

# Adding System Version String
System version is read from `/public/HEAD` (development folder) or `/HEAD`(dist folder).
Version names exceeding 25 characters won't be read. 

Note: Version name will be blank if file is missing or is empty. 
