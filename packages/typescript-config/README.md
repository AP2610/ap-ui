# @ap/eslint-config

Shared typescript config for the monorepo.

Only this package has publishConfig with public set to true in the case any of the packages in this monorepo are published, like the uii-kit.

It also has no exports defined in the package.json because the files are extended in the tsconfig of specific packages.
