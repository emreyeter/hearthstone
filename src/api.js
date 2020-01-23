var Api = {
    requestGet(bodyRequest) {
        var formBody = [];
        for (var property in bodyRequest) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(bodyRequest[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        var url = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards';
        return fetch(url, {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
                "x-rapidapi-key": "93d557905dmsh904d5709851decfp169e5cjsn141d36295293"
            },
            body: formBody,
        }).then(response => response.json());
    },

}

module.exports = Api;