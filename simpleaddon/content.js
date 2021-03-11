window.addEventListener('message', (event) => {
  const { data } = event;
  const { action } = data;
  if (action === 'download-my-file') {
    // forward the message to the background
    browser.runtime.sendMessage(event.data, function(response) {
      console.log('>>> response', response);
    });
  }
}, false);

browser.runtime.sendMessage({action: 'content-script-ready'});
