import { useEffect, useRef, useState } from 'react';

export default function useInView(options = {}){
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(()=>{
    const el = ref.current;
    if(!el) return;
    const obs = new IntersectionObserver((entries)=>{
      const e = entries[0];
      if(e.isIntersecting){
        setInView(true);
        if(options.once !== false) obs.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    obs.observe(el);
    return ()=> obs.disconnect();
  }, [ref, options]);

  return [ref, inView];
}
