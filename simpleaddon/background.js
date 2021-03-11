function downloadFileToLocalStorage({ url, filename }) {
  return new Promise((resolve) => {
    console.log('>>> download ', url, 'to', filename);
    // the error happens when we call browser.downloads.download
    browser.downloads.download(
      {
        url,
        filename,
      },
      (downloadItemId) => {
        const onDownloadChanged = ({ id, state }) => {
          if (id === downloadItemId && state && state.current === 'complete') {
            browser.downloads.onChanged.removeListener(onDownloadChanged);
            browser.downloads.search(
              {
                id: downloadItemId,
              },
              (downloadItem) => {
                const localFilename = downloadItem[0].filename;
                browser.downloads.erase(
                  {
                    id: downloadItemId,
                  },
                  () => {
                    resolve(localFilename);
                  }
                );
              }
            );
          }
        };
        browser.downloads.onChanged.addListener(onDownloadChanged);
      }
    );
  });
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action } = request;
  if (action === 'download-my-file') {
    if (!browser.downloads) {
      sendResponse({ success: false, reason: 'permissions' });
      return false;
    }
    const { url } = request;
    const filename = 'myfile.txt';
    downloadFileToLocalStorage({ url, filename })
      .then((filename) => {
        sendResponse({ success: true, filename });
      })
      .catch((e) => { 
        sendResponse({ success: false, reason: 'error', message: e.message });
      });
    return true;
  }
});