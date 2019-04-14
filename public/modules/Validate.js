import Bus from "../scripts/EventBus.js";

export class Validate {
    ValidateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            return (true)
        }
        return (false)
    }

    ValidatePassword(password) {

    }

    ValidateEqualPassword(password1, password2) {

    }

    ValidateLogin(login) {

    }

    ValidateAvatar(avatar) {

    }
}

export default new Validate;
