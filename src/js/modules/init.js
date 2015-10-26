export default function (callback) {
	if ($.isReady) {
		callback.bind(this);
	} else {
		$(callback.bind(this));
	}
}
