import { defineConfig } from 'tinacms'

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'public/static/images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog',
        path: 'data/blog',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'datetime', name: 'date', label: 'Date', required: true },
          { type: 'string', name: 'tags', label: 'Tags', list: true },
          { type: 'boolean', name: 'draft', label: 'Draft' },
          { type: 'string', name: 'summary', label: 'Summary', ui: { component: 'textarea' } },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'authors',
        label: 'Authors',
        path: 'data/authors',
        fields: [
          { type: 'string', name: 'name', label: 'Name', isTitle: true, required: true },
          { type: 'image', name: 'avatar', label: 'Avatar' },
          { type: 'string', name: 'occupation', label: 'Occupation' },
          { type: 'string', name: 'company', label: 'Company' },
          { type: 'string', name: 'email', label: 'Email' },
          { type: 'rich-text', name: 'body', label: 'Bio', isBody: true },
        ],
      },
    ],
  },
})
