
# DataCrunch Limited Project (Fahim Hasan)

This project has been developed with expo react native. To demonstrate its google play and appstore managing flow i have eject the app from expo to cli react native app.




## Setup

Clone this repository from master branch

```bash
  git clone https://github.com/fahimhasan2020/datacrunch-app.git
```

Now install npm

```bash
  npm install
```

Now run this project on expo app

```bash
  npm run start
```

This will open the expo QRCode from terminal. 

## Build

Build this app for android using following command

```bash
  npm run android:apk
```

Build this app for ios using following command

```bash
  npm run android:ios
```

## Submission

For sumitting the app into playstore run this command for generating aab file

```bash
  npm run android:bundle
```

Then upload the file into playstore. All other icons, keystore setup has been completed.

For submitting the app into appstore build the app via xcode and upload its archive into testflight. 