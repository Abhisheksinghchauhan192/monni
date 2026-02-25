import { useEffect, useRef } from "react";

export default function SentinelLoader({
  onVisible,
  hasMore,
  loading,
  itemsLength,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!hasMore || loading) return;
    if (itemsLength === 0) return; // prevent first mount trigger

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onVisible();
        }
      },
      { threshold: 1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasMore, loading, onVisible, itemsLength]);

  return <div ref={ref} className="h-10" />;
}