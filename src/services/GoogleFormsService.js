import {API_URL} from "@/config";

class GoogleFormsService {
    async getAnswers(form_id) {
        try {
            return (await fetch(`${API_URL}/api/google_forms/answers/?form_id=${form_id}`)).json()
        } catch (e) {
            throw {message: "Ошибка при получении ответов. Возможно у Байдена сломался сервак."}
        }
    }

    getFormIdByUrl(url) {
        if (!/https:\/\/docs.google.com\/forms\/*/.test(url)) {
            throw {message: "Неподходящая страница"}
        }
        const split = url.split(/[? /]+/);
        if (split.indexOf('e') !== -1) {
            return split[split.indexOf('e') + 1]
        }
        if (split.indexOf('d') !== -1) {
            return split[split.indexOf('d') + 1]
        }
        return split[split.indexOf('forms') + 1]
    }

    getForm(callback, onError) {
        chrome.tabs.query({active: true, url: "https://docs.google.com/forms/*", currentWindow: true}, (tabs) => {
            let tab = tabs[0];
            if (tab) {
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id, allFrames: false},
                        func: getFormData
                    }, (frames) => {
                        const res = frames[0].result
                        console.log(res)
                        if (res.status === "error") {
                            onError(res.message)
                        } else {
                            callback(res.result)
                        }
                    }
                )
            } else {
                onError("Неподходящая страница")
            }
        })
    }

    inputAnswers(answers, replace_answers) {
        chrome.tabs.query({
            active: true,
            url: "https://docs.google.com/forms/*",
            currentWindow: true
        }, function (tabs) {
            let tab = tabs[0];
            if (tab) {
                console.log(tab.url)
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id, allFrames: false},
                        func: replace_answers ? write_google_forms_answers_replace_answers : write_google_forms_answers,
                        args: [answers]
                    }, (frames) => {
                        console.log(frames[0].result)
                    }
                )
            } else {
                throw {message: "Неподходящая страница"}
            }
        })
    }
}

function getFormData() {
    try {
        const result = []
        for (const field of document.querySelectorAll('.Qr7Oae')) {
            try {
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
            } catch (e) {

            }
        }
        return {status: "success", result: result}
    } catch (e) {
        return {status: "error", message: "Ошибка при получении формы"}
    }
}

function write_google_forms_answers(answers) {
    console.log(answers)
    let answer_by_id = {}
    for (const answer of answers) {
        answer_by_id[answer["field_id"]] = answer["answer"]
    }
    console.log(answer_by_id)
    const fields = document.querySelectorAll('.Qr7Oae')
    for (const field of fields) {
        try {
            const data = field.querySelector('div').getAttribute("data-params")
            const id = data.substring(5, data.length - 1).split(',')[0]
            if (answer_by_id[id] === undefined) {
                continue
            }
            console.log(id, answer_by_id[id])
            const answer = answer_by_id[id]
            if (answer["text"]) {
                const input = field.querySelector('input')
                if (input.value === "") {
                    input.value = answer["text"]
                    input.dispatchEvent(new Event('input', {bubbles: true}))
                }
            } else if (answer["dropdown_list"]) {
                if (document.querySelector('.KKjvXb').classList.contains('OIC90c')) {
                    continue
                }
                field.querySelector('.DEh1R').click()
                setTimeout(() => {
                    console.log(field.querySelector('.OA0qNb').querySelectorAll('.OIC90c'))
                    for (const v of field.querySelector('.OA0qNb').querySelectorAll('.OIC90c')) {
                        if (v.querySelector('.vRMGwf').innerHTML === answer["dropdown_list"]) {
                            v.click()
                        }
                    }
                }, 500)
            } else if (answer["one_list"]) {
                let skip = false
                for (const v of field.querySelectorAll('.ajBQVb')) {
                    if (v.classList.contains('N2RpBe')) {
                        skip = true
                    }
                }
                if (skip) {
                    continue
                }
                for (const v of field.querySelectorAll('.ajBQVb')) {
                    if (v.querySelector('.aDTYNe').innerHTML === answer["one_list"]) {
                        v.click()
                    }
                }
            } else if (answer["many_list"]) {
                let skip = false
                for (const v of field.querySelectorAll('.Yri8Nb')) {
                    if (v.classList.contains('N2RpBe')) {
                        skip = true
                    }
                }
                if (skip) {
                    continue
                }
                for (const v of field.querySelectorAll('.Yri8Nb')) {
                    const ans = answer["many_list"].indexOf(v.querySelector('.aDTYNe').innerHTML) !== -1
                    const cur = v.classList.contains('N2RpBe')
                    if (ans !== cur) {
                        v.click()
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    return "SUCCESS"
}

function write_google_forms_answers_replace_answers(answers) {
    console.log(answers)
    let answer_by_id = {}
    for (const answer of answers) {
        answer_by_id[answer["field_id"]] = answer["answer"]
    }
    console.log(answer_by_id)
    const fields = document.querySelectorAll('.Qr7Oae')
    for (const field of fields) {
        try {
            const data = field.querySelector('div').getAttribute("data-params")
            const id = data.substring(5, data.length - 1).split(',')[0]
            if (answer_by_id[id] === undefined) {
                continue
            }
            console.log(id, answer_by_id[id])
            const answer = answer_by_id[id]
            if (answer["text"]) {
                const input = field.querySelector('input')
                input.value = answer["text"]
                input.dispatchEvent(new Event('input', {bubbles: true}))
            } else if (answer["dropdown_list"]) {
                field.querySelector('.DEh1R').click()
                setTimeout(() => {
                    console.log(field.querySelector('.OA0qNb').querySelectorAll('.OIC90c'))
                    for (const v of field.querySelector('.OA0qNb').querySelectorAll('.OIC90c')) {
                        if (v.querySelector('.vRMGwf').innerHTML === answer["dropdown_list"]) {
                            v.click()
                        }
                    }
                }, 500)
            } else if (answer["one_list"]) {
                for (const v of field.querySelectorAll('.ajBQVb')) {
                    if (v.querySelector('.aDTYNe').innerHTML === answer["one_list"]) {
                        v.click()
                    }
                }
            } else if (answer["many_list"]) {
                for (const v of field.querySelectorAll('.Yri8Nb')) {
                    const ans = answer["many_list"].indexOf(v.querySelector('.aDTYNe').innerHTML) !== -1
                    const cur = v.classList.contains('N2RpBe')
                    if (ans !== cur) {
                        v.click()
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    return "SUCCESS"
}

export default new GoogleFormsService()