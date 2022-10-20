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

# Running Development App

Run `ionic serve`

# Building for production

## Versioning and Tagging

1. Open the terminal and run either of the following to update system version:
    a). `npm version patch` for patch/bug fixes version
    b). `npm version minor` for minor revision
    c). `npm version major` for major revision

2. Commit version tag by running `git push origin [TAG NAME]`. Tag name is based on the output of the above
   npm version commands

### Minimum API Version
You can manually configure the minimum API version by editing package.json and updating
`"min-api-version" : "4.16.1"`

## Building Web version

Run `ionic build`

## Building for Android

To build for Android, make sure you have the latest version of Android studio installed.

1. On the terminal, Run `ionic cap sync`
2. Open Android Studio and click `Build` and then `Generate Signed Bundle or APK`

## Running web version for production
After running `ionic build`, the output files generated are kept in `dist` folder.
You can run the built version using a local web server such as `python3 -m http.server` or use ngx. For optimal serving when testing in development, install `npm install --global serve` and run `serve -s dist`
