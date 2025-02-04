# Run Ecommerce application
Run these two scripts in two different git bash 
npm start will start my Angular Application and npm run start:server will start my Node server
```
npm start 
npm run start:server
```

# Mockdata

```
assets/mockdata folder
```

# PUSH Ecommerce application
Before push any code you have to pass in lint and test cases

```
1. ng lint
2. ng test
```

## After pass in both cases---------

```
1. git stash ---------- save you local changes
2. git pull ----------- pull the master branch changes
3. git stash apply -------- merge local changes with master branch changes
1. git add .
2. git commit -m "message" --no-verify
3. git push -u origin master
```

# In  API service static JSON files are used which are coming from assets folder
categories.json
content.json
products.json

#How do I add Sass compilation in Angular CLI 6: angular.json

```
"schematics": {
        "@schematics/angular:component": {
          "styleext": "scss"
        }
},
```

# Changing the CSS Files to Sass

```
"styles": [
              "src/styles.scss"
          ],
```

# Package.json

Husky is a really cool npm package that lets you define npm scripts that correlate to local Git events such as a commit or push.
Husky is a very popular (1 million downloads a month) npm package that allows custom scripts to be ran against your repository. Husky works with any project that uses a package.json file.

This really reduces the friction of using this feature of Git. So for example, if you install Husky using the command


```
npm install husky --save-dev
```


```
"husky": {
    "hooks": {
      "pre-commit": "npm run lint",
      "pre-push": "npm run lint"
    }
}
```


Any time you try and commit, the hooks will run your lint command first. The hooks will not allow your commit to pass if the lint are failing.

Don’t worry, you can force a commit with --no-verify if you find yourself in the situation where you just want to commit even though your pre-commit hooks don’t succeed.

```
git commit -m "first commit" --no-verify
```


I have added the following entries to the package.json

```
"precommit": "ng lint && npm test",
"prepush": "ng lint && ng build --aot true && npm test"
```


## This sets up means that on a commit we:

lint the code
then run tests
and before pushing to a remote repository we:

perform an optimized build
then run unit tests

1. https://www.npmjs.com/package/pre-commit-with-lint
2. https://www.npmjs.com/package/pre-commit
3. https://sigmoidal.io/automatic-code-quality-checks-with-git-hooks/

# Angular 6 Http Error Interceptor

The Error Interceptor intercepts http responses from the api to check if there were any errors. If there is a 401 Unauthorized response the user is automatically logged out of the application, all other errors are re-thrown to be caught by the calling service so an alert can be displayed to the user.

It's implemented using the HttpInterceptor class that was introduced in Angular 4.3 as part of the new HttpClientModule. By extending the HttpInterceptor class you can create a custom interceptor to catch all error responses from the server in a single location.

## In api.service.ts

"handleError" is comment out becuase i have implement api error globally using HttpInterceptor which is written in http-error-interceptor.ts

## if you change the following ------------

API_PRODUCT_LIST_PATH = 'assets/product.json' in app.config.ts, you can see error in "Http failure response for http://localhost:4200/assets/product.json/?cat=: 404 Not Found" error in products page and also in console.


# Service worker using PWA

```
ng add @angular/pwa@v6-lts
```
### Build your project

```
ng build --prod
```

### my npm version is 6.4.1 that's why i am installing http-server version 0.4.1 to make compatible with my npm version. Now run http-server

```
http-server -p 8081 -c-1 dist/ecommerce
```

## app.config.ts

```
export class AppConfig {
    protocol = 'http://';
    // apiEndpoint = '127.0.0.1:8081/';
    // contentEndpoint = '127.0.0.1:8081/';
    apiEndpoint = 'localhost:3000/';
    contentEndpoint = 'localhost:3000/';
    pageEndpoint = 'localhost:4200/';
    API_CATEGORY_PATH = 'api/categories';
    API_CONTENT_PATH = 'api/content';
    API_PRODUCT_LIST_PATH = 'api/products';
    API_PRODUCT_ADD_PATH = '';
    API_PRODUCT_DELETE_PATH = '';
    API_CUSTOMERS_PATH = 'api/customers';
    IMAGE_PATH = 'assets/images/products/';
    ERROR_MSG_PATH = 'api/errors';
    VALIDATION_ERROR_MSG_PATH = 'api/validationerrors';
}
```

## ngsw-config.json

```
{
  "index": "/index.html",
  "assetGroups": [{
    "name": "ecommerce",
    "installMode": "prefetch",
    "resources": {
      "files": [
        "/favicon.ico",
        "/index.html",
        "/*.css",
        "/*.js"
      ],
      "urls": [
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      ]
    }
  }, {
    "name": "assets",
    "installMode": "lazy",
    "updateMode": "prefetch",
    "resources": {
      "files": [
        "/assets/**",
        "/assets/*.json",
        "/assets/styles/*.scss",
        "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
      ]
    }
  }]
}
```

### Reference Videos :

1. https://www.youtube.com/watch?v=5YtNQJQu31Y
2. https://www.youtube.com/watch?v=f26hgzyGdHM


# Sonar / SonarQube / Sonarts with Angular 6

