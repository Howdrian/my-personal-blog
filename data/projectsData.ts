interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: '个人博客系统',
    description: `使用 Next.js + TailwindCSS 构建的现代化博客系统。支持 MDX、搜索、评论、
    标签等功能，具有响应式设计和暗黑模式支持。`,
    imgSrc: '/static/images/blog-preview.png',
    href: 'https://github.com/yourusername/blog',
  },
  {
    title: '在线工具集合',
    description: `一个实用的在线工具集合，包含 JSON 格式化、Base64 编解码、
    时间戳转换等常用工具。使用 React + TypeScript 开发。`,
    imgSrc: '/static/images/tools-preview.png',
    href: '/projects/online-tools',
  },
]

export default projectsData
