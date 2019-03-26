const AjaxModule = window.AjaxModule;

export default class UsersService {
	static FetchUsers () {
		return AjaxModule
			.doPromiseGet({
				path: '/users'
			})
			.then(function (res) {

                console.log(JSON.stringify(res));
				return res.json();
			});
	}
};