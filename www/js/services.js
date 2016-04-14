var adminbase = "http://wohlig.co.in/biabackend/";
var adminurl = adminbase + "index.php/json/";
var adminimage = adminbase + "uploads/";
var adminhauth = adminbase + "index.php/hauth/";
var imgpath = adminimage + "image?name=";

var foods = [];

//FOR WORDPRESS INTEGRATION
var Wordpress_UserName = "en.blog.wordpress.com";

var WORDPRESS_API_URL = 'https://public-api.wordpress.com/rest/v1.1/';
var WORDPRESS_self_API_URL = 'wp-json/wp/v2/posts';

//for tumblr
var Tumblr_UserName = "";
var TUBMLR_API_URL = 'http://wohlig.co.in/tumblr/?url=http://api.tumblr.com/v2/blog/' + Tumblr_UserName + '/posts';

angular.module('starter.services', [])
	.factory('MyServices', function ($http, $filter) {
		return {
			all: function () {
				return chats;
			},
			remove: function (chat) {
				chats.splice(chats.indexOf(chat), 1);
			},
			get: function (chatId) {
				for (var i = 0; i < chats.length; i++) {
					if (chats[i].id === parseInt(chatId)) {
						return chats[i];
					}
				}
				return null;
			},
			signup: function (signup, callback, err) {
				return $http({
					url: adminurl + 'signUp',
					method: "POST",
					data: {
						'username': signup.username,
						'email': signup.email,
						'password': signup.password,
						'dob': signup.dob
					}
				}).success(callback).error(err);
			},
			signin: function (signin, callback, err) {
				return $http({
					url: adminurl + 'signIn',
					method: "POST",
					data: {
						'username': signin.username,
						'password': signin.password
					}
				}).success(callback).error(err);
			},
			profilesubmit: function (profile, callback, err) {
				return $http({
					url: adminurl + 'profileSubmit',
					method: "POST",
					data: {
						'id': $.jStorage.get("user").id,
						'name': profile.name,
						'email': profile.email,
						'password': profile.password,
						'dob': profile.dob,
						'contact': profile.contact,
					}
				}).success(callback).error(err);
			},
			createenquiry: function (enquiry, callback, err) {
				return $http({
					url: adminurl + 'createEnquiry',
					method: "POST",
					data: {
//						'id': $.jStorage.get("user").id,
						'name': enquiry.name,
						'email': enquiry.email,
						'title': enquiry.title,
						'content': enquiry.content
					}
				}).success(callback).error(err);
			},
			forgotpassword: function (email, callback, err) {
				return $http.get(adminurl + 'forgotPassword?email=' + email, {
					withCredentials: false
				}).success(callback).error(err);
			},
			getsingleevents: function (id, callback, err) {
				return $http({
					url: adminurl + 'getSingleEvents',
					method: "POST",
					data: {
						'id': id
					}
				}).success(callback).error(err);
			},

			searchelement: function (searchelement, callback, err) {
				return $http({
					url: adminurl + 'searchElement',
					method: "POST",
					data: {
						'searchelement': searchelement
					}
				}).success(callback).error(err);
			},
			getallvideogalleryvideo: function (id, pageno, callback, err) {
				return $http.get(adminurl + 'getAllVideoGalleryVideo?id=' + id + '&pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback).error(err);
			},
			getallgalleryimage: function (id, pageno, callback, err) {
				return $http.get(adminurl + 'getAllGalleryImage?id=' + id + '&pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback).error(err);
			},
			getsingleblog: function (id, callback, err) {
				return $http({
					url: adminurl + 'getSingleBlog',
					method: "POST",
					data: {
						'id': id
					}
				}).success(callback).error(err);
			},
			changepassword: function (password, callback, err) {
				return $http({
					url: adminurl + 'changePassword',
					method: "POST",
					data: password
				}).success(callback).error(err);
			},
			authenticate: function () {
				return $http({
					url: adminurl + 'authenticate',
					method: "POST"
				});
			},
			getallblog: function (pageno, callback, err) {
				return $http.get(adminurl + 'getAllBlog?pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback).error(err);
			},
			logout: function (callback, err) {
				$.jStorage.flush();
				return $http.get(adminurl + 'logout', {
					withCredentials: false
				}).success(callback).error(err);
			},
			getuser: function () {
				return $.jStorage.get("user");
			},
			getallsliders: function (callback, err) {
				return $http.get(adminurl + 'getAllSliders', {
					withCredentials: false
				}).success(callback).error(err);
			},
			getallevents: function (pageno, callback, err) {

				return $http.get(adminurl + 'getAllEvents?pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback).error(err);
			},
			getappconfig: function (callback, err) {
				return $http.get(adminurl + 'getAppConfig', {
					withCredentials: false
				}).success(callback).error(err);
			},
			getallgallery: function (pageno, callback, err) {
				return $http.get(adminurl + 'getAllGallery?pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback).error(err);
			},
			getallvideogallery: function (pageno, callback, err) {
				return $http.get(adminurl + 'getAllVideoGallery?pageno=' + pageno + '&maxrow=' + 15, {
					withCredentials: false
				}).success(callback).error(err);
			},
			changesetting: function (setting, callback, err) {
				return $http({
					url: adminurl + 'changeSetting',
					method: "POST",
					data: {
						id: setting.id,
						videonotification: JSON.stringify(setting.videonotification),
						eventnotification: JSON.stringify(setting.eventnotification),
						blognotification: JSON.stringify(setting.blognotification),
						photonotification: JSON.stringify(setting.photonotification)
					}
				}).success(callback).error(err);
			},
			editprofile: function (profile, callback, err) {
				var user = _.cloneDeep(profile);
				user.dob = $filter("date")(user.dob, "yyyy-MM-dd");

				return $http({
					url: adminurl + 'editProfile',
					method: "POST",
					data: user
				}).success(callback).error(err);
			},
			getWordpressPosts: function (wdp, callback) {
				var getdata = function (data, status) {
					return $http.get(data.meta.links.posts, {
						withCredentials: false
					}).success(callback);
				}
				$http.get(WORDPRESS_API_URL + "sites/" + wdp, {
					withCredentials: false
				}).success(getdata);
			},
			getWordpressSelfPosts: function (wdp, callback) {
				$http.get(wdp + WORDPRESS_self_API_URL, {
					withCredentials: false
				}).success(callback);
			},
			getTumblrPosts: function (tmb, callback) {
				$http.get('http://wohlig.co.in/tumblr/?url=http://api.tumblr.com/v2/blog/' + tmb + '/posts', {
					withCredentials: false
				}).success(callback);
			},
			getNotification: function (pageno, callback, err) {
				if ($.jStorage.get("user")) {
					var notificationres = function (data) {
						return $http.get(adminurl + 'getAllNotification?event=' + data.eventnotification + '&blog=' + data.blognotification + '&video=' + data.videonotification + '&photo=' + data.photonotification + '&pageno=' + pageno, {
							withCredentials: false
						}).success(callback).error(err);
					}

					$http.get(adminurl + 'getSingleUserDetail?id=' + $.jStorage.get("user").id, {
						withCredentials: false
					}).success(notificationres);

				} else {
					console.log("else user");
					return $http.get(adminurl + 'getAllNotification?event=true&blog=true&video=true&photo=true&pageno='+pageno, {
						withCredentials: false
					}).success(callback).error(err);
				}

			},
			getallfrontmenu: function (callback, err) {
				$http.get(adminurl + 'getAllFrontmenu', {
					withCredentials: false
				}).success(callback).error(err);
			},
			getarticle: function (id, callback, err) {
				$http.get(adminurl + 'getSingleArticles?id=' + id, {
					withCredentials: false
				}).success(callback).error(err);
			},
			getsingleuserdetail: function (callback, err) {
				$http.get(adminurl + 'getSingleUserDetail?id=' + $.jStorage.get("user").id, {
					withCredentials: false
				}).success(callback).error(err);
			},
			gethomecontent: function (callback, err) {
				$http.get(adminurl + 'getSingleArticles?id=1', {
					withCredentials: false
				}).success(callback).error(err);
			},
			setconfigdata: function (data) {
				$.jStorage.set("configdata", data);
			},
			getconfigdata: function (data) {
				return $.jStorage.get("configdata");
			},
			setNotificationToken: function (callback) {
				$http.get(adminurl + 'setNotificationToken?os=' + $.jStorage.get("os")+"&token="+$.jStorage.get("token"), {
					withCredentials: false
				}).success(callback);
			},
		};
	});
