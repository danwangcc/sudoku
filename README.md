# Sudoku

一个基于 Vue 3 + TypeScript + Pinia 的数独游戏。

## 特性

- 🎮 五种难度：Easy / Medium / Hard / Very-hard / Insane
- ⌨️ 键盘操作：方向键 / WASD 移动，数字键输入，Q 删除，E 切换备选模式，R 重置
- ✏️ 备选模式：在格子中标注候选数字
- 🎨 行/列/宫关联高亮，冲突红色提示
- 📱 移动端响应式适配
- ⚡ 一键通关（控制台 `__sudoku_solve()`）

## 操作说明

| 操作 | 快捷键 | 说明 |
|------|--------|------|
| 移动 | `↑↓←→` / `WASD` | 长按连续移动 |
| 输入 | `1-9` / `Numpad1-9` | 填入数字 |
| 备选 | `E` | 切换确定/备选输入模式 |
| 删除 | `Q` | 清除当前格 |
| 重置 | `R` | 重置棋盘 |

## 技术栈

- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Pinia (状态管理)
- Vue Router
- Vite
- SCSS

## 项目搭建

```sh
pnpm install
```

### 开发

```sh
pnpm dev
```

### 构建

```sh
pnpm build
```

### 类型检查

```sh
pnpm type-check
```

### Lint

```sh
pnpm lint
```
