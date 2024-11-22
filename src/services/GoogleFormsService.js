class GoogleFormsService {
    async getAnswers(form_id) {
        return (await fetch(`https://forbiddengdz.ru/api/google_forms/answers/?form_id=${form_id}`)).json()
    }

    getFormIdByUrl(url) {
        const split = url.split(/[? /]+/);
        return split[split.indexOf('e') + 1]
    }

    getForm(callback) {
        chrome.tabs.query({active: true, url: "https://docs.google.com/forms/d/e/*"}, (tabs) => {
            let tab = tabs[0];
            if (tab) {
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id, allFrames: false},
                        func: getFormData
                    }, (frames) => {
                        callback(frames[0].result)
                    }
                )
            } else {
                console.log("ERROR GOOGLE FORMS")
            }
        })
    }
}

function getFormData() {
    const result = []
    for (const field of document.querySelectorAll('.Qr7Oae')) {
        const s = field.querySelector('div').getAttribute("data-params")
        const json = JSON.parse(s.substring(4, s.substring(0, s.length - 1).lastIndexOf(']') + 1))
        console.log(json)
        const field_id = json[0]
        const type = json[3]
        if (type === 0) {
            result.push({field_id: field_id, type: 0, data: []})
        } else if (1 <= type && type <= 4) {
            const data = json[4][0][1].map(e => e[0])
            result.push({field_id: field_id, type: type, data: data})
        }
    }
    return result
}

export default new GoogleFormsService()