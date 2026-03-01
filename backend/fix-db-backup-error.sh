#!/bin/bash

# 都兴工贸后端 - 修复数据库备份表错误
# 使用方法：在服务器上运行 bash fix-db-backup-error.sh

set -e

echo "=========================================="
echo "  修复数据库备份表错误"
echo "=========================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DB_PATH="/web/duxing/backend/database/duxing.db"
BACKUP_DIR="/web/duxing/backend/database/backups"

echo ""
echo -e "${YELLOW}步骤 1: 停止后端服务...${NC}"
pm2 stop duxing-backend || echo "服务未运行或已停止"

echo ""
echo -e "${YELLOW}步骤 2: 备份数据库...${NC}"
# 创建备份目录
mkdir -p $BACKUP_DIR

if [ -f "$DB_PATH" ]; then
    BACKUP_FILE="$BACKUP_DIR/duxing-$(date +%Y%m%d-%H%M%S).db"
    cp "$DB_PATH" "$BACKUP_FILE"
    echo -e "${GREEN}✓ 数据库已备份到: $BACKUP_FILE${NC}"
else
    echo -e "${RED}✗ 数据库文件不存在: $DB_PATH${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}步骤 3: 清理备份表...${NC}"
# 检查是否安装了 sqlite3
if ! command -v sqlite3 &> /dev/null; then
    echo -e "${RED}✗ 未安装 sqlite3，正在安装...${NC}"
    sudo apt-get update && sudo apt-get install -y sqlite3
fi

# 删除所有备份表
sqlite3 "$DB_PATH" "SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%_backup';" | while read table; do
    if [ ! -z "$table" ]; then
        echo "删除备份表: $table"
        sqlite3 "$DB_PATH" "DROP TABLE IF EXISTS $table;"
    fi
done
echo -e "${GREEN}✓ 备份表已清理${NC}"

echo ""
echo -e "${YELLOW}步骤 4: 检查并创建 .env 文件...${NC}"
cd /web/duxing/backend

if [ ! -f ".env" ]; then
    echo "创建新的 .env 文件..."
    cat > .env << 'EOF'
NODE_ENV=production
PORT=3000
DB_PATH=./database/duxing.db
CORS_ORIGIN=http://www.duxinggrp.com,http://8.141.120.243:8765
EOF
    echo -e "${GREEN}✓ .env 文件已创建${NC}"
else
    echo -e "${GREEN}✓ .env 文件已存在${NC}"
    # 检查是否有 NODE_ENV
    if ! grep -q "NODE_ENV" .env; then
        echo "NODE_ENV=production" >> .env
        echo "已添加 NODE_ENV=production"
    fi
fi

echo ""
echo -e "${YELLOW}步骤 5: 验证数据库完整性...${NC}"
sqlite3 "$DB_PATH" "PRAGMA integrity_check;" | head -5

echo ""
echo -e "${YELLOW}步骤 6: 重启服务...${NC}"
pm2 restart duxing-backend

echo ""
echo -e "${YELLOW}步骤 7: 等待服务启动...${NC}"
sleep 3

echo ""
echo -e "${YELLOW}步骤 8: 查看日志（按 Ctrl+C 退出）...${NC}"
echo ""
pm2 logs duxing-backend --lines 30

echo ""
echo -e "${GREEN}=========================================="
echo -e "  修复完成！"
echo -e "==========================================${NC}"
echo ""
echo "如果还有问题，请检查："
echo "1. pm2 logs duxing-backend"
echo "2. cat /web/duxing/backend/.env"
echo "3. ls -la /web/duxing/backend/database/"
echo ""
