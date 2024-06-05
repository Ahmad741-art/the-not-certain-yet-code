class APIHandler {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    process() {
        // Example processing: filter and sort data
        return this.data
            .filter(item => item.active) // Assuming the data has an 'active' property
            .sort((a, b) => a.name.localeCompare(b.name)); // Assuming the data has a 'name' property
    }

    display() {
        const processedData = this.process();
        processedData.forEach(item => {
            console.log(`Name: ${item.name}, Active: ${item.active}`);
        });
    }
}

(async () => {
    const apiHandler = new APIHandler('https://jsonplaceholder.typicode.com');
    
    try {
        const data = await apiHandler.fetchData('/users');
        const dataProcessor = new DataProcessor(data);
        dataProcessor.display();
    } catch (error) {
        console.error('Failed to process data:', error);
    }
})();
