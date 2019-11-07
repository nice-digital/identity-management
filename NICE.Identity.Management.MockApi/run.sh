#!/bin/bash

db=./api/db.json
routes=./api/routes.json
middleware=./middleware.js

args="$@"
args="$@ -p 3001"

if [ -f $db ]; then
    echo "Found db.json"
    args="$args $db"
fi
if [ -f $routes ]; then
    echo "Found routes.json"
    args="$args --routes $routes"
fi
if [ -f $middleware ]; then
    echo "Found middleware.js"
    args="$args --middlewares $middleware"
fi

json-server $args
