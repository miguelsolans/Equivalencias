require.config({
    "paths": {
        // External
        "jquery": "external/jquery",
        "bootstrap": "external/bootstrap",

        // Modules
        "Person": "modules/Person",
        "uiTest": "modules/ui-test"
    },
    "bootstrap": {
        "deps": [
            'jquery'
        ]
    }
});

require([
    'Person',
    'uiTest'
], () => console.log("RequireJS Modules Loaded"));