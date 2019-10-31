class APIClient {

    constructor(props) {
        super(props)
    }

    entryHost() {
        var hostName = document.location.hostname;

        return (
            (hostName === "localhost" || hostName === "127.0.0.1") ?
                "http://localhost:8080"
                :
                "https://lin9.me"
        );
    }


    POST(entry, structure, headers) {
        const method = "POST"
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            headers
        };

        var body = JSON.stringify(structure);

        fetch(this.entryPoint(this.entryHost() + entry), { method, headers, body })
            .then(res => res.json())
            .then((data) => {
                return data;
            })
            .catch(console.log)
    }
}

export default APIClient;
