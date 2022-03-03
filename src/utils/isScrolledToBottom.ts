const isScrolledToBottom = () => {
  return window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
};

export default isScrolledToBottom;
