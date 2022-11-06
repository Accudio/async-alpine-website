export default function code() {
	return {
		copySuccess: false,
		codeEl: null,

		init() {
			this.codeEl = this.$root.querySelector('pre')
			this.tabindex()
			this.addCopy()

			const observer = new ResizeObserver(() => this.tabindex())
			observer.observe(this.codeEl)
		},

		tabindex() {
			if (this.codeEl.scrollWidth > this.codeEl.clientWidth) {
				this.codeEl.setAttribute('tabindex', '0')
			} else {
				this.codeEl.removeAttribute('tabindex')
			}
		},

		addCopy() {
			const copyButton = document.createElement('button')
			copyButton.innerHTML = `
				<svg x-show="!copySuccess" x-transition role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<title>Copy</title>
					<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
				</svg>
				<svg x-show="copySuccess" x-transition role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<title>Copied</title>
					<path d="m9 11 3 3L22 4"/>
					<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
				</svg>
			`
			copyButton.setAttribute('x-on:click', 'copy')
			copyButton.classList.add('b-code__copy')
			this.$root.appendChild(copyButton)
		},

		copy() {
			navigator.clipboard.writeText(this.codeEl.innerText);
			this.copySuccess = true;
			setTimeout(() => {
				this.copySuccess = false;
			}, 2000);
		}
	}
}
