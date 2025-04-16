class YandexEducationService {
    testUrl(url) {
        return /https:\/\/education.yandex.ru\/ege\/variants\/*/.test(url) || /https:\/\/education.yandex.ru\/ege\/collections\/*/.test(url)
    }

    getVariantByUrl(url) {
        if (!this.testUrl(url)) {
            throw {message: "Неподходящая страница1"}
        }
        const split = url.split(/[? /=]+/);
        if (split.indexOf('variants') !== -1) {
            return split[split.indexOf('variants') + 1]
        } else {
            return split[split.indexOf('collections') + 1]
        }
    }

    getTaskByUrl(url) {
        if (!this.testUrl(url)) {
            throw {message: "Неподходящая страница2"}
        }
        const split = url.split(/[? /=]+/);
        if (split.indexOf('task') === -1 || split.indexOf('task') === split.length - 1) {
            throw {message: "Неподходящая страница3"}
        }
        return split[split.indexOf('task') + 1] - 1
    }

    async getToken(url) {
        const response = await fetch("https://education.yandex.ru/api/v5/get-csrf-token", {
            "headers": {
                "accept": "*/*",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": `${url}`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        const data = await response.json();
        return data["sk"]
    }

    async getAnswers(url) {
        const variant = this.getVariantByUrl(url);
        const token = await this.getToken(url);
        const response = await fetch("https://education.yandex.ru/api/v5/gpttr", {
            "headers": {
                "accept": "*/*",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-csrf-token": `${token}`
            },
            "referrer": `${url}`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `[{"type":"public_get_variant_request_item","variant_id":"${variant}"}]`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });

        const data = await response.json();

        return data["tasks"].map((task) => {
            if (task["markup"]["answer_control_layout"].length !== 1) {
                throw {message: "Bruh"}
            }
            return {
                number: task["number"],
                answer: task["markup"]["answer_control_layout"][0]["content"]["correct_answers"]
            }
        })
    }

    inputAnswers(answer, replace_answers) {
        chrome.tabs.query({
            active: true,
            url: "https://education.yandex.ru/*",
            currentWindow: true
        }, function (tabs) {
            let tab = tabs[0];
            if (tab) {
                console.log(tab.url)
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id, allFrames: false},
                        func: write_yandex_education_answers,
                        args: [answer, replace_answers]
                    }, (frames) => {
                        console.log(frames[0].result)
                    }
                )
            } else {
                throw {message: "Неподходящая страница4"}
            }
        })
    }
}

function write_yandex_education_answers(answer, replace) {
    console.log(answer)
    const inputs = document.querySelectorAll('input')
    if (!Array.isArray(answer)) {
        if (replace || inputs[0].value === "") {
            inputs[0].value = answer
            inputs[0].dispatchEvent(new Event('input', {bubbles: true}))
        }
        return "SUCCESS"
    }
    const answers = []
    answer.forEach(e => {
        if (Array.isArray(e)) {
            e.forEach(ans => {
                answers.push(ans);
            })
        } else {
            answers.push(e)
        }
    })
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== "text") {
            continue
        }
        const ans = i < answers.length ? answers[i] : ""
        if (replace || inputs[i].value === "") {
            inputs[i].value = ans
            inputs[i].dispatchEvent(new Event('input', {bubbles: true}))
        }
    }
    return "SUCCESS"
}

export default new YandexEducationService()