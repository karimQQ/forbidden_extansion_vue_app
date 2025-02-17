class KompegeService {
    getVariantByUrl(url) {
        if (!/https:\/\/kompege.ru\/variant\?kim=*/.test(url)) {
            throw {message: "Неподходящая страница"}
        }
        const split = url.split(/[? /=]+/);
        return split[split.indexOf('kim') + 1]
    }

    async getAnswers(variant) {
        try {
            const response = await (await fetch(`https://kompege.ru/api/v1/variant/kim/${variant}`)).json()
            console.log(response)
            return response
        } catch (e) {
            throw {message: "Ошибка при получении ответов."}
        }
    }

    getTask(callback, onError) {
        chrome.tabs.query({active: true, url: "https://kompege.ru/variant?kim=*"}, (tabs) => {
            let tab = tabs[0];
            if (tab) {
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id, allFrames: false},
                        func: getCurrentTask
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

    inputAnswers(answer, replace_answers) {
        chrome.tabs.query({active: true, url: "https://kompege.ru/variant?kim=*"}, function (tabs) {
            let tab = tabs[0];
            if (tab) {
                console.log(tab.url)
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id, allFrames: false},
                        func: write_kompege_answers,
                        args: [answer, replace_answers]
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

function getCurrentTask() {
    try {
        const tasks = document.querySelector('#navTasks').querySelectorAll('.block')
        console.log(tasks)
        let result = -1
        tasks.forEach((e, ind) => {
            if (e.classList.contains('task-current')) {
                result = ind - 1
            }
        })
        console.log(result)
        return {status: "success", result: result}
    } catch (e) {
        return {status: "error", message: "Ошибка при получении текущей задачи"}
    }
}

function write_kompege_answers(answer, replace) {
    console.log(answer)
    const inputs = document.querySelectorAll('input')
    const answers = answer.split(/\\n| /)
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

export default new KompegeService()