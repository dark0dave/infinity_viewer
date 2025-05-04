with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "node";
  buildInputs = [
    git
    gnupg
    pre-commit
    nodejs
  ];
  shellHook = ''
    export PATH="$PWD/node_modules/.bin/:$PATH"
  '';
}
