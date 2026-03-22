// Food database with 150+ items
// unit: serving size description
// kcal: calories per serving
// servingSize: grams/ml per serving
// category: 主食/肉蛋/蔬菜/水果/乳制品/快餐/零食/饮品/菜肴

export const CATEGORIES = [
  '全部', '主食', '肉蛋', '蔬菜', '水果', '乳制品', '快餐', '零食', '饮品', '菜肴'
];

export const FOODS = [
  // ===== 主食 (Staples) =====
  {
    id: 'f001', name: '米饭', category: '主食',
    kcalPer100: 130, unit: '克', servingSize: 100,
    kcalPerServing: 130, servingLabel: '100克'
  },
  {
    id: 'f002', name: '白米粥', category: '主食',
    kcalPer100: 46, unit: '克', servingSize: 100,
    kcalPerServing: 46, servingLabel: '100克'
  },
  {
    id: 'f003', name: '馒头', category: '主食',
    kcalPer100: 223, unit: '个', servingSize: 80,
    kcalPerServing: 178, servingLabel: '1个(80克)'
  },
  {
    id: 'f004', name: '面条(煮熟)', category: '主食',
    kcalPer100: 137, unit: '克', servingSize: 100,
    kcalPerServing: 137, servingLabel: '100克'
  },
  {
    id: 'f005', name: '红薯', category: '主食',
    kcalPer100: 86, unit: '克', servingSize: 100,
    kcalPerServing: 86, servingLabel: '100克'
  },
  {
    id: 'f006', name: '土豆', category: '主食',
    kcalPer100: 77, unit: '克', servingSize: 100,
    kcalPerServing: 77, servingLabel: '100克'
  },
  {
    id: 'f007', name: '油条', category: '主食',
    kcalPer100: 388, unit: '根', servingSize: 60,
    kcalPerServing: 233, servingLabel: '1根(60克)'
  },
  {
    id: 'f008', name: '豆腐', category: '主食',
    kcalPer100: 76, unit: '克', servingSize: 100,
    kcalPerServing: 76, servingLabel: '100克'
  },
  {
    id: 'f009', name: '豆浆', category: '主食',
    kcalPer100: 31, unit: '毫升', servingSize: 250,
    kcalPerServing: 78, servingLabel: '250毫升'
  },
  {
    id: 'f010', name: '花卷', category: '主食',
    kcalPer100: 214, unit: '个', servingSize: 70,
    kcalPerServing: 150, servingLabel: '1个(70克)'
  },
  {
    id: 'f011', name: '包子(肉馅)', category: '主食',
    kcalPer100: 226, unit: '个', servingSize: 80,
    kcalPerServing: 181, servingLabel: '1个(80克)'
  },
  {
    id: 'f012', name: '烧饼', category: '主食',
    kcalPer100: 297, unit: '个', servingSize: 70,
    kcalPerServing: 208, servingLabel: '1个(70克)'
  },
  {
    id: 'f013', name: '玉米(煮熟)', category: '主食',
    kcalPer100: 112, unit: '根', servingSize: 150,
    kcalPerServing: 168, servingLabel: '1根(150克)'
  },
  {
    id: 'f014', name: '糯米饭', category: '主食',
    kcalPer100: 175, unit: '克', servingSize: 100,
    kcalPerServing: 175, servingLabel: '100克'
  },
  {
    id: 'f015', name: '燕麦片', category: '主食',
    kcalPer100: 367, unit: '克', servingSize: 50,
    kcalPerServing: 184, servingLabel: '50克'
  },
  {
    id: 'f016', name: '全麦面包', category: '主食',
    kcalPer100: 246, unit: '片', servingSize: 30,
    kcalPerServing: 74, servingLabel: '1片(30克)'
  },
  {
    id: 'f017', name: '白面包', category: '主食',
    kcalPer100: 265, unit: '片', servingSize: 30,
    kcalPerServing: 80, servingLabel: '1片(30克)'
  },
  {
    id: 'f018', name: '荞麦面', category: '主食',
    kcalPer100: 340, unit: '克', servingSize: 100,
    kcalPerServing: 340, servingLabel: '100克(干)'
  },

  // ===== 肉蛋 (Proteins) =====
  {
    id: 'p001', name: '鸡蛋', category: '肉蛋',
    kcalPer100: 144, unit: '个', servingSize: 60,
    kcalPerServing: 86, servingLabel: '1个(60克)'
  },
  {
    id: 'p002', name: '鸡胸肉', category: '肉蛋',
    kcalPer100: 133, unit: '克', servingSize: 100,
    kcalPerServing: 133, servingLabel: '100克'
  },
  {
    id: 'p003', name: '猪肉(肥瘦)', category: '肉蛋',
    kcalPer100: 395, unit: '克', servingSize: 100,
    kcalPerServing: 395, servingLabel: '100克'
  },
  {
    id: 'p004', name: '牛肉(瘦)', category: '肉蛋',
    kcalPer100: 125, unit: '克', servingSize: 100,
    kcalPerServing: 125, servingLabel: '100克'
  },
  {
    id: 'p005', name: '三文鱼', category: '肉蛋',
    kcalPer100: 208, unit: '克', servingSize: 100,
    kcalPerServing: 208, servingLabel: '100克'
  },
  {
    id: 'p006', name: '虾', category: '肉蛋',
    kcalPer100: 93, unit: '克', servingSize: 100,
    kcalPerServing: 93, servingLabel: '100克'
  },
  {
    id: 'p007', name: '猪里脊肉', category: '肉蛋',
    kcalPer100: 155, unit: '克', servingSize: 100,
    kcalPerServing: 155, servingLabel: '100克'
  },
  {
    id: 'p008', name: '鸡腿肉', category: '肉蛋',
    kcalPer100: 181, unit: '克', servingSize: 100,
    kcalPerServing: 181, servingLabel: '100克'
  },
  {
    id: 'p009', name: '鸭肉', category: '肉蛋',
    kcalPer100: 240, unit: '克', servingSize: 100,
    kcalPerServing: 240, servingLabel: '100克'
  },
  {
    id: 'p010', name: '鲈鱼', category: '肉蛋',
    kcalPer100: 105, unit: '克', servingSize: 100,
    kcalPerServing: 105, servingLabel: '100克'
  },
  {
    id: 'p011', name: '带鱼', category: '肉蛋',
    kcalPer100: 127, unit: '克', servingSize: 100,
    kcalPerServing: 127, servingLabel: '100克'
  },
  {
    id: 'p012', name: '鱿鱼', category: '肉蛋',
    kcalPer100: 92, unit: '克', servingSize: 100,
    kcalPerServing: 92, servingLabel: '100克'
  },
  {
    id: 'p013', name: '螃蟹', category: '肉蛋',
    kcalPer100: 103, unit: '只', servingSize: 150,
    kcalPerServing: 155, servingLabel: '1只(150克)'
  },
  {
    id: 'p014', name: '培根', category: '肉蛋',
    kcalPer100: 181, unit: '片', servingSize: 20,
    kcalPerServing: 36, servingLabel: '1片(20克)'
  },
  {
    id: 'p015', name: '火腿肠', category: '肉蛋',
    kcalPer100: 212, unit: '根', servingSize: 60,
    kcalPerServing: 127, servingLabel: '1根(60克)'
  },
  {
    id: 'p016', name: '午餐肉罐头', category: '肉蛋',
    kcalPer100: 176, unit: '克', servingSize: 100,
    kcalPerServing: 176, servingLabel: '100克'
  },

  // ===== 蔬菜 (Vegetables) =====
  {
    id: 'v001', name: '白菜', category: '蔬菜',
    kcalPer100: 17, unit: '克', servingSize: 100,
    kcalPerServing: 17, servingLabel: '100克'
  },
  {
    id: 'v002', name: '菠菜', category: '蔬菜',
    kcalPer100: 24, unit: '克', servingSize: 100,
    kcalPerServing: 24, servingLabel: '100克'
  },
  {
    id: 'v003', name: '西红柿', category: '蔬菜',
    kcalPer100: 20, unit: '个', servingSize: 150,
    kcalPerServing: 30, servingLabel: '1个(150克)'
  },
  {
    id: 'v004', name: '黄瓜', category: '蔬菜',
    kcalPer100: 16, unit: '根', servingSize: 150,
    kcalPerServing: 24, servingLabel: '1根(150克)'
  },
  {
    id: 'v005', name: '花椰菜(西蓝花)', category: '蔬菜',
    kcalPer100: 25, unit: '克', servingSize: 100,
    kcalPerServing: 25, servingLabel: '100克'
  },
  {
    id: 'v006', name: '胡萝卜', category: '蔬菜',
    kcalPer100: 37, unit: '根', servingSize: 100,
    kcalPerServing: 37, servingLabel: '1根(100克)'
  },
  {
    id: 'v007', name: '芹菜', category: '蔬菜',
    kcalPer100: 14, unit: '克', servingSize: 100,
    kcalPerServing: 14, servingLabel: '100克'
  },
  {
    id: 'v008', name: '大葱', category: '蔬菜',
    kcalPer100: 30, unit: '克', servingSize: 50,
    kcalPerServing: 15, servingLabel: '50克'
  },
  {
    id: 'v009', name: '洋葱', category: '蔬菜',
    kcalPer100: 39, unit: '个', servingSize: 150,
    kcalPerServing: 59, servingLabel: '1个(150克)'
  },
  {
    id: 'v010', name: '茄子', category: '蔬菜',
    kcalPer100: 21, unit: '根', servingSize: 200,
    kcalPerServing: 42, servingLabel: '1根(200克)'
  },
  {
    id: 'v011', name: '青椒', category: '蔬菜',
    kcalPer100: 22, unit: '个', servingSize: 80,
    kcalPerServing: 18, servingLabel: '1个(80克)'
  },
  {
    id: 'v012', name: '莴笋', category: '蔬菜',
    kcalPer100: 15, unit: '克', servingSize: 100,
    kcalPerServing: 15, servingLabel: '100克'
  },
  {
    id: 'v013', name: '冬瓜', category: '蔬菜',
    kcalPer100: 11, unit: '克', servingSize: 100,
    kcalPerServing: 11, servingLabel: '100克'
  },
  {
    id: 'v014', name: '苦瓜', category: '蔬菜',
    kcalPer100: 19, unit: '根', servingSize: 200,
    kcalPerServing: 38, servingLabel: '1根(200克)'
  },
  {
    id: 'v015', name: '豆芽', category: '蔬菜',
    kcalPer100: 18, unit: '克', servingSize: 100,
    kcalPerServing: 18, servingLabel: '100克'
  },
  {
    id: 'v016', name: '香菇', category: '蔬菜',
    kcalPer100: 19, unit: '朵', servingSize: 20,
    kcalPerServing: 4, servingLabel: '1朵(20克)'
  },
  {
    id: 'v017', name: '生菜', category: '蔬菜',
    kcalPer100: 13, unit: '克', servingSize: 100,
    kcalPerServing: 13, servingLabel: '100克'
  },

  // ===== 水果 (Fruits) =====
  {
    id: 'fr001', name: '苹果', category: '水果',
    kcalPer100: 54, unit: '个', servingSize: 200,
    kcalPerServing: 108, servingLabel: '1个(200克)'
  },
  {
    id: 'fr002', name: '香蕉', category: '水果',
    kcalPer100: 91, unit: '根', servingSize: 120,
    kcalPerServing: 109, servingLabel: '1根(120克)'
  },
  {
    id: 'fr003', name: '橙子', category: '水果',
    kcalPer100: 48, unit: '个', servingSize: 200,
    kcalPerServing: 96, servingLabel: '1个(200克)'
  },
  {
    id: 'fr004', name: '草莓', category: '水果',
    kcalPer100: 32, unit: '克', servingSize: 100,
    kcalPerServing: 32, servingLabel: '100克'
  },
  {
    id: 'fr005', name: '西瓜', category: '水果',
    kcalPer100: 30, unit: '克', servingSize: 300,
    kcalPerServing: 90, servingLabel: '300克'
  },
  {
    id: 'fr006', name: '葡萄', category: '水果',
    kcalPer100: 43, unit: '克', servingSize: 100,
    kcalPerServing: 43, servingLabel: '100克'
  },
  {
    id: 'fr007', name: '桃子', category: '水果',
    kcalPer100: 48, unit: '个', servingSize: 150,
    kcalPerServing: 72, servingLabel: '1个(150克)'
  },
  {
    id: 'fr008', name: '梨', category: '水果',
    kcalPer100: 50, unit: '个', servingSize: 200,
    kcalPerServing: 100, servingLabel: '1个(200克)'
  },
  {
    id: 'fr009', name: '芒果', category: '水果',
    kcalPer100: 60, unit: '个', servingSize: 250,
    kcalPerServing: 150, servingLabel: '1个(250克)'
  },
  {
    id: 'fr010', name: '哈密瓜', category: '水果',
    kcalPer100: 34, unit: '克', servingSize: 200,
    kcalPerServing: 68, servingLabel: '200克'
  },
  {
    id: 'fr011', name: '猕猴桃', category: '水果',
    kcalPer100: 61, unit: '个', servingSize: 80,
    kcalPerServing: 49, servingLabel: '1个(80克)'
  },
  {
    id: 'fr012', name: '蓝莓', category: '水果',
    kcalPer100: 57, unit: '克', servingSize: 100,
    kcalPerServing: 57, servingLabel: '100克'
  },

  // ===== 乳制品 (Dairy) =====
  {
    id: 'd001', name: '牛奶', category: '乳制品',
    kcalPer100: 65, unit: '毫升', servingSize: 250,
    kcalPerServing: 163, servingLabel: '250毫升'
  },
  {
    id: 'd002', name: '酸奶', category: '乳制品',
    kcalPer100: 72, unit: '克', servingSize: 200,
    kcalPerServing: 144, servingLabel: '200克'
  },
  {
    id: 'd003', name: '奶酪', category: '乳制品',
    kcalPer100: 328, unit: '片', servingSize: 20,
    kcalPerServing: 66, servingLabel: '1片(20克)'
  },
  {
    id: 'd004', name: '豆奶', category: '乳制品',
    kcalPer100: 43, unit: '毫升', servingSize: 250,
    kcalPerServing: 108, servingLabel: '250毫升'
  },
  {
    id: 'd005', name: '炼乳', category: '乳制品',
    kcalPer100: 328, unit: '勺', servingSize: 20,
    kcalPerServing: 66, servingLabel: '1勺(20克)'
  },
  {
    id: 'd006', name: '奶油', category: '乳制品',
    kcalPer100: 354, unit: '克', servingSize: 30,
    kcalPerServing: 106, servingLabel: '30克'
  },

  // ===== 快餐 (Fast Food) =====
  {
    id: 'ff001', name: '麦当劳巨无霸', category: '快餐',
    kcalPer100: 250, unit: '个', servingSize: 225,
    kcalPerServing: 563, servingLabel: '1个'
  },
  {
    id: 'ff002', name: '麦当劳薯条(小)', category: '快餐',
    kcalPer100: 323, unit: '份', servingSize: 71,
    kcalPerServing: 230, servingLabel: '1份'
  },
  {
    id: 'ff003', name: '麦当劳薯条(中)', category: '快餐',
    kcalPer100: 323, unit: '份', servingSize: 99,
    kcalPerServing: 320, servingLabel: '1份'
  },
  {
    id: 'ff004', name: '麦当劳薯条(大)', category: '快餐',
    kcalPer100: 323, unit: '份', servingSize: 152,
    kcalPerServing: 490, servingLabel: '1份'
  },
  {
    id: 'ff005', name: '麦辣鸡腿堡', category: '快餐',
    kcalPer100: 248, unit: '个', servingSize: 198,
    kcalPerServing: 491, servingLabel: '1个'
  },
  {
    id: 'ff006', name: '麦当劳麦香鱼', category: '快餐',
    kcalPer100: 247, unit: '个', servingSize: 153,
    kcalPerServing: 379, servingLabel: '1个'
  },
  {
    id: 'ff007', name: '麦当劳双层吉士堡', category: '快餐',
    kcalPer100: 256, unit: '个', servingSize: 181,
    kcalPerServing: 462, servingLabel: '1个'
  },
  {
    id: 'ff008', name: '肯德基原味鸡', category: '快餐',
    kcalPer100: 294, unit: '块', servingSize: 100,
    kcalPerServing: 294, servingLabel: '1块'
  },
  {
    id: 'ff009', name: '肯德基香辣鸡腿堡', category: '快餐',
    kcalPer100: 247, unit: '个', servingSize: 211,
    kcalPerServing: 521, servingLabel: '1个'
  },
  {
    id: 'ff010', name: '肯德基薯条(中)', category: '快餐',
    kcalPer100: 314, unit: '份', servingSize: 108,
    kcalPerServing: 340, servingLabel: '1份'
  },
  {
    id: 'ff011', name: '必胜客芝士披萨', category: '快餐',
    kcalPer100: 266, unit: '片', servingSize: 100,
    kcalPerServing: 266, servingLabel: '1片'
  },
  {
    id: 'ff012', name: '星巴克拿铁', category: '快餐',
    kcalPer100: 56, unit: '杯', servingSize: 340,
    kcalPerServing: 190, servingLabel: '1杯(大)'
  },
  {
    id: 'ff013', name: '星巴克美式', category: '快餐',
    kcalPer100: 4, unit: '杯', servingSize: 340,
    kcalPerServing: 15, servingLabel: '1杯(大)'
  },
  {
    id: 'ff014', name: '汉堡王皇堡', category: '快餐',
    kcalPer100: 245, unit: '个', servingSize: 270,
    kcalPerServing: 660, servingLabel: '1个'
  },
  {
    id: 'ff015', name: '麦当劳麦辣鸡翅', category: '快餐',
    kcalPer100: 280, unit: '块', servingSize: 70,
    kcalPerServing: 196, servingLabel: '1块'
  },
  {
    id: 'ff016', name: '肯德基土豆泥', category: '快餐',
    kcalPer100: 88, unit: '份', servingSize: 130,
    kcalPerServing: 114, servingLabel: '1份'
  },
  {
    id: 'ff017', name: '麦当劳麦辣堡', category: '快餐',
    kcalPer100: 240, unit: '个', servingSize: 180,
    kcalPerServing: 432, servingLabel: '1个'
  },
  {
    id: 'ff018', name: '必胜客培根披萨', category: '快餐',
    kcalPer100: 285, unit: '片', servingSize: 100,
    kcalPerServing: 285, servingLabel: '1片'
  },

  // ===== 零食 (Snacks) =====
  {
    id: 's001', name: '薯片', category: '零食',
    kcalPer100: 536, unit: '克', servingSize: 30,
    kcalPerServing: 161, servingLabel: '30克'
  },
  {
    id: 's002', name: '奥利奥饼干', category: '零食',
    kcalPer100: 483, unit: '块', servingSize: 11,
    kcalPerServing: 53, servingLabel: '3块(33克)'
  },
  {
    id: 's003', name: '士力架', category: '零食',
    kcalPer100: 488, unit: '根', servingSize: 50,
    kcalPerServing: 244, servingLabel: '1根(50克)'
  },
  {
    id: 's004', name: '旺旺雪饼', category: '零食',
    kcalPer100: 400, unit: '克', servingSize: 30,
    kcalPerServing: 120, servingLabel: '30克'
  },
  {
    id: 's005', name: '巧克力', category: '零食',
    kcalPer100: 546, unit: '格', servingSize: 10,
    kcalPerServing: 55, servingLabel: '1格(10克)'
  },
  {
    id: 's006', name: '瓜子(葵花籽)', category: '零食',
    kcalPer100: 597, unit: '克', servingSize: 30,
    kcalPerServing: 179, servingLabel: '30克'
  },
  {
    id: 's007', name: '花生', category: '零食',
    kcalPer100: 563, unit: '克', servingSize: 30,
    kcalPerServing: 169, servingLabel: '30克'
  },
  {
    id: 's008', name: '腰果', category: '零食',
    kcalPer100: 559, unit: '克', servingSize: 30,
    kcalPerServing: 168, servingLabel: '30克'
  },
  {
    id: 's009', name: '核桃', category: '零食',
    kcalPer100: 627, unit: '个', servingSize: 10,
    kcalPerServing: 63, servingLabel: '1个(10克)'
  },
  {
    id: 's010', name: '棒棒糖', category: '零食',
    kcalPer100: 394, unit: '个', servingSize: 12,
    kcalPerServing: 47, servingLabel: '1个(12克)'
  },
  {
    id: 's011', name: '方便面', category: '零食',
    kcalPer100: 473, unit: '包', servingSize: 100,
    kcalPerServing: 473, servingLabel: '1包(100克)'
  },
  {
    id: 's012', name: '饼干(苏打)', category: '零食',
    kcalPer100: 408, unit: '块', servingSize: 10,
    kcalPerServing: 41, servingLabel: '1块(10克)'
  },

  // ===== 饮品 (Beverages) =====
  {
    id: 'b001', name: '可口可乐', category: '饮品',
    kcalPer100: 43, unit: '罐', servingSize: 330,
    kcalPerServing: 142, servingLabel: '1罐(330毫升)'
  },
  {
    id: 'b002', name: '橙汁', category: '饮品',
    kcalPer100: 44, unit: '毫升', servingSize: 250,
    kcalPerServing: 110, servingLabel: '250毫升'
  },
  {
    id: 'b003', name: '啤酒', category: '饮品',
    kcalPer100: 43, unit: '罐', servingSize: 330,
    kcalPerServing: 142, servingLabel: '1罐(330毫升)'
  },
  {
    id: 'b004', name: '绿茶', category: '饮品',
    kcalPer100: 0, unit: '毫升', servingSize: 250,
    kcalPerServing: 0, servingLabel: '250毫升'
  },
  {
    id: 'b005', name: '牛奶咖啡', category: '饮品',
    kcalPer100: 67, unit: '毫升', servingSize: 250,
    kcalPerServing: 168, servingLabel: '250毫升'
  },
  {
    id: 'b006', name: '雪碧', category: '饮品',
    kcalPer100: 41, unit: '罐', servingSize: 330,
    kcalPerServing: 135, servingLabel: '1罐(330毫升)'
  },
  {
    id: 'b007', name: '红茶', category: '饮品',
    kcalPer100: 1, unit: '毫升', servingSize: 250,
    kcalPerServing: 3, servingLabel: '250毫升'
  },
  {
    id: 'b008', name: '奶茶(含糖)', category: '饮品',
    kcalPer100: 60, unit: '杯', servingSize: 500,
    kcalPerServing: 300, servingLabel: '1杯(500毫升)'
  },
  {
    id: 'b009', name: '葡萄汁', category: '饮品',
    kcalPer100: 56, unit: '毫升', servingSize: 250,
    kcalPerServing: 140, servingLabel: '250毫升'
  },
  {
    id: 'b010', name: '矿泉水', category: '饮品',
    kcalPer100: 0, unit: '毫升', servingSize: 500,
    kcalPerServing: 0, servingLabel: '500毫升'
  },
  {
    id: 'b011', name: '红酒', category: '饮品',
    kcalPer100: 72, unit: '杯', servingSize: 150,
    kcalPerServing: 108, servingLabel: '1杯(150毫升)'
  },
  {
    id: 'b012', name: '冰淇淋', category: '饮品',
    kcalPer100: 193, unit: '个', servingSize: 80,
    kcalPerServing: 154, servingLabel: '1个(80克)'
  },

  // ===== 菜肴 (Chinese Dishes) =====
  {
    id: 'cd001', name: '红烧肉', category: '菜肴',
    kcalPer100: 476, unit: '克', servingSize: 100,
    kcalPerServing: 476, servingLabel: '100克'
  },
  {
    id: 'cd002', name: '宫保鸡丁', category: '菜肴',
    kcalPer100: 180, unit: '克', servingSize: 200,
    kcalPerServing: 360, servingLabel: '1份(200克)'
  },
  {
    id: 'cd003', name: '番茄炒蛋', category: '菜肴',
    kcalPer100: 108, unit: '克', servingSize: 200,
    kcalPerServing: 216, servingLabel: '1份(200克)'
  },
  {
    id: 'cd004', name: '蛋炒饭', category: '菜肴',
    kcalPer100: 197, unit: '克', servingSize: 300,
    kcalPerServing: 591, servingLabel: '1份(300克)'
  },
  {
    id: 'cd005', name: '小笼包', category: '菜肴',
    kcalPer100: 210, unit: '个', servingSize: 25,
    kcalPerServing: 53, servingLabel: '1个(25克)'
  },
  {
    id: 'cd006', name: '煎饺', category: '菜肴',
    kcalPer100: 220, unit: '个', servingSize: 30,
    kcalPerServing: 66, servingLabel: '1个(30克)'
  },
  {
    id: 'cd007', name: '馄饨', category: '菜肴',
    kcalPer100: 109, unit: '碗', servingSize: 300,
    kcalPerServing: 327, servingLabel: '1碗(300克)'
  },
  {
    id: 'cd008', name: '麻婆豆腐', category: '菜肴',
    kcalPer100: 115, unit: '克', servingSize: 200,
    kcalPerServing: 230, servingLabel: '1份(200克)'
  },
  {
    id: 'cd009', name: '鱼香肉丝', category: '菜肴',
    kcalPer100: 148, unit: '克', servingSize: 200,
    kcalPerServing: 296, servingLabel: '1份(200克)'
  },
  {
    id: 'cd010', name: '回锅肉', category: '菜肴',
    kcalPer100: 310, unit: '克', servingSize: 150,
    kcalPerServing: 465, servingLabel: '1份(150克)'
  },
  {
    id: 'cd011', name: '清蒸鱼', category: '菜肴',
    kcalPer100: 110, unit: '条', servingSize: 300,
    kcalPerServing: 330, servingLabel: '1条(300克)'
  },
  {
    id: 'cd012', name: '红烧排骨', category: '菜肴',
    kcalPer100: 305, unit: '块', servingSize: 80,
    kcalPerServing: 244, servingLabel: '1块(80克)'
  },
  {
    id: 'cd013', name: '炒青菜', category: '菜肴',
    kcalPer100: 45, unit: '克', servingSize: 200,
    kcalPerServing: 90, servingLabel: '1份(200克)'
  },
  {
    id: 'cd014', name: '水煮牛肉', category: '菜肴',
    kcalPer100: 155, unit: '克', servingSize: 200,
    kcalPerServing: 310, servingLabel: '1份(200克)'
  },
  {
    id: 'cd015', name: '糖醋里脊', category: '菜肴',
    kcalPer100: 260, unit: '克', servingSize: 150,
    kcalPerServing: 390, servingLabel: '1份(150克)'
  },
  {
    id: 'cd016', name: '扬州炒饭', category: '菜肴',
    kcalPer100: 204, unit: '份', servingSize: 300,
    kcalPerServing: 612, servingLabel: '1份(300克)'
  },
  {
    id: 'cd017', name: '牛肉面', category: '菜肴',
    kcalPer100: 130, unit: '碗', servingSize: 500,
    kcalPerServing: 650, servingLabel: '1碗(500克)'
  },
  {
    id: 'cd018', name: '酸辣汤', category: '菜肴',
    kcalPer100: 38, unit: '碗', servingSize: 300,
    kcalPerServing: 114, servingLabel: '1碗(300克)'
  },
  {
    id: 'cd019', name: '肉末茄子', category: '菜肴',
    kcalPer100: 130, unit: '克', servingSize: 200,
    kcalPerServing: 260, servingLabel: '1份(200克)'
  },
  {
    id: 'cd020', name: '蒜苗炒肉', category: '菜肴',
    kcalPer100: 180, unit: '克', servingSize: 200,
    kcalPerServing: 360, servingLabel: '1份(200克)'
  },

  // ===== Additional foods to reach 150+ =====
  // More 主食
  {
    id: 'f019', name: '粽子', category: '主食',
    kcalPer100: 212, unit: '个', servingSize: 100,
    kcalPerServing: 212, servingLabel: '1个(100克)'
  },
  {
    id: 'f020', name: '汤圆', category: '主食',
    kcalPer100: 208, unit: '个', servingSize: 30,
    kcalPerServing: 62, servingLabel: '1个(30克)'
  },
  {
    id: 'f021', name: '年糕', category: '主食',
    kcalPer100: 154, unit: '克', servingSize: 100,
    kcalPerServing: 154, servingLabel: '100克'
  },
  // More 肉蛋
  {
    id: 'p017', name: '羊肉', category: '肉蛋',
    kcalPer100: 203, unit: '克', servingSize: 100,
    kcalPerServing: 203, servingLabel: '100克'
  },
  {
    id: 'p018', name: '鸭蛋', category: '肉蛋',
    kcalPer100: 180, unit: '个', servingSize: 65,
    kcalPerServing: 117, servingLabel: '1个(65克)'
  },
  {
    id: 'p019', name: '皮蛋', category: '肉蛋',
    kcalPer100: 171, unit: '个', servingSize: 60,
    kcalPerServing: 103, servingLabel: '1个(60克)'
  },
  // More 蔬菜
  {
    id: 'v018', name: '韭菜', category: '蔬菜',
    kcalPer100: 26, unit: '克', servingSize: 100,
    kcalPerServing: 26, servingLabel: '100克'
  },
  {
    id: 'v019', name: '藕', category: '蔬菜',
    kcalPer100: 70, unit: '克', servingSize: 100,
    kcalPerServing: 70, servingLabel: '100克'
  },
  {
    id: 'v020', name: '山药', category: '蔬菜',
    kcalPer100: 56, unit: '克', servingSize: 100,
    kcalPerServing: 56, servingLabel: '100克'
  },
  // More 水果
  {
    id: 'fr013', name: '石榴', category: '水果',
    kcalPer100: 68, unit: '个', servingSize: 200,
    kcalPerServing: 136, servingLabel: '1个(200克)'
  },
  {
    id: 'fr014', name: '柚子', category: '水果',
    kcalPer100: 41, unit: '块', servingSize: 100,
    kcalPerServing: 41, servingLabel: '100克'
  },
  {
    id: 'fr015', name: '樱桃', category: '水果',
    kcalPer100: 46, unit: '克', servingSize: 100,
    kcalPerServing: 46, servingLabel: '100克'
  },
  // More 乳制品
  {
    id: 'd007', name: '黄油', category: '乳制品',
    kcalPer100: 748, unit: '克', servingSize: 10,
    kcalPerServing: 75, servingLabel: '10克'
  },
  {
    id: 'd008', name: '冰淇淋(香草)', category: '乳制品',
    kcalPer100: 207, unit: '球', servingSize: 66,
    kcalPerServing: 137, servingLabel: '1球(66克)'
  },
  // More 快餐
  {
    id: 'ff019', name: '麦当劳麦辣鸡翅(2块)', category: '快餐',
    kcalPer100: 280, unit: '份', servingSize: 140,
    kcalPerServing: 392, servingLabel: '1份(2块)'
  },
  {
    id: 'ff020', name: '肯德基蛋挞', category: '快餐',
    kcalPer100: 260, unit: '个', servingSize: 80,
    kcalPerServing: 208, servingLabel: '1个'
  },
  // More 零食
  {
    id: 's013', name: '辣条', category: '零食',
    kcalPer100: 450, unit: '包', servingSize: 30,
    kcalPerServing: 135, servingLabel: '1包(30克)'
  },
  {
    id: 's014', name: '爆米花', category: '零食',
    kcalPer100: 456, unit: '克', servingSize: 30,
    kcalPerServing: 137, servingLabel: '30克'
  },
  // More 饮品
  {
    id: 'b013', name: '豆腐脑', category: '饮品',
    kcalPer100: 15, unit: '碗', servingSize: 300,
    kcalPerServing: 45, servingLabel: '1碗(300克)'
  },
  {
    id: 'b014', name: '蜂蜜水', category: '饮品',
    kcalPer100: 30, unit: '杯', servingSize: 250,
    kcalPerServing: 75, servingLabel: '1杯(250毫升)'
  },
  // More 菜肴
  {
    id: 'cd021', name: '夫妻肺片', category: '菜肴',
    kcalPer100: 135, unit: '份', servingSize: 200,
    kcalPerServing: 270, servingLabel: '1份(200克)'
  },
  {
    id: 'cd022', name: '炸鸡腿', category: '菜肴',
    kcalPer100: 295, unit: '个', servingSize: 120,
    kcalPerServing: 354, servingLabel: '1个(120克)'
  },
  {
    id: 'cd023', name: '东坡肉', category: '菜肴',
    kcalPer100: 486, unit: '份', servingSize: 100,
    kcalPerServing: 486, servingLabel: '100克'
  },
];

