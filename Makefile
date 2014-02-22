.PHONY: test integration

test:
	mocha test/_setup.js test/*_test.js

integration:
	mocha test/integration
