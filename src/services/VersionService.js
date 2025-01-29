class VersionService {
    async getLastVersion() {
        try {
            return await (await fetch("https://forbiddengdz.ru/api/extension/version/")).json()
        } catch (e) {
            throw {message: "Ошибка при получении актуальной версии версии"}
        }
    }

    async isVersionActual() {
        return (await this.getLastVersion()) === "2.6"
    }

    async getUrl() {
        try {
            return await (await fetch("https://forbiddengdz.ru/api/extension/url/")).json()
        } catch (e) {
            throw {message: "Ошибка при получении ссылки на расширение"}
        }
    }
}

export default new VersionService()