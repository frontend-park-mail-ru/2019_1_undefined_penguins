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
        //different types of difficulty
        // var passwreg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        // var paswdreg =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

        var passwreg=  /^[A-Za-z]\w{4,14}$/;
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
        var logreg =  /^[A-Za-z]\w{4,14}$/;
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
