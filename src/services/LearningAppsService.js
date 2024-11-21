class LearningAppsService {

    solve() {
        chrome.tabs.query({active: true, url: "https://learningapps.org/*"}, (tabs) => {
            let tab = tabs[0];
            if (tab) {
                console.log(tab.url)
                chrome.scripting.executeScript(
                    {
                        target: {tabId: tab.id, allFrames: true},
                        func: function () {
                            const panel = document.querySelector("#checksolutionBtnPanel")
                            if (panel === null) {
                                return
                            }
                            const button = document.createElement("div")
                            button.setAttribute("onclick", "AppClient.setSolved();AppClient.showFeedbackPanel('feedback');")
                            panel.append(button)
                            button.click()
                        }
                    }
                )
            } else {
                console.log("ERROR LEARNING APPS")
            }
        })
    }
}

export default new LearningAppsService()