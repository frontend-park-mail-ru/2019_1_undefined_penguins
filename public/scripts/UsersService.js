const AjaxModule = window.AjaxModule;

export default class UsersService {
	static FetchUsers (path) {
		return AjaxModule
			.doPromiseGet({
				path: path
			})
			.then(function (res) {
				return res.status;
			});
	}
};