class TimeDelta {
	static #parseStr(string) {
		string = string.trim().toLowerCase();
		
		const units = { 's': (i) => i*1000, 'm': (i) => units['s'](i)*60, 'h': (i) => units['m'](i)*60, 'd': (i) => units['h'](i)*24 };
		
		let val = 0;
		const fmat = "([-+]?)(\\d+)\\s*([dhms]?)[\\s,]*";
		if (!(new RegExp(`^(?:${fmat})+$`)).test(string)) throw new Error("Invalid format. Allowed: (<sign><value><unit>) with optional space or comma separator. Allowed units: (d)ays, (h)ours, (m)inutes, (s)econds or nothing for millis.");
		string.matchAll(new RegExp(fmat, 'g')).forEach(e => {
			const u = (e[1]=='-') ? -e[2] : e[2];
			if (!e[3]) val += parseInt(u);
			else val += units[e[3]](u);
		});
		return val;
	}
	
	#delta = 0;
	constructor(delta=0) {
		if ((typeof delta) == 'string') {
			this.#delta = TimeDelta.#parseStr(delta);
		} else {
			this.#delta = delta;
		}
	}
	
	Days() { return Math.floor(this.#delta / 1000 / 60 / 60 / 24); }
	TotalDays() { return this.#delta / 1000 / 60 / 60 / 24; }
	Hours() { return Math.floor(this.#delta / 1000 / 60 / 60 % 24); }
	TotalHours() { return this.#delta / 1000 / 60 / 60; }
	Minutes() { return Math.floor(this.#delta / 1000 / 60 % 60); }
	TotalMinutes() { return this.#delta / 1000 / 60; }
	Seconds() { return Math.floor(this.#delta / 1000 % 60); }
	TotalSeconds() { return this.#delta / 1000; }
	Millis() { return Math.floor(this.#delta % 1000); }
	TotalMillis() { return this.#delta; }
	
	Format(format) {
		const sequences = {
			'd': () => this.Days(),
			'h': () => this.Hours(),
			'm': () => this.Minutes(),
			's': () => this.Seconds(),
			'.': () => this.Millis(),
			'D': () => this.TotalDays(),
			'H': () => this.TotalHours(),
			'M': () => this.TotalMinutes(),
			'S': () => this.TotalSeconds(),
			':': () => this.TotalMillis(),
			'%': () => '%'
		};
		return format.replaceAll(/%(0?)([dhms.DHMS:%])/g, (_, pad, seq) => {
			let val = sequences[seq]();
			if (pad!='' && seq != '%') val = String(Math.floor(val)).padStart(['.', ':'].contains(seq) ? 3 : 2, '0');
			return String(val);
		});
	}
	
	[Symbol.toPrimitive](hint) {
		return this.delta;
	}
}