## MERN NOTE APP with TypeScript

[Link-to-MERN-Project](https://mern-notes-fullstack.vercel.app)

### MERN: 

* M: mongoDB

* E: express with typescript
* R: react with typescript using vite
* N: node.js



### Deploy MERN to Vercel

* Backend folder should be named `/api` and the entry should be `/api/index.(ts or js)`
* add `vercel.json` to `/your-project/vercel.json`
* When deploy is done, add env variables to vercel



`/api/.env`

```PORT=5001
PORT=
MONGO_DB_URL=
SESSION_SECRET=
CLIENT_DOMAIN=
```

`/frontend/.env`

```
VITE_BASE_URL=
```



final project structure

```
mern-project
├── api (must name /api)
│   ├── /src
│   ├── index.ts
│   ├── .env
│   └── package.json
├── frontend (any name)
│   ├── /src
│   ├── .env
│   └── package.json
└── vercel.json
```



