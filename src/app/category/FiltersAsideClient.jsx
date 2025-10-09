"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FiltersAsideClient({ children, className }) {
  const router = useRouter();
  const search = useSearchParams();
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateParam = (key, value, multi = false) => {
      const params = new URLSearchParams(search.toString());
      if (multi) {
        const values = new Set(params.getAll(key));
        if (values.has(value)) values.delete(value);
        else values.add(value);
        params.delete(key);
        [...values].forEach((v) => params.append(key, v));
      } else {
        if (value === undefined || value === null || value === "")
          params.delete(key);
        else params.set(key, String(value));
      }
      params.delete("page");
      router.replace(`?${params.toString()}`);
    };

    const onChange = (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      const key = target.getAttribute("data-key");
      if (!key) return;
      const multi = target.getAttribute("data-multi") === "true";
      if (target.type === "checkbox") {
        updateParam(key, target.value, multi);
      } else if (target.type === "number") {
        // defer to blur to avoid too many updates while typing
      }
    };

    const onBlur = (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      const key = target.getAttribute("data-key");
      if (!key) return;
      if (target.type === "number") {
        const val = target.value ? Number(target.value) : "";
        updateParam(key, val, false);
      }
    };

    root.addEventListener("change", onChange, true);
    root.addEventListener("blur", onBlur, true);
    return () => {
      root.removeEventListener("change", onChange, true);
      root.removeEventListener("blur", onBlur, true);
    };
  }, [router, search]);

  return (
    <aside ref={rootRef} className={className}>
      {children}
    </aside>
  );
}
