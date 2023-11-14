echo "开始执行将当前分支合并至测试环境脚本"
current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "当前分支：$current_branch"
echo "切换到release分支"
git switch release
echo "拉取最新代码"
git pull

if [ $? -ne 0 ]; then
  echo "git pull 命令出现错误，终止脚本的执行"
  exit 1
fi

echo "合并代码"
git merge $current_branch
if [ $? -ne 0 ]; then
  echo "git merge 命令出现错误，终止脚本的执行"
  exit 1
fi

pnpm build:alpha
if [ $? -ne 0 ]; then
  echo "pnpm build 命令出现错误，终止脚本的执行"
  exit 1
fi

echo "构建完毕，准备提交到远程仓库"
current_datetime=$(date +"%Y-%m-%d %H:%M:%S")

git add .
git commit -m "build:$1 $current_datetime"
git push

