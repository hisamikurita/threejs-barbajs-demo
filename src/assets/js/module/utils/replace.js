/**
 * @descroption bodyタグの更新
 */
export function ReplaceBody(data) {
  const body = document.body;
  body.className = body.className.replace(data.current.namespace, '');
  body.className += data.next.namespace;
}

/**
 * @descroption headタグ内のmetaタグの更新
 */
export function ReplaceHead(data) {
  const head = document.head;
  const newPageRawHead = data.next.html.match(/]*>([\s\S.]*)<\/head>/i)[0];
  const newPageHead = document.createElement('head');
  newPageHead.innerHTML = newPageRawHead;
  const removeHeadTags = [
    "meta[name='keywords']",
    "meta[name='description']",
    "meta[property^='og']",
    "meta[name^='twitter']",
    "meta[name='format-detection']",
    "link[rel='canonical']"
  ].join(',');

  const headTags = head.querySelectorAll(removeHeadTags);
  for (let i = 0; i < headTags.length; i++) {
    head.removeChild(headTags[i]);
  }
  const newHeadTags = newPageHead.querySelectorAll(removeHeadTags);
  for (let i = 0; i < newHeadTags.length; i++) {
    head.prepend(newHeadTags[i]);
  }
}