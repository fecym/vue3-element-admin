import router from "@/router";

export function useLinkJump() {
  console.log(router, "router");

  const isExternalLink = url => {
    return /^(https?:)?\/\//.test(url);
  };

  const handleLinkJump = url => {
    if (!url) return;

    if (isExternalLink(url)) {
      url = encodeURIComponent(url);
      router.push({ path: "/link-jump", query: { url } });
    } else {
      router.push(url);
    }
  };

  return {
    isExternalLink,
    handleLinkJump,
  };
}
