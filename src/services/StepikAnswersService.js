class StepikAnswersService {
    API_URL = "https:forbiddengdz.ru/api"

    async getLastAnswers(step_id) {
        try {
            return await (await fetch(`${this.API_URL}/stepik/answers/?step=${step_id}&last=true`)).json()
        } catch (e) {
            throw {message: "Ошибка при получении ответа. Возможно у Байдена сломался сервак."}
        }
    }

    async getAllAnswers(step_id) {
        return await (await fetch(`${this.API_URL}/stepik/answers/?step=${step_id}`)).json()
    }

    async getStepIdByUrl(url) {
        const split = url.split(/[? /]+/);
        if (split.indexOf("lesson") === -1 || split.indexOf("step") === -1) {
            throw {message: "Неподходящая страница"}
        }
        const lesson = split[split.indexOf("lesson") + 1]
        const step = split[split.indexOf("step") + 1]
        try {
            const res = await (await fetch("https://stepik.org/api/lessons/" + lesson)).json()
            return res["lessons"][0]["steps"][step - 1]
        } catch (e) {
            throw {message: "Ошибка при получении ответа. Проверьте подключение к интернету."}
        }
    }

    on_result_write_stepik_answer(frames) {
        const res = frames[0].result
        console.log("RESULT", res)
    }

    inputAnswer(answer) {
        chrome.tabs.query({active: true, url: "https://stepik.org/*"}, (tabs) => {
            let tab = tabs[0];
            if (tab) {
                console.log("ANSWER", answer)
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id, allFrames: true},
                        func: writeStepikAnswers,
                        args: [answer]
                    }, this.on_result_write_stepik_answer
                )
            } else {
                console.log("ERROR")
            }
        })
    }
}

function writeStepikAnswers(answer) {
    console.log(answer)
    try {
        if (answer['number'] !== undefined) {
            const input = document.querySelector("input.number-quiz__input.number-input")
            input.value = answer['number']
            input.dispatchEvent(new Event('input'))
        } else if (answer['blank'] !== undefined) {
            const inputs = document.querySelectorAll('input.st-input.fill-blanks-quiz__input')
            answer['blanks'].map((e, ind) => {
                inputs[ind].value = e
                inputs[ind].dispatchEvent(new Event('input'))
            })
        } else if (answer['text'] !== undefined) {
            const text_editor = document.querySelector('body.rich-text-editor__content')
            console.log(text_editor)
            text_editor.innerHTML = answer['text']
            // const keydown = new KeyboardEvent('keydown', {
            //     bubbles: true,
            //     cancelable: true,
            //     composed: true,
            //     key: "q",
            //     keyCode: 81,
            //     location: "General keys",
            //     code: "KeyQ",
            //     which: 81
            // })
            // const keydownRepeat = new KeyboardEvent('keydown', {
            //     bubbles: true,
            //     cancelable: true,
            //     composed: true,
            //     key: "q",
            //     keyCode: 81,
            //     location: "General keys",
            //     code: "KeyQ",
            //     which: 81,
            //     repeat: true
            // })
            // const keyup = new KeyboardEvent('keyup', {
            //     bubbles: true,
            //     cancelable: true,
            //     composed: true,
            //     key: "q",
            //     keyCode: 81,
            //     location: "General keys",
            //     code: "KeyQ",
            //     which: 81,
            // })
            // text_editor.dispatchEvent(keydown)
            // text_editor.dispatchEvent(keyup)
        }
        return {status: "Success"}
    } catch (e) {
        return {status: "Error", message: ["Ошибка при записи ответа", e]}
    }
}

export default new StepikAnswersService()