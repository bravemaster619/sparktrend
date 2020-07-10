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
