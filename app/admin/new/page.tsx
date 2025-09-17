'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NewPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    tags: '',
    content: '',
    draft: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 生成文件名
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    // 生成当前日期
    const today = new Date().toISOString().split('T')[0]

    // 生成MDX内容
    const mdxContent = `---
title: '${formData.title}'
date: '${today}'
tags: [${formData.tags
      .split(',')
      .map((tag) => `'${tag.trim()}'`)
      .join(', ')}]
draft: ${formData.draft}
summary: '${formData.summary}'
authors: ['default']
---

${formData.content}
`

    // 显示生成的内容
    alert('文章内容已生成！请复制下面的内容到GitHub中创建新文件。')

    // 将内容复制到剪贴板
    navigator.clipboard.writeText(mdxContent).then(() => {
      console.log('Content copied to clipboard')
    })

    // 打开GitHub创建文件页面
    const githubUrl = `https://github.com/Howdrian/my-personal-blog/new/main/data/blog?filename=${slug}.mdx`
    window.open(githubUrl, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">新建文章</h1>
              <p className="text-gray-600">创建一篇新的博客文章</p>
            </div>
            <Link
              href="/admin"
              className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            >
              返回管理
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                文章标题 *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="输入文章标题..."
              />
            </div>

            {/* Summary */}
            <div>
              <label htmlFor="summary" className="mb-2 block text-sm font-medium text-gray-700">
                文章摘要 *
              </label>
              <textarea
                id="summary"
                name="summary"
                required
                rows={3}
                value={formData.summary}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="简要描述文章内容..."
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="mb-2 block text-sm font-medium text-gray-700">
                标签
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="技术, React, Next.js (用逗号分隔)"
              />
              <p className="mt-1 text-sm text-gray-500">用逗号分隔多个标签</p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
                文章内容 *
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={15}
                value={formData.content}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="# 标题

这里写你的文章内容，支持Markdown语法...

## 小标题

可以使用各种Markdown语法：

- 列表项
- 另一个列表项

```javascript
// 代码块
const hello = 'world'
```

**粗体文本** 和 *斜体文本*
"
              />
            </div>

            {/* Draft Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="draft"
                name="draft"
                checked={formData.draft}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="draft" className="ml-2 block text-sm text-gray-700">
                保存为草稿
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin"
                className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                取消
              </Link>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                生成文章并在GitHub中创建
              </button>
            </div>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h3 className="mb-3 text-lg font-medium text-blue-900">💡 使用说明</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>1. 填写完表单后，点击"生成文章并在GitHub中创建"按钮</p>
            <p>2. 系统会自动生成MDX格式的文章内容并复制到剪贴板</p>
            <p>3. 同时会打开GitHub的新建文件页面</p>
            <p>4. 在GitHub页面中粘贴内容，确认文件名，然后提交</p>
            <p>5. 文章会自动部署到您的博客网站</p>
          </div>
        </div>
      </main>
    </div>
  )
}
