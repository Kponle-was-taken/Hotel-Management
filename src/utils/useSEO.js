// Simple SEO helper - updates document head
export const useSEO = (metadata) => {
  React.useEffect(() => {
    // Update title
    if (metadata.title) {
      document.title = metadata.title;
    }

    // Update or create meta tags
    const updateOrCreateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    if (metadata.description) {
      updateOrCreateMeta('description', metadata.description);
    }
    if (metadata.keywords) {
      updateOrCreateMeta('keywords', metadata.keywords);
    }
    if (metadata.ogTitle) {
      updateOrCreateMeta('og:title', metadata.ogTitle, true);
    }
    if (metadata.ogDescription) {
      updateOrCreateMeta('og:description', metadata.ogDescription, true);
    }
    if (metadata.ogImage) {
      updateOrCreateMeta('og:image', metadata.ogImage, true);
    }
    if (metadata.ogUrl) {
      updateOrCreateMeta('og:url', metadata.ogUrl, true);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical && metadata.canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (canonical && metadata.canonical) {
      canonical.href = metadata.canonical;
    }

    return () => {
      // Cleanup if needed
    };
  }, [metadata]);
};

export default useSEO;
