const puppeteer = require('puppeteer');

async function run() {
	const browser = await puppeteer.launch({
		headless: true
	});
	const page = await browser.newPage();
	await page.goto('https://api-ninjas.com/api/convertcurrency#')

	//page selctors
	const CURRENCY_SELECTOR = '#expandCurrencies';
	await page.click(CURRENCY_SELECTOR);

	//extract data from table
	try {
		const currencyData = await page.evaluate(() => {

			//initialising object to store extracted data
			const currencies = {
				codes: [],
				name: []
			}

			//extracting currency codes
			const currencyCodes = Array.from(
				document.querySelectorAll('#currenciesTable table tbody tr th')
			).map(e => e.innerText)
			currencies.codes.push(currencyCodes);

			//extracting currency names
			const currencyName = Array.from(
				document.querySelectorAll('#currenciesTable table tbody tr td')
			).map(e => e.innerText)
			currencies.name.push(currencyName);


			return currencies;
		})

		//console.log(currencyData);
		await browser.close();
	} catch (err) {
		console.error("Timeout or other error: ", err)
    	return resolve("TRY AGAIN");
	}

}

run();