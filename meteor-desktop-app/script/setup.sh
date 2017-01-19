#!/bin/bash
set -e # Auto exit on error

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $DIR/colors.sh

BASE=$DIR/..
pushd $BASE

mkdir -p cache

pushd cache

NODEJS_VERSION=0.10.33
ATOM_SHELL_VERSION=0.19.4

OS_PLATFORM=`uname -s`
OS_PLATFORM=`echo $OS_PLATFORM | tr '[:upper:]' '[:lower:]'`
MACHINE_TYPE=`uname -m`
echo "OS Platform: $OS_PLATFORM"
echo "Machine type: $MACHINE_TYPE"
if [ $MACHINE_TYPE == 'x86_64' ]; then
  OS_ARCH=$OS_PLATFORM-x64
else
  OS_ARCH=$OS_PLATFORM-ia32
fi

echo "OS Architecture: $OS_ARCH"

ATOM_SHELL_FILE=atom-shell-v$ATOM_SHELL_VERSION-$OS_ARCH.zip

if [ ! -f $ATOM_SHELL_FILE ]; then
  cecho "-----> Downloading Atom Shell..." $purple
  curl -L -o $ATOM_SHELL_FILE https://github.com/atom/atom-shell/releases/download/v$ATOM_SHELL_VERSION/$ATOM_SHELL_FILE
  mkdir -p atom-shell
  unzip -d atom-shell $ATOM_SHELL_FILE
fi


if [ ! -f node-v$NODEJS_VERSION-$OS_ARCH.tar.gz ]; then
  cecho "-----> Downloading Nodejs distribution..." $purple
  curl -L -o node-v$NODEJS_VERSION-$OS_ARCH.tar.gz http://nodejs.org/dist/v$NODEJS_VERSION/node-v$NODEJS_VERSION-$OS_ARCH.tar.gz
  mkdir -p node
  tar -xzf node-v$NODEJS_VERSION-$OS_ARCH.tar.gz --strip-components 1 -C node
fi

popd

NPM="$BASE/cache/node/bin/npm"

export npm_config_disturl=https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist
export npm_config_target=$ATOM_SHELL_VERSION
export npm_config_arch=ia32
HOME=~/.atom-shell-gyp $NPM install

popd
