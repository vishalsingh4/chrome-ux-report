type CrUXApiUtilType = {
    API_KEY: string | undefined,
    API_ENDPOINT: string,
    query(requestBody: any): Promise<any>
};

export const CrUXApiUtil: CrUXApiUtilType = {
    API_KEY: '',
    API_ENDPOINT: '',
    query() {
        return Promise.reject();
    }
};

// CrUXApiUtil.API_KEY = 'AIzaSyCY6aqEKKaRO42r6M2yT4FsBb7oawK15aQ';
CrUXApiUtil.API_KEY = process.env.REACT_APP_API_KEY;
CrUXApiUtil.API_ENDPOINT = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${CrUXApiUtil.API_KEY}`;
CrUXApiUtil.query = async function (requestBody: any) {
    return fetch(CrUXApiUtil.API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                return Promise.reject(response);
            }
            return response;
        });
};

export default CrUXApiUtil;