SonarQube is an open-source platform for continuous inspection of code quality which do regular code and generate static analysis of code to detect bugs, code smells, and security vulnerabilities. Soon share each and every part of report like what is code smell, css issues, duplicate code etc

### Install tslint typescript

```
npm install tslint typescript --save-dev
```

# Adding NodeJS to my Ecommerce Project

```
1. Create server.js in root folder
2. Create ecommerce_backend folder in root folder
3. Create app.js file in ecommerce_backend folder
4. Run "npm install --save express" command to install express in your project
5. npm i --save-dev nodemon
```

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.


# RUN server

```
npm run start:server
```

# API create in NODE
### RUN both angular and nodejs simultaneously

```
npm start
npm run start:server
```


### app.js

```
const express = require('express'); //server starts (express framework for routing all these)
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/categories', (req, res, next) => {
  const categories = [{
      "catId": "1",
      "catName": "electronics",
      "catDesc": "electronics",
      "subCat": ["Laptops"]
    },
    {
      "catId": "2",
      "catName": "appliances",
      "catDesc": "appliances",
      "subCat": ["Television", "Microwave"]
    },
    {
      "catId": "3",
      "catName": "home-furniture",
      "catDesc": "home & furniture",
      "subCat": ["Kitchen", "Furniture"]
    }
  ];
  res.status(200).json({
    message: 'Successfully get categories',
    categories: categories
  });
});

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

RUN the 'http://localhost:3000/api/categories' and get the JSON Static data in written in app.js.

Now if you run http://localhost:4200/ using npm start. You will get CORS error in console.

Cors stands for cross origin resource. We have a separated server and client, remember they're running on different domains, localhost 3000 for the server, localhost 4200 for our angular app. Now client and server want to talk to each other and they're not on the same host, if they were, then we could communicate without any issues but if they're on different hosts like in our case, we got 4200 but it doesn't matter, if we have different hosts we're then communicating with such background requests will fail and that's a security mechanism.You should not be able to access the data on a server or its resources in general if you're not running on the same server, so if the request is coming from a different address, this will give us a so-called cors error.

so let's go there to the app.js file and there I will simply add one additional middleware. Now this middleware of course has to run before we handle the response sending here because there after the response is already sent, we can't manipulate it any more and we want to manipulate the response because we need to add headers to it.

```
npm install --save body-parser
```

### You have to write the following code in app.js to prevent from CORS

```
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
```


# Adding Mongoose

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB. Object Mapping between Node and MongoDB managed via Mongoose.

https://mongoosejs.com/docs/guide.html

```
npm install --save mongoose
```

on the ecommerce_backend and for that, I'll create a new folder there and I'll name it models too. Model, schema, we'll basically.

```
1. Create categories.js because here I want to create my categories model using mongoose
2. mongoose, const mongoose by using that require syntax where I require the mongoose package
    const mongoose = require('mongoose');
3. you first of all create a blueprint for how your data should look like.    
```

```
const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    catId: { type: String, required: true },
    catName:  { type: String, required: true },
    catDesc: { type: String, required: true },
    subCat: { type: [], required: true },
});

/* 
**To use our schema definition, we need to convert our categoriesSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/
mongoose.exports = mongoose.Model('Categories', categoriesSchema);
```

# Connecting our Node Express App to MongoDB 
### connect with mLab (mLab is now part of MongoDB, Inc.)

How will you create a database in mLab : 
1. https://www.linkedin.com/pulse/create-database-mongodb-using-mlabcom-piyali-das/
2. https://www.youtube.com/watch?v=GrphDM8CJ6Q

1. Create a database ecommerce in mLab
2. Now you have to create multiple tables in ecommerce database like categories, content, errors, products, validationerrors (see from assets/mockdata)
3. connection string mongodb://<dbuser>:<dbpassword>.mlab.com:41557/ecommerce which will be use in database.js to connect with nodejs
4. create a folder config in ecommerce_backend folder
5. create a database.js file in config folder to build connectivity with mlab using authentication details
6. create a models folder in ecommerce_backend folder
7. Create a schema categories.js. You have to create multiple schema for each and every tables

### app.js

```
const database = require('./config/database');
const mongoose = require('mongoose'); // require mongoose

// MongoDB connection
mongoose.connect(database.mlab.url, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

// On connection error
mongoose.connection.on('error', (error) => {
  console.log('Database error: ' + error);
});

// On successful connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});
```

### database.js

```
module.exports = {
    mlab:
    {
        name: <dbuser>,
        url: "mongodb://<dbuser>:<dbpassword>.mlab.com:41557/ecommerce",
        port: 27017
    }
};
```

### categories.js

```
const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    catId: { type: String, required: true },
    catName:  { type: String, required: true },
    catDesc: { type: String, required: true },
    subCat: { type: [], required: true }
});

/* 
**To use our schema definition, we need to convert our categoriesSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/
module.exports = mongoose.model('Categories', categoriesSchema);
```

# Fetch data from mLab categories table

### app.js

```
const Categories = require("./models/categories");

app.use('/api/categories', (req, res, next) => {
  Categories.find().then(cats => {
    res.status(200).json({
      message: "Categories fetched successfully!",
      categories: cats
    });
  });
});
```



