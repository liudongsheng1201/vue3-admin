import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'
import 'highlight.js/styles/github.css'

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }),
)

function renderMarkdown(el, binding) {
  const content = binding.value || el.textContent || ''
  if (!content) return

  try {
    const rawHtml = marked.parse(content)

    // 安全过滤
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'br',
        'hr',
        'ul',
        'ol',
        'li',
        'strong',
        'em',
        'b',
        'i',
        'code',
        'pre',
        'blockquote',
        'a',
        'img',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'div',
        'span',
      ],
      ALLOWED_ATTR: ['class', 'href', 'target', 'rel', 'src', 'alt'],
    })

    el.innerHTML = cleanHtml
    el.classList.add('markdown-body')
  } catch (error) {
    console.error('渲染失败:', error)
    el.innerHTML = content
  }
}

export const markdown = {
  mounted(el, binding) {
    renderMarkdown(el, binding)
  },

  updated(el, binding) {
    renderMarkdown(el, binding)
  },
}
