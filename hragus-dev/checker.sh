#!/bin/bash

fswatch -o $1 | xargs -n1 -I{} ./lessrun.sh $2

echo "Change detected, updating $2"

