# simple-file-upload-download-server

A simple host file to quickly upload or download file, from curl ([curl for windows](https://curl.haxx.se/download.html)) command.

No user no authentication no complexity

Upload a file :

```
curl -F file=@myFile.zip http://domain.com
>>
{"downloadLink":"http://domain.com/file?file=myFile.zip","curl":"curl http://domain.com/file?file=myFile.zip > myFile.zip"}
```

Download the file from your browser or use curl command display after upload

# Compilation

install tsc :

```
npm install -g tsc
npm install
```

compile with command : 

```
tsc
```

# Run

run with command :

```
node server.js {port} {dest_folder} {publicurl}
ex
node server.js 9000 ./upload http://domain.com
```

to upload a file :

```
curl http://domain.com/file?file=myFile.zip > myFile.zip
```

# Docker

docker run -e SERVER="http://domain.com" -p 3000:3000 -v /home/upload:/tmp simple-file-upload-download-server