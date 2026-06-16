/**
 * 合并 typedoc-plugin-markdown 模块目录为单文件
 * 每个模块目录（如 lonlat/）合并为 docs/api/lonlat.md
 * 自动添加中文标题 frontmatter
 */
import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const apiDir = join(__dirname, "..", "docs", "api")

// 模块名 → 中文标题 + 描述
const MODULE_META = {
  calculateLocationMatrix: {
    title: "位置矩阵",
    desc: "根据经纬度与朝向计算局部坐标变换矩阵（Matrix4），用于将 3D 模型放置在地球表面",
  },
  flyTo: {
    title: "相机飞行",
    desc: "相机平滑飞至指定位置，支持自定义朝向和飞行时长",
  },
  flyToPositions: {
    title: "多点视野飞行",
    desc: "根据一组坐标点自动计算包围盒中心与最佳高度，飞至所有点可见的视野",
  },
  lonlat: {
    title: "坐标转换",
    desc: "屏幕坐标拾取与 Cartesian3 转换，获取经纬度与海拔高度",
  },
  setView: {
    title: "相机跳转",
    desc: "相机即时跳转至指定位置，无过渡动画，适用于地图初始化和坐标复位",
  },
}

// 找出所有模块目录
const entries = readdirSync(apiDir, { withFileTypes: true })
const modDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name)

for (const dirName of modDirs) {
  const dirPath = join(apiDir, dirName)
  const readmePath = join(dirPath, "README.md")
  if (!existsSync(readmePath)) continue
  const meta = MODULE_META[dirName]

  let content = readFileSync(readmePath, "utf-8")

  // 将所有子文件引用替换为子文件内容
  content = inlineChildren(content, dirPath)

  // 清理残留的相对链接
  content = content.replace(/\[([^\]]+)\]\([^)]*\.md\)/g, "$1")

  // 清理空分组标题和多余空行
  content = content
    .replace(/## (Functions|Interfaces)\s*\n/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  // 加 frontmatter 和中文标题
  const frontmatter = `---\ntitle: ${meta?.title || dirName}\ndescription: ${meta?.desc || ""}\n---\n`
  const chineseTitle = `# ${meta?.title || dirName}\n\n> ${meta?.desc || ""}\n`
  const body = content.replace(/^# .+\n?/, chineseTitle)

  writeFileSync(join(apiDir, dirName + ".md"), frontmatter + "\n" + body + "\n")
  console.log("✅ " + dirName + ".md")
  rmSync(dirPath, { recursive: true })
}

// 更新 index.md 为中文模块链接表
let indexMd = "---\ntitle: API 参考\n---\n\n# API 参考\n\n| 模块 | 说明 |\n| --- | --- |\n"
for (const [name, meta] of Object.entries(MODULE_META)) {
  indexMd += `| [${meta.title}](${name}.md) | ${meta.desc} |\n`
}
writeFileSync(join(apiDir, "index.md"), indexMd + "\n")
console.log("✅ index.md（已更新）")

// 删除 typedoc 生成的旧 README.md 残留
const oldReadme = join(apiDir, "README.md")
if (existsSync(oldReadme)) {
  rmSync(oldReadme)
  console.log("🗑️  删除旧 README.md 残留")
}

console.log("🎉 全部完成")

function inlineChildren(content, baseDir) {
  const regex = /\[([^\]]+)\]\(([^)]+\.md)\)/g
  let result = content
  let match
  while ((match = regex.exec(result)) !== null) {
    const relPath = match[2]
    const childPath = join(baseDir, relPath)
    if (existsSync(childPath)) {
      let childContent = readFileSync(childPath, "utf-8")
      childContent = childContent.replace(/^# (Function|Interface): .+\n?/m, "")
      childContent = inlineChildren(childContent, baseDir)
      const escaped = relPath.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&")
      result = result.replace(
        new RegExp(`^- \\[[^\\]]+\\]\\(${escaped}\\)\\s*$`, "m"),
        childContent.trimEnd()
      )
    }
  }
  return result
}
