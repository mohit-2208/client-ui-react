const local = {
    instantLoanApplication: "http://localhost:9010/application/:id",
    apiEndpoint: "http://localhost:3002",
    socketEndpoint: "http://localhost:3000",
    mobileHostEndPoint: "http://localhost:3046",
    payThroughEndpoint: "http://localhost:7100/lms",
    clickstreamUrl: "http://34.93.209.19:8080",
    onemoney: {
        aa_url: "https://api-sandbox.onemoney.in/",
        aa_fiu_id: "IND0874",
    },
    moengage: {
        app_id: "RKO434P7V47EE6MRZ9JTYTN3",
        debug_logs: "1",
        cluster: "DC_4",
    }
};

const production = {
    instantLoanApplication: "/instant-loan/application/:id",
    apiEndpoint: "https://api.indifi.com",
    clientEndpoint: "https://client.indifi.com",
    socketEndpoint: "https://sockets.indifi.com",
    mobileHostEndPoint: "https://android.indifi.com",
    payThroughEndpoint: "https://api.indifi.com",
    clickstreamUrl: "https://tracking-api.indifi.com",
    onemoney: {
        aa_url: "https://aa-app.onemoney.in/",
        aa_fiu_id: "indifi-fiu",
    },
    moengage: {
        app_id: "I9NRN56Y4UJNYDHWBEYFXMR9",
        debug_logs: "0",
        cluster: "DC_4",
    }
};

const stg_cep = {
    instantLoanApplication: "http://stg-cep-client.indifi.com/instant-loan/application/:id",
    apiEndpoint: "https://cep-api.indifi.com",
    clientEndpoint: "https://stg-cep-client.indifi.com",
    socketEndpoint: "https://stg-cep.indifi.com/api",
    mobileHostEndPoint: "https://stg-cep-android.indifi.com",
    payThroughEndpoint: "http://stg-cep.indifi.com/api/lms",
    clickstreamUrl: "http://34.93.209.19:8080",
    moengage: {
        app_id: "RKO434P7V47EE6MRZ9JTYTN3",
        debug_logs: "1",
        cluster: "DC_4",
    }
};

const dev = {
    instantLoanApplication: "http://dev-client.indifi.com/instant-loan/application/:id",
    apiEndpoint: "http://dev.indifi.com/api",
    clientEndpoint: "https://dev-client.indifi.com",
    payThroughEndpoint: "http://dev.indifi.com/api/lms",
    clickstreamUrl: "http://34.93.209.19:8080",
    moengage: {
        app_id: "RKO434P7V47EE6MRZ9JTYTN3",
        debug_logs: "1",
        cluster: "DC_4",
    }
};

const preprod = {
    instantLoanApplication: "/instant-loan/application/:id",
    apiEndpoint: "https://preprod-api.indifi.com",
    clientEndpoint: "https://preprod-client.indifi.com",
    socketEndpoint: "https://preprod-socket.indifi.com",
    mobileHostEndPoint: "https://preprod-android.indifi.com",
    payThroughEndpoint: "https://preprod-api.indifi.com",
    clickstreamUrl: "http://34.93.209.19:8080",
    perfiosHost: "https://demo.perfios.com",
    moengage: {
        app_id: "RKO434P7V47EE6MRZ9JTYTN3",
        debug_logs: "1",
        cluster: "DC_4",
    }
};

const stg = {
    instantLoanApplication: "http://stg-client.indifi.com/instant-loan/application/:id",
    apiEndpoint: "http://stg.indifi.com/api",
    socketEndpoint: "http://stg.indifi.com",
    payThroughEndpoint: "http://stg.indifi.com/api/lms",
    clickstreamUrl: "http://34.93.209.19:8080",
    moengage: {
        app_id: "RKO434P7V47EE6MRZ9JTYTN3",
        debug_logs: "1",
        cluster: "DC_4",
    }
};

const stg_dad = {
    instantLoanApplication: "/instant-loan/application/:id",
    apiEndpoint: "https://dad-api.indifi.com",
    clientEndpoint: "https://stg-dad-client.indifi.com",
    socketEndpoint: "https://dad-socket.indifi.com",
    mobileHostEndPoint: "https://stg-dad-android.indifi.com",
    payThroughEndpoint: "http://stg-dad.indifi.com/api",
    clickstreamUrl: "http://34.93.209.19:8080",
    onemoney: {
        aa_url: "https://api-sandbox.onemoney.in/",
        aa_fiu_id: "IND0806",
    },
    moengage: {
        app_id: "RKO434P7V47EE6MRZ9JTYTN3",
        debug_logs: "1",
        cluster: "DC_4",
    }
};

const stg_demo = {
    instantLoanApplication: "/instant-loan/application/:id",
    apiEndpoint: "https://demo-api.indifi.com",
    clientEndpoint: "https://demo-client.indifi.com",
    payThroughEndpoint: "https://demo-api.indifi.com",
    clickstreamUrl: "http://34.93.209.19:8080",
    moengage: {
        app_id: "RKO434P7V47EE6MRZ9JTYTN3",
        debug_logs: "1",
        cluster: "DC_4",
    }
};

const stg_dev = {
    instantLoanApplication: "http://dev-client.indifi.com/instant-loan/application/:id",
    apiEndpoint: "https://dev-api.indifi.com",
    socketEndpoint: "https://dev-api.indifi.com",
    mobileHostEndPoint: "https://dev-android.indifi.com",
    payThroughEndpoint: "https://dev-api.indifi.com/lms",
    clickstreamUrl: "http://34.93.209.19:8080",
};

const config = {
    local,
    production,
    stg_dev,
    stg_demo,
    stg_dad,
    stg,
    preprod,
    dev,
    stg_cep
};

export default config[process.env.REACT_APP_ENV];
