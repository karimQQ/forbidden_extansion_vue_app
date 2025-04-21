export default class TabsService {
    static getActiveTabUrl(callback) {
        chrome.tabs.query({
            active: true,
            url: ["https://stepik.org/*", "https://learningapps.org/*", "https://docs.google.com/forms/*", "https://kompege.ru/*", "https://education.yandex.ru/*"],
            currentWindow: true
        }, (tabs) => {
            let tab = tabs[0];
            if (tab) {
                console.log(tab.url)
                callback(tab.url)
            } else {
                callback("")
            }
        })
    }
}