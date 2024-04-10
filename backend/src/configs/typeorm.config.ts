import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { AccountEntity } from "src/accounts/account.entity"

const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

export const typeORMConfig : TypeOrmModuleOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "my-nest-project",
    "entities": [AccountEntity],
    "synchronize": false,
    "namingStrategy": new SnakeNamingStrategy()
  }