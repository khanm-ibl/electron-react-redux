/* eslint-disable */

let electron = window.require("electron")

// Open an url in default browser different from electron
export function openBrowser(url) {
    if (typeof url == "string" && url.length > 0) {
        electron.shell.openExternal(url)
    }
}
