# Blockchain Transactions

Fetch Blockchain transactins and store in database.


## Server Configuration
#### Follow these steps to setup server
 1. `cd server`
 2. `npm install`
 3. Change database connection details in `config/config.json`
 4. `./node_modules/.bin/sequelize migration:run`
 5. `npm run serve`

## Client Configuration
#### Follow these steps to setup client
 1. `cd client`
 2. `npm install`
 3. `ng serve`
 4. Open URL in browser `http://localhost:4200`

##### Follow these steps to fetch Blockchain transactions
1. Open this URL https://www.blockchain.com/explorer?currency=BTC&stat=blocks
2. Clock on Block Hash Code and open and copy the block hash code
3. Go to the browser `http://localhost:4200` and paste the code and click submit

##### Follow these steps to Search Transactions in System
1. Click on `Search Transactions in System`
2. Select date range to filter record `Date From` and `Date To` and submit
