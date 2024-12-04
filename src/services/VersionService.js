class VersionService {
    async getLastVersion() {
        try {
            return await (await fetch("https://forbiddengdz.ru/api/extension_version/")).json()
        } catch (e) {
            throw {message: "Ошибка при получении актуальной версии версии"}
        }
    }

    async isVersionActual() {
        return (await this.getLastVersion()) === "2.1"
    }
}

export default new VersionService()