# tally_list_docker
This is a web-based tally list to track goods of users.

![tally_list](https://user-images.githubusercontent.com/7523395/45557221-6746a900-b83d-11e8-9ed2-be5a2da28105.gif)

## Dependencies
* [node js](https://nodejs.org/en/) Server with RESTful API
* [vue js](https://vuejs.org/)  Client
* [Docker](https://www.docker.com/)
* and some more ...

## Getting started (Production)

  1) Install [docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/#set-up-the-repository) and [docker-compose](https://docs.docker.com/compose/install/#install-compose) on your system
  2) Clone the repo
```shell
git clone https://github.com/g40st/tally_list_docker.git ~/Downloads/tally_list_docker/ && \
cd Downloads/tally_list_docker
```
  3) Built the images that are needed:
```shell
docker-compose -f docker-compose.yml -f docker-compose-prod.yml build 
```
  4) Start the images and build containers:
```shell
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up 
```
  5) Now the system is ready: http://127.0.0.1/#/
  
  6) Adminpanel: http://127.0.0.1/#/login
  
      User: admin
  
      Password: Su18tm!#
  
      You can create a new user by the REST API. Look on the documentation.


## Getting started (Development)
  1) Install [docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/#set-up-the-repository) and [docker-compose](https://docs.docker.com/compose/install/#install-compose) on your system
  2) Clone the repo
```shell
git clone https://github.com/g40st/tally_list_docker.git ~/Downloads/tally_list_docker/ && \
cd Downloads/tally_list_docker
```
  3) Built the images that are needed:
 ```shell
docker-compose -f docker-compose.yml -f docker-compose-dev.yml build 
```   
  4) Start the images and build containers:
```shell
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up
```
   Node js and vue js will be started in dev mode. Therefore, nodemon and the dev env of vue js will be used. You can directly edit the source code in the repo of your local clone. The changed source will be automatically loaded.

  5) Now the system is ready: http://localhost:8080/#/
  
  6) Adminpanel: http://localhost:8080/#/
  
      User: admin
  
      Password: Su18tm!#
  
      You can create a new user by the REST API. Look on the documentation.

## Database
  The system uses a postgresSQL database. The table sysuser is used for the admin panel. In the admin panel you can edit the users and the products.
  ![screenshot_20180914_142938](https://user-images.githubusercontent.com/7523395/45552710-1da49100-b832-11e8-98fd-caa23ab5b6f2.png)

### Backup and Restore of the database
  docker exec -t -u postgres your-db-container pg_dumpall -c > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
  
  cat your_dump.sql | docker exec -i your-db-container psql -Upostgres

## Admin Panel

![admin_panel](https://user-images.githubusercontent.com/7523395/45557262-7e859680-b83d-11e8-8599-f669ca44468e.gif)

## RESTful API

## Authentication
  The Authorization Header must be set. Use the /sysuser/login endpoint to get a token. One admin is already created (look above).
  
  Example:
  
  Authorization: Bearer eyJh................DlIfVbh4  
  
  
## Endpoints

### products
  - http://localhost:3000/products      GET
  - http://localhost:3000/products      POST  Authentication needed
  - http://localhost:3000/products/:id  GET
  - http://localhost:3000/products/:id  PATCH Authentication needed
  - http://localhost:3000/products/:id  DELETE Authentication needed
### users
  - http://localhost:3000/users      GET
  - http://localhost:3000/users      POST  Authentication needed
  - http://localhost:3000/users/:id  GET
  - http://localhost:3000/users/:id  PATCH Authentication needed
  - http://localhost:3000/users/:id  DELETE Authentication needed
  - http://localhost:3000/users/setZero/:id  GET Authentication needed
### orders
  - http://localhost:3000/orders      GET
  - http://localhost:3000/orders      POST
  - http://localhost:3000/orders      PATCH Authentication needed
  - http://localhost:3000/orders/:Id  GET Authentication needed
### prepared
  - http://localhost:3000/prepared      GET
### sysuser (admin panel)
  - http://localhost:3000/sysuser/         GET Authentication needed
  - http://localhost:3000/sysuser/login    POST
  - http://localhost:3000/sysuser/signup   POST Authentication needed
  - http://localhost:3000/sysuser/:id      DELETE Authentication needed

## Products

**Show Products**
----
  Returns json data about all products.

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**
  
    None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data: productArray }`


**Create Product**
----
  Creates a new product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

  { name: Product 1,
    price: 1.5,
    icon: beer
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: Inserted one product }`

**Show Product**
----
  Returns json data about one product.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**
   
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data: product }`

**Edit Product**
----
  Edits a existing product.

* **URL**

  /products/:id

* **Method:**

  `PATCH`
  
*  **URL Params**
   
   `id=[integer]`

* **Data Params**

  { name: Product 1,
    price: 1.5,
    icon: beer
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: Updated product}`

**Delete Product**
----
  Deletes a existing product.

* **URL**

  /products/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
   
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: Removed 1 product }`

## Users

**Show Users**
----
  Returns json data about all users.

* **URL**

  /users

* **Method:**

  `GET`
  
*  **URL Params**
  
    None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data: usersArray }`


**Create User**
----
  Creates a new user.

* **URL**

  /users

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

  { name: User 4 }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: Inserted one user }`

**Show User**
----
  Returns json data about one user.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**
   
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data: user }`

**Edit User**
----
  Edits a existing user.

* **URL**

  /users/:id

* **Method:**

  `PATCH`
  
*  **URL Params**
   
   `id=[integer]`

* **Data Params**

  { name: User 4 new }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: Updated user}`

**Delete User**
----
  Deletes a existing user.

* **URL**

  /users/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
   
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: Removed 1 user }`


**Set to zero User**
----
  Sets all quantities in the order table to zero.

* **URL**

  /users/setZero/:userId

* **Method:**

  `GET`
  
*  **URL Params**
   
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: Set all to zero. }`

## Orders


**Show Orders**
----
  Returns json data about all orders.

* **URL**

  /orders

* **Method:**

  `GET`
  
*  **URL Params**
  
    None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data: ordersArray }`

**Increment Order**
----
  Increments the quantity of an order by one (depend on user and product).

* **URL**

  /users

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

  { userId: 10,
    productId: 10
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: Incremented ... }`

**Get Order**
----
  Returns json data about one order depend on user.

* **URL**

  /orders/:id

* **Method:**

  `GET`
  
*  **URL Params**
   
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data: orderArray }`

**Edit Order**
----
  Edits a existing order. The quantity of an order will be decreased (depend on user and product).

* **URL**

  /orders/
  
* **Method:**

  `PATCH`
  
*  **URL Params**
   
   `id=[integer]`

* **Data Params**

  {
	userId: 10,
	productId: 12,
	quantity: 5
}

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: Decreased}`

## Prepared

**Show Prepared Data**
----
  Returns json data about the orders, users and products. This is used in the home view of the app.

* **URL**

  /prepared

* **Method:**

  `GET`
  
*  **URL Params**
  
    None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data: data }`

## sysuser

**Login**
----
  Get a token for the admin panel.

* **URL**

  /sysuser/login

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

  { user: admin,
    pwd: secret
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: Auth successful,
                      token: eyJ...KTRw,
                      user: admin }`

**Signup**
----
  Creates a new user in the sysuser table. Can be user to login into the admin panel.

* **URL**

  /sysuser/signup

* **Method:**

  `POST`
  
*  **URL Params**
  
    None

* **Data Params**

   { user: newAdmin,
    pwd: secret
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: created }`


## Author
Christian Högerle

## Licensing
The code in this project is licensed under MIT license.
