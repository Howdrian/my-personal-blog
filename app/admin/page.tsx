'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface BlogPost {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  draft: boolean
}

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 这里可以添加获取文章列表的逻辑
    // 暂时使用静态数据演示
    const demoData: BlogPost[] = [
      {
        slug: 'welcome-to-my-blog',
        title: '欢迎来到我的个人博客！',
        date: '2024-09-15',
        summary: '这是我博客的第一篇文章，分享我创建这个博客的初衷和未来的计划。',
        tags: ['个人', '博客', '开始'],
        draft: false,
      },
    ]
    setPosts(demoData)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-lg">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">博客管理</h1>
              <p className="text-gray-600">管理您的博客文章和设置</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
              >
                返回首页
              </Link>
              <Link
                href="/admin/new"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                新建文章
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">总文章数</h3>
            <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">已发布</h3>
            <p className="text-2xl font-bold text-green-600">
              {posts.filter((p) => !p.draft).length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">草稿</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {posts.filter((p) => p.draft).length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">总标签数</h3>
            <p className="text-2xl font-bold text-blue-600">
              {new Set(posts.flatMap((p) => p.tags)).size}
            </p>
          </div>
        </div>

        {/* Posts List */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">文章列表</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <div key={post.slug} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                      {post.draft && (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          草稿
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-gray-600">{post.summary}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span>发布日期: {post.date}</span>
                      <span>标签: {post.tags.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-800">编辑</button>
                    <button className="text-green-600 hover:text-green-800">预览</button>
                    <button className="text-red-600 hover:text-red-800">删除</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-medium text-gray-900">快速操作</h3>
            <div className="space-y-3">
              <Link
                href="/admin/new"
                className="block w-full rounded-lg px-4 py-2 text-left text-blue-600 transition-colors hover:bg-blue-50"
              >
                📝 新建文章
              </Link>
              <Link
                href="/admin/settings"
                className="block w-full rounded-lg px-4 py-2 text-left text-gray-600 transition-colors hover:bg-gray-50"
              >
                ⚙️ 网站设置
              </Link>
              <Link
                href="/admin/media"
                className="block w-full rounded-lg px-4 py-2 text-left text-gray-600 transition-colors hover:bg-gray-50"
              >
                🖼️ 媒体管理
              </Link>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-medium text-gray-900">GitHub集成</h3>
            <div className="space-y-3">
              <a
                href="https://github.com/Howdrian/my-personal-blog/tree/main/data/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg px-4 py-2 text-left text-green-600 transition-colors hover:bg-green-50"
              >
                📁 编辑文章 (GitHub)
              </a>
              <a
                href="https://github.com/Howdrian/my-personal-blog/tree/main/data/authors"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg px-4 py-2 text-left text-green-600 transition-colors hover:bg-green-50"
              >
                👤 管理作者 (GitHub)
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-medium text-gray-900">部署状态</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600">网站运行正常</span>
              </div>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg px-4 py-2 text-left text-blue-600 transition-colors hover:bg-blue-50"
              >
                🚀 Vercel 控制台
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
