let loadingCount = 0;

/**页面loading */
export function showLoading(isLoading: boolean) {
  if (isLoading) {
    uni.showLoading({
      title: "加载中",
    });
    loadingCount = loadingCount + 1;
  }
}

/**隐藏页面loading */
export function hideLoading() {
  loadingCount = loadingCount - 1;
  if (loadingCount === 0) {
    uni.hideLoading();
  }
}
