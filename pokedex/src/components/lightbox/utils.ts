let previousPos: string;
let previousOverflow: string;
let previousScrollTop: number;

export const hideScrollbar = () => {
  previousPos = document.body.style.position;
  previousOverflow = document.body.style.overflow;
  previousScrollTop = document.documentElement.scrollTop;

  document.body.style.position = "fixed";
  document.body.style.overflow = "hidden";
};

export const showScrollbar = () => {
  document.body.style.position = previousPos;
  document.body.style.overflow = previousOverflow;
  document.documentElement.scrollTo({
    top: previousScrollTop,
  });
};

export const getZoomableImage = () => {
  const images: HTMLImageElement[] = [];
  document.querySelectorAll("img").forEach((image) => {
    if (image.hasAttribute("data-zoomable")) images.push(image);
  });

  return images;
};
