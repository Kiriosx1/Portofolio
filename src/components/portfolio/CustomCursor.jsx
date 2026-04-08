import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
    `;
    cursor.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2" fill="#a855f7"/>
        <line x1="10" y1="0" x2="10" y2="6" stroke="#a855f7" stroke-width="1"/>
        <line x1="10" y1="14" x2="10" y2="20" stroke="#a855f7" stroke-width="1"/>
        <line x1="0" y1="10" x2="6" y2="10" stroke="#a855f7" stroke-width="1"/>
        <line x1="14" y1="10" x2="20" y2="10" stroke="#a855f7" stroke-width="1"/>
      </svg>
    `;
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
    };

    document.addEventListener('mousemove', moveCursor);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.style.cursor = 'default';
      cursor.remove();
    };
  }, []);

  return null;
}