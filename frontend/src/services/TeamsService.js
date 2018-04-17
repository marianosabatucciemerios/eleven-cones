import Api from '@/services/Api'

export default {
    findAllTeams() {
        return Api().get('/v1/teams')
    }
}