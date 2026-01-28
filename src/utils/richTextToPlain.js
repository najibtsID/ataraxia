export default function richTextToPlain(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(richTextToPlain).join('');

  // text node
  if (node.nodeType === 'text' && node.value) return node.value;

  // container node with content
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(richTextToPlain).join('');
  }

  // fallback
  return '';
}
