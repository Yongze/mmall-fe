#!/bin/sh

# methods:
# mmall-fe : front_deploy.sh mmall-fe
# admin-fe : front_deploy.sh admin-fe

GIT_HOME=/developer/git-repository/
DEST_PATH=/product/frontend/

# cd dir
if [! -n "$1"];
	then
	#statements
	echo -e "Please input the project name:"
	exit
fi

if[$1 = "mmall-fe"];
	then
	echo -e "=======Enter mmall-fe=========="
	cd $GIT_HOME$1

elif [$1 = "admin-fe"];
	then
	echo -e "=======Enter admin-fe=========="
	cd $GIT_HOME$1
else
	echo -e "Cannot find the project!"
	exit

fi

# clear git dist
echo -e "=======clear git dist=========="
rm -rf ./dist

# git operation
echo -e "=======git checkout master=========="
git checkout master

echo -e "=======git pull=========="
git pull

# npm install
echo -e "=======npm install=========="
npm install

# npm run dist
echo -e "=======npm run dist=========="
npm run dist

if [-d "./dist"]]; then
	# backup or rename
	echo -e "=======dest backup=========="
	mv $DEST_PATH$1/dist $DEST_PATH$1/dist.bak

	# copy
	echo -e "=======Copy to target path=========="
	cp -r ./dist $DEST_PATH$1

	# echo result
	echo -e "=======Deploy Success=========="
else
	echo -e "=======Deploy Error=========="
fi