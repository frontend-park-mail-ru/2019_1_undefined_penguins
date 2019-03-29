const AjaxModule = window.AjaxModule;

export default class SignInService {
	static FetchLogin (form) {

        const email = form.elements.email.value;
        const password = form.elements.password.value;

		AjaxModule.doPromisePost({
            path: '/login',
            body: {
                email,
                password,
            },
            })
            .then(
                (data) => {
                    // console.log(JSON.stringify(data));
                    if (data.status > 300) {
                        throw new Error('Network response was not ok.');
                    }
                    return data;
                },
            )
            .catch(() => {
                // const err = document.getElementsByTagName('span')[0];
                // err.classList.add('errorLabel');
                // err.innerText = "Такого пользователя не существует!";
                console.log('SignInService fall down :(');
            });
	}
};