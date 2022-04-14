import {Role} from "@/interfaces/role"
import dayjs from "dayjs"
import ApiClient from "./api_client"
import HisDate  from "@/utils/Date"

export class InvalidCredentialsError extends Error {
    message: string
    constructor() {
        super()
        this.message = 'Invalid username/password'
    }
}

export enum AuthVariable {
    CORE_VERSION = 'core_version'
}

export class AuthService{
    username: string
    userID: number
    roles: Role[]
    token: string
    sessionDate: string
    systemVersion: string
    coreVersion: string
    constructor() {
        this.token = ''
        this.username = ''
        this.roles = []
        this.userID = -1
        this.sessionDate = ''
        this.systemVersion = ''
        this.coreVersion = ''
    }    

    setUsername(username: string) { this.username = username }

    async login(password: string) {
        const response = await this.requestLogin(password)
        if (response) {
            const {
                authorization: {
                    token, 
                    user
                }
            } = response
            this.token = token
            this.roles = user.roles
            this.userID = user.user_id
            this.sessionDate = await this.getSystemDate()
            this.systemVersion = await this.getApiVersion()
            this.coreVersion = await this.getHeadVersion()
        } else {
            throw 'Unable to login'
        }
    }

    startSession() {
        sessionStorage.setItem("apiKey", this.token);
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("userID", this.userID.toString());
        sessionStorage.setItem("userRoles", JSON.stringify(this.roles));
        sessionStorage.setItem("sessionDate", this.sessionDate)
        sessionStorage.setItem("APIVersion", this.systemVersion)
        localStorage.setItem(AuthVariable.CORE_VERSION, this.coreVersion)
    }

    clearSession() { 
        sessionStorage.clear() 
    }

    requestLogin(password: string) {
        return this.postLogin(`auth/login`, {
            username: this.username,
            password: password
        })
    }

    async checkTimeIntegrity() {
        const serverDate = await this.getSystemDate()
        const localDate = HisDate.currentDate()
        if (!serverDate) throw 'Unable to fetch server date'
        return localDate === serverDate
    }

    initDateSync(interval = 1000) {
        setInterval(async () => {
            const date = await this.getSystemDate()
            /**
             * This condition exists to prevent overriding BDE Date
             * by checking presence of apiDate. We update ApiDate
             * if found else we update SessionDate.
             */
            if (sessionStorage.getItem('apiDate')) {
                sessionStorage.setItem('apiDate', date)
            } else {
                sessionStorage.setItem('sessionDate', date)
            }
        }, interval)
    }
    
    setActiveVersion (version: string) {
        return localStorage.setItem(AuthVariable.CORE_VERSION, version)
    }

    getActiveCoreVersion() {
        return localStorage.getItem(AuthVariable.CORE_VERSION)
    }

    async getHeadVersion(): Promise<string> {
        const res = await fetch('HEAD', { method: 'GET' })
        const version = await res?.text()
        return version && version.length <= 25 ? version : '-'
    }

    getAppConf(confKey: 'promptFullScreenDialog' | 'showUpdateNotifications') {
        const conf: any =  sessionStorage.getItem('appConf')
        if (conf) {
            try {
                const confObj = JSON.parse(conf)
                return confObj[confKey]
            } catch (e) {
                console.error(e)
            }
        }
        return null
    }

    async getApiVersion(): Promise<string> {
        const api: any = await this.getJson('version')
        return api && api['System version'] ? api['System version'] : '-'
    }

    async getSystemDate(): Promise<string> {
        const {date} = await this.getJson('current_time')
        return date
    }

    private async getJson(url: string) {
        const req = await ApiClient.get(url)
        if (req && req.ok) 
            return req?.json()
    }

    private async postLogin(url: string, params: Record<string, number | string>) {
        const req = await ApiClient.post(url, params)
        if (!req) 
            return

        if (req.ok) {
            return req.json()
        }

        if (req.status === 401)
            throw new InvalidCredentialsError()
    }
}
