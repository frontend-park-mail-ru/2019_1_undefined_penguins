const AjaxModule = window.AjaxModule;

export default class ProfileService {
	static FetchGetUser() {

		AjaxModule
			.doPromiseGet({
				path: '/logged'
			})
			.then(function (res) {
				return res.status;
			});
	}
};