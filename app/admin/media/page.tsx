'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MediaPage() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [uploadPath, setUploadPath] = useState('blog')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files)
  }

  const handleUpload = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('请先选择要上传的文件')
      return
    }

    // 为每个文件生成GitHub上传说明
    const instructions = Array.from(selectedFiles)
      .map((file, index) => {
        const fileName = file.name
        const path = `public/static/images/${uploadPath}/${fileName}`
        const publicUrl = `/static/images/${uploadPath}/${fileName}`

        return `文件 ${index + 1}: ${fileName}
- GitHub路径: ${path}
- 博客中引用: ${publicUrl}
- 图片标签: ![${fileName.split('.')[0]}](${publicUrl})`
      })
      .join('\n\n')

    const fullInstructions = `📁 媒体文件上传说明

您选择了 ${selectedFiles.length} 个文件，请按以下步骤上传：

${instructions}

🔗 上传步骤：
1. 点击下方的GitHub链接
2. 在GitHub中导航到 public/static/images/${uploadPath}/ 目录
3. 点击"Add file" > "Upload files"
4. 拖拽或选择您的文件进行上传
5. 提交更改

上传完成后，您就可以在博客文章中使用这些图片了！`

    // 将说明复制到剪贴板
    navigator.clipboard.writeText(fullInstructions).then(() => {
      alert('上传说明已复制到剪贴板！')

      // 打开GitHub媒体目录
      const githubUrl = `https://github.com/Howdrian/my-personal-blog/tree/main/public/static/images/${uploadPath}`
      window.open(githubUrl, '_blank')
    })
  }

  const commonImages = [
    {
      name: 'avatar.png',
      path: '/static/images/avatar.png',
      description: '头像图片',
      category: '系统',
    },
    {
      name: 'logo.png',
      path: '/static/images/logo.png',
      description: '网站Logo',
      category: '系统',
    },
    {
      name: 'twitter-card.png',
      path: '/static/images/twitter-card.png',
      description: '社交媒体卡片',
      category: '系统',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">媒体管理</h1>
              <p className="text-gray-600">管理您的图片和其他媒体文件</p>
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

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Upload Section */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">上传新文件</h2>

          <div className="space-y-4">
            {/* Upload Path Selection */}
            <div>
              <label htmlFor="uploadPath" className="mb-2 block text-sm font-medium text-gray-700">
                上传目录
              </label>
              <select
                id="uploadPath"
                value={uploadPath}
                onChange={(e) => setUploadPath(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 md:w-64"
              >
                <option value="blog">博客文章图片 (/blog/)</option>
                <option value="projects">项目图片 (/projects/)</option>
                <option value="general">通用图片 (/general/)</option>
                <option value="">根目录 (/)</option>
              </select>
            </div>

            {/* File Selection */}
            <div>
              <label htmlFor="fileInput" className="mb-2 block text-sm font-medium text-gray-700">
                选择文件
              </label>
              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">支持多选，推荐图片格式：JPG, PNG, WebP</p>
            </div>

            {/* Selected Files Preview */}
            {selectedFiles && selectedFiles.length > 0 && (
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700">已选择的文件：</h3>
                <ul className="space-y-1">
                  {Array.from(selectedFiles).map((file, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>📁</span>
                      <span>{file.name}</span>
                      <span className="text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!selectedFiles || selectedFiles.length === 0}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              生成上传说明并打开GitHub
            </button>
          </div>
        </div>

        {/* Current Media */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">当前媒体文件</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {commonImages.map((image, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                  <img
                    src={image.path}
                    alt={image.name}
                    className="max-h-full max-w-full rounded-lg object-contain"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                      const parent = (e.target as HTMLElement).parentElement
                      if (parent) {
                        parent.innerHTML = '<div class="text-gray-400 text-sm">图片加载失败</div>'
                      }
                    }}
                  />
                </div>
                <h3 className="font-medium text-gray-900">{image.name}</h3>
                <p className="mb-2 text-sm text-gray-600">{image.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {image.category}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(image.path)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    复制路径
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-medium text-gray-900">🖼️ 图片使用方法</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Markdown语法：</strong>
              </p>
              <code className="block rounded bg-gray-100 p-2">
                ![图片描述](/static/images/your-image.jpg)
              </code>
              <p>
                <strong>MDX语法：</strong>
              </p>
              <code className="block rounded bg-gray-100 p-2">
                &lt;Image src="/static/images/your-image.jpg" alt="描述" width={600} height={400}{' '}
                /&gt;
              </code>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-medium text-gray-900">📁 文件夹结构</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <code>/static/images/blog/</code> - 博客文章图片
              </p>
              <p>
                <code>/static/images/projects/</code> - 项目展示图片
              </p>
              <p>
                <code>/static/images/general/</code> - 通用图片
              </p>
              <p>
                <code>/static/images/</code> - 系统图片（头像、Logo等）
              </p>
            </div>
          </div>
        </div>

        {/* GitHub Links */}
        <div className="mt-8 rounded-lg bg-green-50 p-6">
          <h3 className="mb-3 text-lg font-medium text-green-900">🔗 直接访问GitHub管理</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <a
              href="https://github.com/Howdrian/my-personal-blog/tree/main/public/static/images"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-green-200 bg-white p-3 transition-colors hover:border-green-300"
            >
              <div className="font-medium text-green-900">查看所有媒体文件</div>
              <div className="text-sm text-green-700">浏览 /public/static/images/ 目录</div>
            </a>
            <a
              href="https://github.com/Howdrian/my-personal-blog/upload/main/public/static/images"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-green-200 bg-white p-3 transition-colors hover:border-green-300"
            >
              <div className="font-medium text-green-900">直接上传文件</div>
              <div className="text-sm text-green-700">在GitHub中上传新文件</div>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
