import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

import { SVGMassFragmentation } from './components/MassFragmentation';

export function render(sequence, info, options) {
  const element = (
    <SVGMassFragmentation sequence={sequence} info={info} {...options} />
  );
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(element);
  });
  return div.innerHTML;
}
