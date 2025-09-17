'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    title: '我的个人博客',
    author: 'Your Name',
    description: '分享技术、生活和思考的个人空间',
    email: 'your.email@example.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com/x',
    theme: 'system',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 生成siteMetadata.js内容
    const configContent = `/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: '${settings.title}',
  author: '${settings.author}',
  headerTitle: '${settings.title}',
  description: '${settings.description}',
  language: 'zh-cn',
  theme: '${settings.theme}', // system, dark or light
  siteUrl: 'https://your-blog.vercel.app',
  siteRepo: 'https://github.com/Howdrian/my-personal-blog',
  siteLogo: \`\${process.env.BASE_PATH || ''}/static/images/logo.png\`,
  socialBanner: \`\${process.env.BASE_PATH || ''}/static/images/twitter-card.png\`,
  mastodon: 'https://mastodon.social/@mastodonuser',
  email: '${settings.email}',
  github: '${settings.github}',
  x: '${settings.twitter}',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com',
  threads: 'https://www.threads.net',
  instagram: 'https://www.instagram.com',
  medium: 'https://medium.com',
  bluesky: 'https://bsky.app/',
  locale: 'zh-CN',
  stickyNav: false,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: \`\${process.env.BASE_PATH || ''}/search.json\`,
    },
  },
}

module.exports = siteMetadata`

    // 将内容复制到剪贴板
    navigator.clipboard.writeText(configContent).then(() => {
      alert('配置已复制到剪贴板！请在GitHub中编辑 data/siteMetadata.js 文件。')

      // 打开GitHub编辑页面
      const githubUrl =
        'https://github.com/Howdrian/my-personal-blog/edit/main/data/siteMetadata.js'
      window.open(githubUrl, '_blank')
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">网站设置</h1>
              <p className="text-gray-600">配置您的博客基本信息</p>
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
            {/* Basic Info */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">基本信息</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                    网站标题
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={settings.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="author" className="mb-2 block text-sm font-medium text-gray-700">
                    作者名称
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={settings.author}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                网站描述
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={settings.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">联系方式</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="github" className="mb-2 block text-sm font-medium text-gray-700">
                    GitHub 链接
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={settings.github}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="twitter" className="mb-2 block text-sm font-medium text-gray-700">
                    Twitter/X 链接
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={settings.twitter}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="theme" className="mb-2 block text-sm font-medium text-gray-700">
                    默认主题
                  </label>
                  <select
                    id="theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="system">跟随系统</option>
                    <option value="light">浅色模式</option>
                    <option value="dark">深色模式</option>
                  </select>
                </div>
              </div>
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
                生成配置并在GitHub中更新
              </button>
            </div>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-8 rounded-lg bg-green-50 p-6">
          <h3 className="mb-3 text-lg font-medium text-green-900">🔧 配置说明</h3>
          <div className="space-y-2 text-sm text-green-800">
            <p>1. 修改设置后，点击"生成配置并在GitHub中更新"按钮</p>
            <p>2. 系统会自动生成新的配置文件内容并复制到剪贴板</p>
            <p>3. 同时会打开GitHub的文件编辑页面</p>
            <p>4. 粘贴新的配置内容，提交更改</p>
            <p>5. 网站会自动重新部署，几分钟后生效</p>
          </div>
        </div>
      </main>
    </div>
  )
}
