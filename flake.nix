{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable-small";
    hk = {
      url = "github:jdx/hk/v1.45.0";
    };
  };
  outputs =
    {
      self,
      nixpkgs,
      hk,
    }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
      ];
      forEachSystem = f: nixpkgs.lib.genAttrs systems (system: f system);
    in
    {
      devShells = forEachSystem (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShell {
            nativeBuildInputs = with pkgs; [
              git
              gnupg
              nixfmt
              hk.packages.${system}.default
              pre-commit
              prettier
              yamlfmt
            ];
            buildInputs = with pkgs; [
              nodejs
              pnpm
            ];
            shellHook = ''
              export PATH="$PWD/node_modules/.bin/:$PATH"
            '';
            env.HK_PKL_BACKEND = "pklr";
          };
        }
      );
      formatter = forEachSystem (system: nixpkgs.${system}.nixfmt);
    };
}
