all: ;@echo "Starting test server..."; \
	node server.js

install: ;@echo "Installing node_modules..."; \
	npm install

clean: ;@echo "Cleaning node_modules..."; \
	rm -rf node_modules


 