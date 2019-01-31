# hyped-logger
Winston logger for hyped-text

# Installation
```bash
npm i git+https://github.com/hyped-text/hyped-logger.git
```

# Usage
```javascript
const createLogger = require('hyped-logger');

const logger = createLogger();

logger.info('Hello, hyped'); // will output stylish informational message

logger.error('Ooops'); // will output stylish error

logger.gql(`
  query getAuthors {
    authors {
      nichname
      email
      articles {
        title
        text
      }
    }
  }   
`) // will log GraphQL-styled message
```
