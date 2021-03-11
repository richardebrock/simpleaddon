function sendDownloadMsg() {
  // blobl contains HELLO
  const data = new Uint8Array([72, 101, 108, 108, 111]);
  // create the blob URL
  const blobUrl = URL.createObjectURL(new Blob([data], {'type': 'text/plain'}));
  const msg = {
      action: 'download-my-file',
      url: blobUrl,
  };
  console.log('>>> send download msg to addon content', msg);
// send the URL in a message to the add-on
  window.postMessage(msg, '*');

}