import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { AccountEntity } from "src/accounts/account.entity"
import { PostEntity } from "src/posts/post.entity";

const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

export const typeORMConfig : TypeOrmModuleOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "my-nest-project",
    "entities": [AccountEntity, PostEntity],
    "synchronize": false,
    "namingStrategy": new SnakeNamingStrategy()
  }