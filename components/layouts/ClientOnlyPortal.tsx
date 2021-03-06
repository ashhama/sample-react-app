/**
 * Server Side Rendering Causes Issues for Portals. This is the solution provided by React Team to render portals only on Client end
 *
 */

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ClientOnlyPortal: React.FC<{ selector: string }> = (props) => {
  const ref = useRef<Element | null>();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(props.selector);
    setMounted(true);
  }, [props.selector]);

  return mounted
    ? createPortal(
        props.children,
        ref.current ? ref.current : document.createElement("div")
      )
    : null;
};

export default ClientOnlyPortal;
