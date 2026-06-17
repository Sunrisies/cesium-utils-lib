/**
 * typedoc-plugin-markdown 生成后处理：翻译英文标题为中文
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, renameSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const apiDir = join(__dirname, "..", "docs", "api")

const ZH = {
  "Properties": "属性",
  "Parameters": "参数",
  "Returns": "返回值",
  "Examples": "示例",
  "Example": "示例",
  "Type Parameters": "类型参数",
  "Default Value": "默认值",
  "Defined in:": "定义于：",
  "Overrides": "重写",
  "Inherited from": "继承自",
  "Methods": "方法",
  "Enumeration Members": "枚举成员",
  "Enumeration": "枚举",
}

// 收集所有 md 文件
const mdFiles = []
function collect(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) collect(full)
    else if (entry.name.endsWith(".md")) mdFiles.push(full)
  }
}
collect(apiDir)

for (const file of mdFiles) {
  let content = readFileSync(file, "utf-8")
  let changed = false

  for (const [en, zh] of Object.entries(ZH)) {
    // 替换 ## 标题行
    const re = new RegExp(`^## ${en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "gm")
    const newContent = content.replace(re, `## ${zh}`)
    if (newContent !== content) changed = true
    content = newContent

    // 替换行内标记
    const re2 = new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")
    const newContent2 = content.replace(re2, zh)
    if (newContent2 !== content) changed = true
    content = newContent2
  }

  if (changed) {
    writeFileSync(file, content)
    console.log("✅ " + file.replace(apiDir + "\\", ""))
  }
}

// README.md → index.md（VitePress 目录入口）
const readme = join(apiDir, "README.md")
const idx = join(apiDir, "index.md")
if (existsSync(readme)) {
  renameSync(readme, idx)
  // 更新概览内容
  let idxContent = readFileSync(idx, "utf-8")
  // 把模块链接改为中文分组链接
  idxContent = idxContent.replace(/^# .+/m, "# API 参考")
  writeFileSync(idx, idxContent)
  console.log("✅ README.md → index.md")
}

console.log("🎉 完成")
