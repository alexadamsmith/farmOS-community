const DB_NAME = 'farmdb';
const DB_VERSION = 1;
let DB;

export default {

	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }
			console.log('OPENING DB', DB); // eslint-disable-line no-console
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);

			request.onerror = e => {
				console.log('Error opening db', e); // eslint-disable-line no-console
				reject('Error');
			};

			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};

			request.onupgradeneeded = e => {
				console.log('onupgradeneeded'); // eslint-disable-line no-console
				let db = e.target.result;
				db.createObjectStore("farms", { autoIncrement: false, keyPath:'id' });
			};
		});
	},
	async deleteFarm(farm) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['farms'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('farms');
			store.delete(farm.id);
		});
	},
	async getFarms() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['farms'],'readonly');
			trans.oncomplete = () => {
				resolve(farms);
			};

			let store = trans.objectStore('farms');
			let farms = [];

			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					farms.push(cursor.value)
					cursor.continue();
				}
			};

		});
	},

	async saveFarm(farm) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['farms'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('farms');
			store.put(farm)

		});

	}
/* Not finished
	async updateFarm(farm) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['farms'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('farms');
			store.put(farm);

		});

	}
*/
}
