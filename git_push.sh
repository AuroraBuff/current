echo "git push current"
git pull

if [ $? -ne 0 ]; then
  echo "git pull 命令出现错误，终止脚本的执行"
  exit 1
fi

pnpm build:$1
if [ $? -ne 0 ]; then
  echo "pnpm build 命令出现错误，终止脚本的执行"
  exit 1
fi

echo "构建完毕，准备提交到远程仓库"
current_datetime=$(date +"%Y-%m-%d %H:%M:%S")

git add .
git commit -m "build:$1 $current_datetime"
git push
