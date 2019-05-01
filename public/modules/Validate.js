import Bus from "../scripts/EventBus.js";

export class Validate {

    ValidateEmpty(form) {
        for (let i = 0; i < form.length; i++) {
            if (form.elements[i].name === "inputAvatar") {
                continue;
            }
            if (form.elements[i].value === '') {
                return (false)
            }
        }
        return (true)
    }

    ValidateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            return (true)
        }
        return (false)
    }

    ValidatePassword(password) {
        //different types of difficulty
        let passwreg=  /^(?=.*[a-zA-Z0-9]).{4,20}$/;
        // let passwreg = /^(?=.*\d)(?=.*[a-zA-Z]).{4,20}$/;
        // let paswdreg =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

        if (password.match(passwreg)) 
        { 
            return true;
        }
        else
        { 
            return false;
        }
    }

    ValidateEqualPassword(password1, password2) {
        if (password1 != password2) {
            return false
        }
        if (password1 === "" || password2 === "") {
            return false
        }
        return true
    }

    ValidateLogin(login) {
        let logreg =  /^[A-Za-z]\w{3,14}$/;
        if (login.match(logreg)) 
        { 
            return true;
        }
        else
        { 
            return false;
        }
    }

    ValidateAvatar(avatar) {
        if (avatar === '') {
            alert("Please upload an image");

        } else {
            let Extension = avatar.substring(avatar.lastIndexOf('.') + 1).toLowerCase();

            //The file uploaded is an image
            if (Extension == "gif" || Extension == "png"   || Extension == "jpeg" || Extension == "jpg") {
                return true
            } else {
                return false
            }
        }
    }
}

export default new Validate;
