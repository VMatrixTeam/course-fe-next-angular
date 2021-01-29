# course-fe-next

The future of course-fe

## 推荐 IDE 插件

- tailwind css 的 auto complete 插件
- eslint 插件
- prettier 插件

## 命令

### 本地开发测试

`npm install`

`npm start`

### 生产构建

`npm run prod:install`

`npm run prod:affected:build`

### 构建文档 (Compodoc)

`npm run compodoc`

### 创建 Nx Library

`npm run wg -- glib` 或 `npm run wg -- glib <name> --type=<type> [--directory=<directory>] [--scope=<scope>] [--tags=<tags>]`

参数解释：

1. `type` 只能为 `data-access`, `feature`, `ui` 或 `util` 其中一项
2. `directory` 为此 library 位于的目录名，即 `libs/<directory>/<library>`，用于方便分类，可留空
3. `scope` 为此 library 的领域，要么为此 library 的 project 名，要么为 `shared`，默认为 project 名
4. `tags` 每一项格式为`name:value`，每一项之间使用 `,` 分隔，可留空

提示：使用 `--dry-run` 来查看命令效果，而不令命令生效

### 创建 Angular Component

`npm run wg -- gcom` 或 `npm run wg -- gcom <name> --project=<project>`

其中 `project` 的值可以参考 `nx.json`

提示：使用 `--dry-run` 来查看命令效果，而不令命令生效

### 创建 Angular Service

`npm run wg -- glib` 或 `npm run wg -- glib <name> --project=<project>`

其中 `project` 的值可以参考 `nx.json`

提示：使用 `--dry-run` 来查看命令效果，而不令命令生效
