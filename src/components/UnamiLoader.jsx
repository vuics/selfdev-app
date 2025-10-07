import { useEffect } from "react";
import conf from "../conf.js"

export default function UmamiScript() {
  useEffect(() => {
    if (!conf.unami.enable) {
      return;
    }

    const script = document.createElement("script");
    script.defer = true;
    script.src = conf.unami.url
    script.dataset.websiteId = conf.unami.websiteId
    document.head.appendChild(script);
  }, []);

  return null;
}
