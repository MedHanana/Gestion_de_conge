DOCKER_COMPOSE = docker-compose
EXEC_PHP       = $(DOCKER_COMPOSE) exec -T php
EXEC_DB       = $(DOCKER_COMPOSE) exec -T database
SYMFONY        = $(EXEC_PHP) bin/console
COMPOSER       = $(EXEC_PHP) composer
MKDIR=mkdir -p
RM=rm -rf
APP_ENV?=dev
APP_SECRET?=26c96513032bfa43df9a1a40a3a6a51c
DATABASE_URL?="mysql://root:secret@database:3306/symfony_db"
CORS_ALLOW_ORIGIN?=^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$

define write
echo $2 >> $1
endef

start:  build db


build:
	$(DOCKER_COMPOSE) up --build --remove-orphans --force-recreate --detach
stop:
	$(DOCKER_COMPOSE) stop
kill:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) down --volumes --remove-orphans
clean:kill
	$(rm -rf api/var api/vendor)
rebuild: clean build

.PHONY: .env
.env:
	cd ./api && $(RM) $@ && \
	$(call write,$@,"APP_ENV=$(APP_ENV)") && \
	$(call write,$@,"APP_SECRET=$(APP_SECRET)")  && \
	$(call write,$@,"DATABASE_URL=$(DATABASE_URL)")  && \
	$(call write,$@,"CORS_ALLOW_ORIGIN=$(CORS_ALLOW_ORIGIN)")

vendor: api/composer.json api/composer.lock
	$(COMPOSER) install

.PHONY: build stop kill clean rebuild
db: .env vendor
	$(SYMFONY) doctrine:database:create --if-not-exists
	$(SYMFONY) doctrine:schema:update --force

.PHONY: db