### DEPENDENCIES
node >= 9.8.0
tsc >= 2.7.2
typescript
docker >= 18.0 to run mysql dependency OR mysql db running

### Install
npm install

### Buiilding the project
npm run build

### Linting
npm run lint

### Run Orderbook module

- docker-compose up -d

- Create .env file and set the following ENV VARIABLE

DATABASE_CONNECTION_URL=mysql://root:test@localhost:3306/hexel_db?debug=false&charset=utf8

Endpoint of Api return index data set

INDEX_API_ENDPOINT=http://localhost/index/

- npm run build

It will connect to endpoint or use static index data file in order to generate an order book report in CSV format

- npm run start order-book


### TODO
[ ] Unit and integration Testing
[ ] Command line interface , accepting parameters
[ ] Storing fund information by currency, portfolio allocation
[ ] Caching of currencies data
[ ] Some functions refactoring  SRP principles
[ ] Linking models relationships
[ ] Exposing functionality via api endpoint
[ ] Adapt code for task 2
