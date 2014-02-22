.PHONY: test integration

all: test integration app

app:
	node_modules/nodemon/bin/nodemon.js server.js

test:
	mocha test/_setup.js test/*_test.js

integration:
	mocha test/integration
