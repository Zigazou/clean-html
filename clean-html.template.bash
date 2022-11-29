#!/bin/bash

cat << EOF
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Clean HTML</title>
    <style>
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
      }
    </style>
  </head>
  <body>
    <a href="javascript:(function(){$(cat clean-html.bookmarklet)})()">Clean HTML</a>
  </body>
</html>
EOF
