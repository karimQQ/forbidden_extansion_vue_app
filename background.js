async function createRequest(url) {
    try {
        const response = await fetch(url, {headers: {repeated: 'true'}})
        const res = await response.json()
        console.log("Correct ans!")
        for (const submission of res['submissions']) {
            if (submission['status'] === "correct") {
                console.log(submission)
                const reply = submission['reply']
                const time = new Date(submission['time']) / 1000
                const params = url.split('?')[1].split('&').reduce(function (p, e) {
                    const a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                }, {});
                fetch("https://forbiddengdz.ru/api/stepik/answers", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'reply': reply,
                        'step': params['step'],
                        'user': params['user'],
                        'time': time
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
    function getFormId(url) {
        const split = url.split(/[? /]+/);
        if (split.indexOf('e') !== -1) {
            return split[split.indexOf('e') + 1]
        }
        if (split.indexOf('d') !== -1) {
            return split[split.indexOf('d') + 1]
        }
        return split[split.indexOf('forms') + 1]
    }

    const url = document.querySelector('a.IrxBzb.TpQm9d').href
    console.log(url)
    const page = window.location.href
    return {"url": url, "form_id": getFormId(page)}
}

function on_result_get_google_forms_solve(frames) {
    console.log(frames[0].result)
    const url = frames[0].result.url
    if (url && /https:\/\/docs.google.com\/forms\/u\/0\/d\/e\/*/.test(url)) {
        const res = fetch("https://forbiddengdz.ru/api/google_forms/solves", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(frames[0].result)
        })
    }
}

chrome.webRequest.onCompleted.addListener(() => {
    setTimeout(() => {
        chrome.tabs.query({url: ["https://docs.google.com/forms/*/formResponse*", "https://docs.google.com/forms/*/alreadyresponded*"]}, async function (tabs) {
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
}, {urls: ["https://docs.google.com/forms/*/formResponse*", "https://docs.google.com/forms/*/alreadyresponded*"]})