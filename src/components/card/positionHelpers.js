// Below code has been sourced from https://github.com/mzabriskie/react-draggable to ensure equivalent calculations

export function getBounds(node) {
  const boundNode = node.parentNode;
  const ownerWindow = node.ownerDocument.defaultView;
  const nodeStyle = ownerWindow.getComputedStyle(node);
  const boundNodeStyle = ownerWindow.getComputedStyle(boundNode);
  return {
    top:
      -node.offsetTop +
      int(boundNodeStyle.paddingTop) +
      int(nodeStyle.marginTop),
    right:
      innerWidth(boundNode) -
      outerWidth(node) -
      node.offsetLeft +
      int(boundNodeStyle.paddingRight) -
      int(nodeStyle.marginRight)
  };
}

export function innerWidth(node) {
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= int(computedStyle.paddingLeft);
  width -= int(computedStyle.paddingRight);
  return width;
}

export function outerWidth(node) {
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += int(computedStyle.borderLeftWidth);
  width += int(computedStyle.borderRightWidth);
  return width;
}

export function int(a) {
  return parseInt(a, 10) || 0;
}
