# npm-limit

## 使用方法

为了让其他人在此项目中只能通过我们指定的包管理器去安装依赖，我们需要在 `package.json` 里面添加一条脚本`"preinstall": "npx npm-limit [你要设置的包管理器名称yarn,npm,pnpm...]"`

使用以下命令快速添加 👇

```sh
npm set-script preinstall "npx npm-limit yarn"
```

或者手动添加 👇

```json
{
  "scripts": {
    "preinstall": "npx npm-limit yarn"
  }
}
```

## 示例

当我们设置了上述的 script 后,执行 `pnpm i` 可以看到如下图所示的报错信息

![](https://gitee.com/wangrongding/image-house/raw/master/images/202202211343554.png)

当我们没有设置`"preinstall": "npx npm-limit [你要设置的包管理器名称yarn,npm,pnpm...]"`或者设置错误的时候,可以看到如下图所示的报错信息

![](https://gitee.com/wangrongding/image-house/raw/master/images/202202211341051.png)

至此,包管理器的限制就可以实现啦 ~ 🥰
