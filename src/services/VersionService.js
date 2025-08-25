import {API_URL} from "@/config";

class VersionService {
    async getLastVersion() {
        try {
            return await (await fetch(`${API_URL}/api/extension/version/`)).json()
        } catch (e) {
            throw {message: "Ошибка при получении актуальной версии версии"}
        }
    }

    async isVersionActual() {
        const version = await this.getLastVersion()
        console.log(version)
        return version === "3.1"
    }

    async getUrl() {
        try {
            return await (await fetch(`${API_URL}/api/extension/url/`)).json()
        } catch (e) {
            throw {message: "Ошибка при получении ссылки на расширение"}
        }
    }
}

export default new VersionService()