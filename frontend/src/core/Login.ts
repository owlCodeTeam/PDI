export default class Login {
    execute(gateway:any) {
        const response = {
            status: null as any
        }
        if (gateway == 'Post Mock Success') {
            response.status = true
        }
        return response
    }
}