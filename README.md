# regon-api

A simple promise-based library to integrate [REGON-API](https://wyszukiwarkaregon.stat.gov.pl) into any Node.js and browser system.

## How to use
- Install with npm `npm i regon-js -S`
- or install with yarn `yarn add regon-js`

### Example usage:
```javascript
// Import with ES5
var Regon = require('regon-api').default;

// Import with ES6
import Regon from 'regon-api';

// Create a client with a configuration object
const client = new Regon({
  key: 'YOUR_API_KEY',
});

// Without await
client.login().then(() => {
  const results = client.searchByNip('1234567890');
  console.log("Results", results);
})

// With await
await client.login();
const results = await client.searchByNip('1234567890');
console.log('Results', results);
```

More examples coming soon.

## Contribution
Pull requests are more than welcome.

1. Pull the repository
2. Make changes
3. Run build script `npm run build`
4. Submit a PR

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents
