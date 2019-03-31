export class UserModel {
    constructor() {
        this.isAutorised = null;
    }

    // TODO: get user in SetUser
    SetUser(){
        this.isAutorised = true;
    }

    IsAutorised() {
        return this.isAutorised;
    }
}

export default new UserModel;