class TimeDelta {
	static #parseString(string) {
		string = string.trim().toLowerCase();
		
		const units = { 's': (i) => i*1000, 'm': (i) => units['s'](i)*60, 'h': (i) => units['m'](i)*60, 'd': (i) => units['h'](i)*24 };
		
		let millis = 0;
		const fmat = "([-+]?)(\\d+)\\s*([dhms]?)[\\s,]*";
		if (!(new RegExp(`^(?:${fmat})+$`)).test(string)) throw new Error("Invalid format. Refer to the documentation.");
		
		string.matchAll(new RegExp(fmat, 'g')).forEach(e => {
			const value = (e[1]=='-') ? -e[2] : e[2];
			if (!e[3]) millis += parseInt(value); // If no unit present, add as millis
			else millis += units[e[3]](value); // else parse by unit
		});
		return millis;
	}
	
	#delta = 0;
	constructor(delta=0) {
		if ((typeof delta) == 'string') {
			this.#delta = TimeDelta.#parseString(delta);
		} else if ((typeof delta) == 'number') {
			this.#delta = delta;
		} else {
			throw new Error("Invalid type. Refer to the documentation.");
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
			// If padded sequence and not literal %
			if (pad!='' && seq != '%') {
				val = Math.floor(val); // remove fraction
				const padSize = ['.', ':'].contains(seq) ? 3 : 2; // pad to 3 digits if millis, otherwise 2
				val = String(val).padStart(padSize, '0'); // apply padding
			}
			return String(val);
		});
	}
	
	[Symbol.toPrimitive](hint) {
		return this.#delta;
	}
}