APIPROXY is a RESTFUL API proxy, monitor and adaptor. 

Forward RESTFUL API to another host. It's man in the middle who can monitor and modify the header and body of the API Request & Response. Good for protocol study and adaptation.
## Features 

- API proxy: forward any incoming API to remote sever and return the response back to client. 
- API monitor: you can get detailed log of the API req and res in the log file. 
- API adpator: modify the request and response on the fly while forwarding, including parameters, body, http headers etc. 
- API mock server: you can add your own API for testing purpose easily. 

## Develop

```
npm install
npm run dev
```

nodemon will monitor the changes and compile/restart the app. 

## Configuration & Customization

### routes.ts 

There are some default route defined in routes.ts, which can be used for testing purpose. 
You can test a forwarding rule by forwarding one API to another local API.

### handlers

A number of handlers to the demo API. 
## Test

### Manualy

Mannualy test by Visual Studio Code with extension Rest Client. 
- Open test/vscode.http and click any of the test case 
- Check the result and the log. 

### jest

```
npm run test
```

## Log

Detailed logs are automatically saved in logs/all.log , it can be less verbose by setting NODE_ENV to production. 

## Reference

- https://github.com/directus/directus/discussions/11881



