# bsus

> power by nestjs

# Related projects

[bsus-front](https://github.com/baishiup/bsus-front)  
[bsus-admin](https://github.com/baishiup/bsus-admin)

# instructions

## 添加配置文件 /src/config.ts

```ts
export const MYSQL = {
  host: '',
  port: 3306,
  username: '',
  password: '',
  database: '',
};

export const QINIU = {
  ak: '',
  sk: '',
  bucket: '',
};
```

## 自动构建(本地 jenkins),服务器 pm2 托管运行

```bash
# execute shell
cd /Users/xxxx/workspace/mywork
echo ${WORKSPACE}
rsync -av --exclude bsus/.git --exclude bsus/node_modules --exclude bsus/dist bsus ${WORKSPACE}
```

```bash
# send build artifacts over SSH

# source files
bsus/**

# exec command
pm2 stop bsus
pm2 delete bsus

rm -rf /usr/share/nginx/html/bsus
mv ./bsus /usr/share/nginx/html/bsus
cd /usr/share/nginx/html/bsus
cnpm i
npm run build
pm2 start npm --name "bsus" -- run start
```
