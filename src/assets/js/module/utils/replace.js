/**
 * @descroption bodyタグの更新
 */
export function ReplaceBody(data) {
  const body = document.body;
  body.className = body.className.replace(data.current.namespace, '');
  body.className += data.next.namespace;
}