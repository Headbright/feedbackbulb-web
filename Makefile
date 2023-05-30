.PHONY: dev build help copy publish

check_defined = \
	$(strip $(foreach 1,$1, \
		$(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
	$(if $(value $1),, \
	  $(error Undefined $1$(if $2, ($2))))

setup: ## Install dependencies
	@npm i

help: ## List available tasks
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


dev: ## Start local development server
	@npm run dev -- --host

build:
	@npm run build
	
copy: ## Copies a build to the main application
	@rm -f ../zofx/priv/static/packages/web-v1.js
	@rm -f ../zofx/assets/css/web-v1.css
	@mv ./dist/assets/index.css ../zofx/priv/static/packages/web-v1.css
	@mv ./dist/assets/index.js ../zofx/priv/static/packages/web-v1.js

publish: build copy 