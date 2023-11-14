echo "git push current"

pnpm install
pnpm build
git add .
git commit -m "update"
git push -u origin master