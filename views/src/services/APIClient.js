import React from 'react';

class APIClient extends React.Component {

    static POST(entry, structure, func, additionalHeaders) {

        const method = "POST";
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            additionalHeaders
        };

        var body = JSON.stringify(structure);

        this.requestAPI(entry, method, headers, body, func);
    }

    static requestAPI(entry, method, headers, body, func) {
        fetch(this.entryHost() + entry, { method, headers, body })
            .then(res => res.json())
            .then((data) => {
                func(data)
            })
            .catch(console.log)
    }

    static entryHost() {
        var hostName = document.location.hostname;

        return (
            (hostName === "localhost" || hostName === "127.0.0.1") ?
                "http://localhost:8080"
                :
                "https://lin9.me"
        );
    }
}

export default APIClient;
