export default class TabsService {
    static getActiveTabUrl(callback) {
        chrome.tabs.query({active: true}, function (tabs) {
            let tab = tabs[0];
            if (tab) {
                console.log(tab.url)
                callback(tab.url)
            } else {
                throw "No active tab"
            }
        })
    }
}