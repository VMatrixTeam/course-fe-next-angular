# course-fe-next

The future of course-fe

## 推荐 IDE 插件

- tailwind css 的 auto complete 插件
- eslint 插件
- prettier 插件

## 命令

### 创建 library

`npm run wg -- glib` 或 `npm run wg -- glib <name> --directory=<directory> --type=<type> [--tags=<tags>]`

参数解释：

1. `tags` 每一项格式为`name:value`，每一项之间使用 `,` 分隔
2. `type` 只能为 `data-access`, `feature`, `ui` 或 `util` 其中一项

另外：使用 `--dry-run` 来查看命令效果，而不令命令生效

### 创建 component

`npm run wg -- gcom` 或 `npm run wg -- gcom <name> --project=<project>`

其中 `project` 的值可以参考 `nx.json`
