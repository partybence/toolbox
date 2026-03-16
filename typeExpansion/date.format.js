function FormatDate(timestamp, format) {
	timestamp = new Date(timestamp);
	
	const H = timestamp.getHours();
	const padZero = (value) => String(value).padStart(2, "0");
	const padSpace = (value) => String(value).padStart(2, " ");
	const s = {
		'%': ()=>'%',
		'd': ()=>padZero(timestamp.getDate()),
		'D': ()=>s['m']()+'/'+s['d']()+'/'+s['y'](),
		'F': ()=>s['Y']()+'/'+s['m']()+'/'+s['d'](),
		'H': ()=>padZero(H),
		'I': ()=>padZero(H%12 || 12),
		'k': ()=>padSpace(H),
		'l': ()=>padSpace(H%12 || 12),
		'm': ()=>padZero(timestamp.getMonth()+1),
		'M': ()=>padZero(timestamp.getMinutes()),
		'p': ()=>H>11?'PM':'AM',
		'P': ()=>H>11?'pm':'am',
		'R': ()=>s['H']()+':'+s['M'](),
		's': ()=>timestamp.getTime(),
		'S': ()=>padZero(timestamp.getSeconds()),
		'T': ()=>s['H']()+':'+s['M']()+':'+s['S'](),
		'u': ()=>(timestamp.getDay()==0)?7:timestamp.getDay(),
		'w': ()=>timestamp.getDay(),
		'y': ()=>padZero(timestamp.getFullYear() % 100),
		'Y': ()=>timestamp.getFullYear(),
		'z': ()=>{
			const off = timestamp.getTimezoneOffset();
			const sign = off < 0 ? '+' : '-';
			const abs = Math.abs(off);
			return sign + padZero(Math.floor(abs/60)) + padZero(abs%60);
		}
	};
	let formatted = '';
	for (let i = 0; i < format.length; i++) {
		if (format[i] == '%' && i+1 < format.length) {
			i++;
			const fn = s[format[i]];
			formatted += fn ? fn() : "%" + format[i];
		} else {
			formatted += format[i];
		}
	}
	return formatted;
}

Date.prototype.format = function (format) { return FormatDate(this, format) };
