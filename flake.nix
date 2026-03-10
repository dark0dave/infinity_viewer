{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable-small";
  };
  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f system);
    in {
      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in {
          default = pkgs.mkShell {
            name = "node";
            # Libs
            buildInputs = with pkgs; [
              nodejs
            ];
            # Tools
            nativeBuildInputs = with pkgs; [
              git
              gnupg
              pre-commit
            ];
            shellHook = ''
              export PATH="$PWD/node_modules/.bin/:$PATH"
            '';
          };
        });
    };
}
