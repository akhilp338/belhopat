#!/bin/bash
echo '============================================'
export TOMCAT_HOME="/home/shinto/Desktop/11012016/apache-tomcat-8.0.9"
export TARGET_FOLDER="/home/shinto/Desktop/intl_fcstone/intl-portal"

echo 'Deleting already existing war in your webapps folder..'

#Deleting..
cd "$TOMCAT_HOME"/webapps
	rm -rf intl-fcstone
	rm -rf intl-fcstone.war
echo 'Deleted!!!'

sleep 1
cd "$TARGET_FOLDER"/target
	cp intl-fcstone.war "$TOMCAT_HOME"/webapps
sleep 2
echo 'finished copying intl_fcstone.jar'



 
  

