## DEVELOPMENT

### Initial Launch

Copy `.env.example` to `.env`:

```console
$ cp .env.example .env
```

Install dependencies:

```console
$ npm i
$ npm i -g @adonisjs/cli
```

Migrate and seed database:

```console
$ node ace migrate
$ node ace seeddb
```

Start the project:

```console
$ npm run start
```

## Cronjobs

Delete unaccepted requests and expire requests

```console
# Run every twelve hours
0 0,12 * * * cd /home/sparktr4/source/sparktrend/backend; node ace cronjob:order >cronjob.log 2>&1
```

Apply random priorities to products

```console
# Run every 1 hours
0 * * * * cd /home/sparktr4/source/sparktrend/backend; node ace cronjob:randomsort >cronjob.log 2>&1
```

Update instagram informations

```console
# Run every three days
0 0 */3 * * cd /home/sparktr4/source/sparktrend/backend; node ace cronjob:insta --delunverified >cronjob.log 2>&1
```

## TROUBLESHOOTING

### Chromium won't start

- First, install dependencies

```console
$ yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
```

- Second, refer to this link: https://github.com/puppeteer/puppeteer/issues/391#issuecomment-325420271

- Third, if EACCESS error is thrown, change node_modules/puppeteer/.local permission to 775

```console
$ chmod 775 -R ./node_modules/puppeteer/.local
```
