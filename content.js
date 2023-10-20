let menuBtn = document.querySelectorAll('[aria-label="更多動作"]');
let nodes = Array.from(menuBtn);
if (nodes.length > 0) {
  nodes[0].click();
}
