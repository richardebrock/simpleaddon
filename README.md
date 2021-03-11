# Simple add-on

## Overview

This project was created to demonstrate the issue we are seeing with Firefox not allowing blob urls to be downloaded. The project contains two components:

1. *Simple add-on* - A simple browser add-on with just enough functionality to demonstate the issue.
2. *Simple Server* - A local webserver created by a Python script that serves some HTML and Javascript, so that you can easily test the scenario via localhost.

Briefly, the website has a button that when clicked constructs a small blob URL from a byte array and then sends that URL in a message to the *Simple add-on*. The add-on content script receives the message and forwards it to the background script, where the add-on attempts to use the API `browser.download.downloads` to download the blob to a local text file (the blob contains the text `HELLO`).

## Getting started

Requirements
If you have an existing web server that you can host the *Simple Server* HTML and JS then use that, alternatively you will need Python to run the small web server included in the project.

1. In Firefox, open a new tab and navigate to `about:debugging`.
2. Click *This Firefox* in the left hand column.
3. Click *Load Temporary Add-on*
4. Browse to the location on your local disk where *Simple Add-on* has been downloaded and the double click on *manifest.json*.
5. Click the *Inspect* tab and then click the *Console* tab if it is not already selected.
6. In a console window or command prompt window, navigate to the local folder containing the *Simple Server*.
7. Start the server using `python3 www.py`.
8. In a new tab in Firefox, navigate to `http://localhost:8181/index.html`
9. Click *Download the blob*.
10. Go back to the extension debugging tab in Firefox (now labelled *Toolbox-Extension*) and you should see the error message `Security Error: Content at moz-extension://e707edbd-4196-e54a-8d03-75a4ce0b7935/_generated_background_page.html may not load data from blob:http://localhost:8181/49c96c99-d399-524a-8802-3b0af3bf6e43` (the UUID in the URL will differ each time).
