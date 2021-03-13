import Constants from 'expo-constants';

const environments = {
    "dev": {
        apiHost: "https://mail.google.com/"
    },
    "staging": {
        apiHost: "https://www.facebook.com/"
    },
    "prod": {
        apiHost: "https://google.com/"
    }
};

const commonConfigs = {
    googleKey: "189foo-bar",
    facebookAppId: "189foo bar884439",
}

const env = Constants.manifest.releaseChannel || 'dev';

export default {
    ...commonConfigs,
    ...environments[env],
};