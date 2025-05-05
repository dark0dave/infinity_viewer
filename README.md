# Infinity Viewer

![](https://img.shields.io/badge/javascript-8A2BE2?logo=javascript&style=for-the-badge&logoColor=grey)
[![](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)](https://github.com/dark0dave/infinity/releases/latest_viewer)
[![](https://img.shields.io/badge/Windows-0078D6?&style=for-the-badge&logoColor=white&logo=git-for-windows)](https://github.com/dark0dave/infinity_viewer/releases/latest)
[![](https://img.shields.io/badge/mac%20os-grey?style=for-the-badge&logo=apple&logoColor=white)](https://github.com/dark0dave/infinity/releases/latest_viewer)
[![](https://img.shields.io/github/actions/workflow/status/dark0dave/infinity_viewer/main.yaml?style=for-the-badge)](https://github.com/dark0dave/infinity/actions_viewer/workflows/main.yaml)
[![](https://img.shields.io/github/license/dark0dave/infinity_viewer?style=for-the-badge)](./LICENSE)

![](large_icon.png)

Infinity Viewer lets you view infinity engine binary files as json, primary focused on the BGEE(1,2) games.

## Current support

- ARE files
- BAM files
- CRE files
- DLG files
- EFF files
- ITM files
- SPL files
- STO files
- VVC files

## Partial Support

- TLK files, due to the number of strings javascript can not handle parsing 100k+ strings, so we parse the first hundred for now, some kind of scrolling needs to be implemented
- KEY files, for the same reason as the TLK files, so this is mega/giga slow
- BIF files, recursive file parsing is not done and rendering tilesets is not done

## Todo

Support all the other ie binary file types

### How to build me

- use mise to install latest node

```sh
npm run package
```

The vsix file can then be installed to vscode/vscodium.
