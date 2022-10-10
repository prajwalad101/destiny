import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  selector: string;
}

export default function Portal({ children, selector }: PortalProps) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    ref.current = document.querySelector(selector);

    if (!ref.current)
      throw new Error(
        'Invalid selector. Please specify an element node that exists'
      );

    setMounted(true);
    return () => setMounted(false);
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
