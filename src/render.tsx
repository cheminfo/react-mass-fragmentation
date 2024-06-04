import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

import { SVGMassFragmentation } from './components/SVGMassFragmentation';

export function render(tree, options) {
  const element = <SVGMassFragmentation tree={tree} {...options} />;
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(element);
  });
  return div.innerHTML;
}