// Exercise data (kcal/min for 60kg person)
export const EXERCISES = [
  { id: 'e001', name: '跑步', kcalPerMin: 10, icon: '🏃' },
  { id: 'e002', name: '快走', kcalPerMin: 5, icon: '🚶' },
  { id: 'e003', name: '游泳', kcalPerMin: 9, icon: '🏊' },
  { id: 'e004', name: '骑自行车', kcalPerMin: 7, icon: '🚴' },
  { id: 'e005', name: '瑜伽', kcalPerMin: 4, icon: '🧘' },
  { id: 'e006', name: '跳绳', kcalPerMin: 12, icon: '⛹' },
  { id: 'e007', name: '健身房训练', kcalPerMin: 8, icon: '💪' },
  { id: 'e008', name: '爬楼梯', kcalPerMin: 7, icon: '🧗' },
  { id: 'e009', name: '羽毛球', kcalPerMin: 7, icon: '🏸' },
  { id: 'e010', name: '篮球', kcalPerMin: 9, icon: '🏀' },
  { id: 'e011', name: '足球', kcalPerMin: 9, icon: '⚽' },
  { id: 'e012', name: '乒乓球', kcalPerMin: 5, icon: '🏓' },
  { id: 'e013', name: '网球', kcalPerMin: 8, icon: '🎾' },
  { id: 'e014', name: '跆拳道', kcalPerMin: 10, icon: '🥋' },
  { id: 'e015', name: '舞蹈', kcalPerMin: 6, icon: '💃' },
  { id: 'e016', name: '俯卧撑', kcalPerMin: 7, icon: '🤸' },
  { id: 'e017', name: '仰卧起坐', kcalPerMin: 6, icon: '🏋' },
  { id: 'e018', name: '深蹲', kcalPerMin: 7, icon: '🏋' },
  { id: 'e019', name: '椭圆机', kcalPerMin: 8, icon: '⚙️' },
  { id: 'e020', name: '爬山', kcalPerMin: 9, icon: '⛰️' },
];

// Get food by category
export const getFoodsByCategory = (category) => {
  if (category === '全部') return FOODS;
  return FOODS.filter(f => f.category === category);
};

// Search foods by name
export const searchFoods = (query, category = '全部') => {
  const foods = getFoodsByCategory(category);
  if (!query || query.trim() === '') return foods;
  const q = query.toLowerCase().trim();
  return foods.filter(f => f.name.toLowerCase().includes(q));
};

// Calculate calories for a food item with given quantity multiplier
export const calculateCalories = (food, quantity) => {
  return Math.round(food.kcalPerServing * quantity);
};
