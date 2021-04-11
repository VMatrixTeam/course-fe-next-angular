# course-fe-next

The future of course-fe

## 本地开发环境要求

### IDE

用 Webstorm 吧！VSCode 没有测试过，不保证脚手架各项功能使用正常。

### Node

除非出现兼容性问题，否则建议使用最新版本。

### IDE 插件

- Tailwind css 的 auto complete 插件
- Eslint 插件
- Prettier 插件

## 命令

### 本地开发测试

强烈建议使用 pnpm：

```
npm install -g pnpm
pnpm install
pnpm start
```

### 生产构建

`pnpm run prod:install`

`pnpm run prod:affected:build`

### 构建文档 (Compodoc)

`pnpm run compodoc`

### 创建 Nx Library

`pnpm run wg -- glib` 或 `pnpm run wg -- glib <name> --type=<type> --load=<load> [--directory=<directory>] [--scope=<scope>] [--tags=<tags>]`

参数解释：

1. `type` 只能为 `data-access`, `feature`, `ui` 或 `util` 其中一项
2. `load` 只能为 `eager` 或 `lazy` 其中一项
3. `directory` 为此 library 位于的目录名，即 `libs/<directory>/<library>`，用于方便分类，可留空
4. `scope` 为此 library 的领域，要么为此 library 的 project 名，要么为 `shared`，默认为 project 名
5. `tags` 每一项格式为`name:value`，每一项之间使用 `,` 分隔，可留空

提示：使用 `--dry-run` 来查看命令效果，而不令命令生效

### 删除 Nx Library

`pnpm run nx -- g rm <project>`

提示：请慎重操作，删除前请使用 `--dry-run` 来查看命令效果，而不令命令生效

### 移动 Nx Library

`pnpm run nx -- g mv --project <project> <destionation>`

例子:

将 `libs/my-feature-lib` 移动到 `libs/shared/my-feature-lib`：
`pnpm run nx -- g mv --project my-feature-lib shared/my-feature-lib`

提示：使用 `--dry-run` 来查看命令效果，而不令命令生效

### 创建 Angular Component

`pnpm run wg -- gcom` 或 `pnpm run wg -- gcom <name> --project=<project>`

其中 `project` 的值可以参考 `nx.json`

提示：使用 `--dry-run` 来查看命令效果，而不令命令生效

### 创建 Angular Service

`pnpm run wg -- gsvc` 或 `pnpm run wg -- gsvc <name> --project=<project>`

其中 `project` 的值可以参考 `nx.json`

提示：使用 `--dry-run` 来查看命令效果，而不令命令生效
