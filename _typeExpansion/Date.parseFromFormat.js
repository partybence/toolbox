function parseDateFromFormat(dateString, format) {
	const dt = new Date(0);
	const s = {
		'%': ['%'],
		'd': ['(0[1-9]|[1-2][0-9]|3[0-1])', (v) => dt.setDate(v)],
		'H': ['([0-1][0-9]|2[0-3])', (v) => dt.setUTCHours(v)],
		'I': ['(0[1-9]|1[0-2])', (v) => dt.setUTCHours(v)],
		'm': ['(0[1-9]|1[0-2])', (v) => dt.setMonth(v-1)],
		'M': ['([0-5][0-9])', (v) => dt.setUTCMinutes(v)],
		'p': ['(AM|PM)', (v) => {
			const hours = dt.getHours();
			if (!(hours && hours < 13)) return;
			if (hours == 12 && v == 'AM') dt.setHours(dt.getHours()-12);
			else if (v == 'PM') dt.setHours(dt.getHours()+12);
		}],
		'P': ['(am|pm)', (v) => s.p(v.toUpperCase())],
		'S': ['([0-5][0-9])', (v) => dt.setUTCSeconds(v)],
		'y': ['(\\d{2})', (v) => dt.setYear("20"+v)],
		'Y': ['(\\d{4})', (v) => dt.setYear(v)],
		'z': ['(Z|[+-]\\d{4})', (v) => {
			if (v == 'Z') return;
			const [h, m] = [Math.floor(v/100), v%100];
			dt.setHours(dt.getHours()-h);
			dt.setMinutes(dt.getMinutes()-m);
		}],
	};
	
	const sequence = []
	format = format.replaceAll(/%(.)/g, (_, query) => {
		if (!s[query]) return query;
		[expr, callback] = s[query];
		if (callback) sequence.push(callback);
		return expr;
	});
	
	const regex = new RegExp('^'+format+'$');
	if (m = regex.exec(dateString)) {
		m.shift();
		sequence.forEach((f) => {
			f(m.shift());
		});
	} else {
		throw new Error("Provided string doesn't match provided format.");
	}
	
	return dt;
}

Date.parseFromFormat = parseDateFromFormat;