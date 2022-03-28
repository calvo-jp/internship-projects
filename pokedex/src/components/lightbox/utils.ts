let previousPos: string;
let previousOverflow: string;
let previousScrollTop: number;

export const hideScrollbar = () => {
  previousPos = document.body.style.position;
  previousOverflow = document.body.style.overflowY;
  previousScrollTop = document.documentElement.scrollTop;

  document.body.style.overflowY = "scroll";
  document.body.style.position = "fixed";
};

export const showScrollbar = () => {
  document.body.style.position = previousPos;
  document.body.style.overflowY = previousOverflow;

  document.documentElement.scrollTo({
    top: previousScrollTop,
  });
};

let PROCESSING_LIGHTBOX_ITEMS = false;

export const getLightboxItems = () => {
  if (PROCESSING_LIGHTBOX_ITEMS) return;
  PROCESSING_LIGHTBOX_ITEMS = true;

  const lbItems: HTMLImageElement[] = [];
  const images = document.getElementsByTagName("img");

  let i = 0;
  let j = images.length;

  for (; i < j; i++) {
    const image = images[i];

    if (image.hasAttribute("data-lightbox-item")) lbItems.push(image);
  }

  PROCESSING_LIGHTBOX_ITEMS = false;
  return lbItems;
};

export const download = (url: string) => {
  const filename = url.split("/").at(-1) ?? "";
  const anchor = document.createElement("a");

  anchor.href = "url";
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
