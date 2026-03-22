# 卡路里追踪 (CalTrack) 🥗

一款专为中文用户设计的本地卡路里追踪移动应用，基于 React Native (Expo) 构建。

## ✨ 功能特点

- 📊 **今日概览** — SVG 卡路里环形图，直观显示摄入 vs 目标
- 🍚 **食物记录** — 150+ 中文食物数据库，支持搜索和分类筛选
- 🏃 **运动记录** — 20+ 运动类型，自动计算消耗卡路里
- ⚖️ **体重追踪** — 30天趋势折线图 + BMI 计算器
- ⚙️ **个性化设置** — 每日目标、身高、年龄、性别

## 🚀 快速开始

### 前提条件
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app（手机）或 iOS/Android 模拟器

### 安装运行

```bash
cd caltrack
npm install
npx expo start
```

扫描二维码用 Expo Go 打开，或按 `i` 打开 iOS 模拟器，`a` 打开 Android 模拟器。

## 📁 项目结构

```
caltrack/
├── App.js                      # 入口，底部导航配置
├── app.json                    # Expo 配置
├── babel.config.js
├── package.json
└── src/
    ├── database/
    │   ├── db.js               # SQLite 数据库操作
    │   └── foodData.js         # 150+ 食物 & 运动数据
    ├── screens/
    │   ├── HomeScreen.js       # 今日概览（带日期选择器）
    │   ├── AddFoodScreen.js    # 添加食物（搜索+分类+份量）
    │   ├── ExerciseScreen.js   # 运动记录
    │   ├── WeightScreen.js     # 体重管理 + BMI
    │   └── SettingsScreen.js   # 设置
    ├── components/
    │   ├── CalorieRing.js      # SVG 卡路里环形图
    │   ├── FoodItem.js         # 食物列表项
    │   └── WeightChart.js      # 体重折线图
    └── utils/
        └── calculations.js    # 工具函数（BMI, 卡路里计算等）
```

## 🗄️ 数据库表结构

| 表名 | 字段 |
|------|------|
| `food_log` | id, date, meal, food_id, food_name, quantity, calories, created_at |
| `exercise_log` | id, date, exercise_name, duration_min, calories_burned, created_at |
| `weight_log` | id, date, weight, created_at |
| `settings` | key, value |

## 🍔 食物数据库分类

| 分类 | 示例 |
|------|------|
| 主食 | 米饭、馒头、面条、红薯、油条 |
| 肉蛋 | 鸡胸肉、牛肉、三文鱼、鸡蛋 |
| 蔬菜 | 白菜、菠菜、西红柿、花椰菜 |
| 水果 | 苹果、香蕉、橙子、草莓 |
| 乳制品 | 牛奶、酸奶、奶酪 |
| 快餐 | 麦当劳、肯德基、必胜客、星巴克 |
| 零食 | 薯片、奥利奥、士力架、坚果 |
| 饮品 | 可乐、果汁、奶茶、咖啡 |
| 菜肴 | 红烧肉、宫保鸡丁、番茄炒蛋 |

## 🏃 运动数据库 (基于60kg标准体重，千卡/分钟)

跑步(10), 快走(5), 游泳(9), 骑车(7), 瑜伽(4), 跳绳(12), 健身房(8), 爬楼梯(7), 羽毛球(7) ...

## 🛠️ 技术栈

- **框架**: React Native + Expo SDK 51
- **本地存储**: expo-sqlite (无需后端)
- **导航**: @react-navigation/bottom-tabs
- **图形**: react-native-svg
- **渐变**: expo-linear-gradient
- **图标**: @expo/vector-icons (Ionicons)

## 📱 截图预览

- 首页：绿色渐变头部 + 环形进度图 + 分餐记录
- 添加食物：搜索栏 + 分类标签 + 份量弹窗
- 运动：可滚动列表 + 时长输入 + 消耗预估
- 体重：数字输入 + SVG 折线图 + BMI 指示
- 设置：目标/身高/性别/年龄 + 数据清除

## 📝 注意事项

- 所有数据存储在设备本地 SQLite，不上传云端
- 卡路里数值基于通用营养数据，仅供参考
- 运动消耗基于 60kg 标准体重，按实际体重自动缩放
