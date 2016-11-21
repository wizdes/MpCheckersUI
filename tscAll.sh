#!/bin/bash
find . -name "*.ts" -type f >ts-files.txt
tsc @ts-files.txt
rm ts-files.txt