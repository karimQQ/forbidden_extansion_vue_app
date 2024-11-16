async function createRequest(url) {
    try {
        const response = await fetch(url, {headers: {repeated: 'true'}})
        const res = await response.json()
        console.log("Correct ans!")
        for (const submission of res['submissions']) {
            if (submission['status'] === "correct") {
                const reply = submission['reply']
                const params = url.split('?')[1].split('&').reduce(function (p, e) {
                    const a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                }, {});
                fetch("https://forbiddengdz.ru/api/stepik/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'reply': reply,
                        'step': params['step'],
                        'user': params['user']
                    })
                })
            }
        }
    } catch (e) {
        console.log(e)
    }
}

function check(e) {
    for (const header of e.requestHeaders) {
        if (header.name.toLowerCase() === "repeated") {
            return;
        }
    }
    createRequest(e.url)
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    check,
    {urls: ["https://stepik.org/api/submissions?*"]},
    ["requestHeaders"],
);

function get_google_forms_solve() {
    const url = document.querySelector('a').href
    console.log(url)
    return url
}

function on_result_get_google_forms_solve(frames) {
    const url = frames[0].result
    if (url) {
        console.log(url)
        const res = fetch("https://forbiddengdz.ru/api/google_forms/solves", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "url": url
            })
        })
    }
}

chrome.webRequest.onCompleted.addListener(() => {
    setTimeout(() => {
        chrome.tabs.query({url: ["https://docs.google.com/forms/*/formResponse", "https://docs.google.com/forms/*/alreadyresponded"]}, async function (tabs) {
            for (const tab of tabs) {
                console.log(tab.url)
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id, allFrames: true},
                        func: get_google_forms_solve
                    }, on_result_get_google_forms_solve
                )
            }
        })
    }, 500)
}, {urls: ["https://docs.google.com/forms/*/formResponse", "https://docs.google.com/forms/*/alreadyresponded"]})