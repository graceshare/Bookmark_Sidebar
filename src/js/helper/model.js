($ => {
    "use strict";

    window.ModelHelper = function (ext) {

        let mainColor = "#7b5fa4";

        let defaultColors = {
            textColor: {
                light: "rgb(100,100,100)",
                dark: "rgb(200,200,200)"
            },
            sidebarMaskColor: {
                light: "rgba(255,255,255,0.8)",
                dark: "rgba(0,0,0,0.6)"
            },
            colorScheme: {
                light: "rgb(27,130,241)",
                dark: "rgb(31, 77, 128)"
            }
        };

        let defaults = {
            u: { // utility
                openStates: {},
                hiddenEntries: {},
                scrollPos: {},
                separators: {},
                entriesLocked: false,
                sort: {
                    name: "custom",
                    dir: "ASC"
                },
                mostViewedPerMonth: false,
                viewAsTree: true
            },
            b: { // behaviour
                animations: true,
                preventPageScroll: false,
                pxTolerance: {windowed: 20, maximized: 1},
                openAction: "mousedown",
                newTab: "foreground",
                newTabPosition: "afterCurrent",
                linkAction: "current",
                dirAccordion: false,
                rememberState: "all",
                rememberSearch: true,
                dirOpenDuration: 0.5,
                openDelay: 0,
                closeTimeout: 1,
                initialOpenOnNewTab: false
            },
            a: { // appearance
                sidebarPosition: "left",
                language: "default",
                showIndicator: true,
                showIndicatorIcon: true,
                darkMode: false,
                showBookmarkIcons: true,
                showDirectoryIcons: true,
                styles: {
                    colorScheme: defaultColors.colorScheme.light,
                    textColor: defaultColors.textColor.light,
                    indicatorWidth: "40px",
                    indicatorIconSize: "32px",
                    indicatorIconColor: "rgb(255,255,255)",
                    indicatorColor: "rgba(0,0,0,0.5)",
                    sidebarWidth: "350px",
                    sidebarMaskColor: defaultColors.sidebarMaskColor.light,
                    bookmarksFontSize: "14px",
                    directoriesIconSize: "16px",
                    bookmarksIconSize: "16px",
                    bookmarksLineHeight: "40px",
                    bookmarksDirIcon: "dir-1",
                    bookmarksDirColor: defaultColors.textColor.light,
                    bookmarksDirIndentation: "25px",
                    bookmarksHorizontalPadding: "16px",
                    overlayMaskColor: "rgba(0,0,0,0.5)",
                    fontFamily: "default"
                }
            }
        };

        let data = {};

        /**
         *
         * @param {function} callback
         */
        this.init = (callback) => {
            let keys = ["utility", "behaviour", "appearance"];

            chrome.storage.sync.get(keys, (obj) => {
                data = obj;

                keys.forEach((key) => {
                    if (typeof data[key] === "undefined") {
                        data[key] = {};
                    }
                });

                if (typeof callback === "function") {
                    callback();
                }
            });
        };

        /**
         * Returns all stored configuration
         *
         * @returns {object}
         */
        this.getAllData = () => {
            return data;
        };

        /**
         * Retrieves the stored values for the given keys,
         * if a value is undefined, it will be set to the default value
         *
         * @param {object|string} keys
         */
        this.getData = (keys) => {
            let configKeys = keys;
            if (typeof configKeys === "string") {
                configKeys = [configKeys];
            }

            let result = {};

            configKeys.forEach((keyInfo) => {
                let scope = keyInfo.split("/")[0];
                let key = keyInfo.split("/")[1];
                let value = null;
                let dataSearchScope = null;

                switch (scope) {
                    case "u": {
                        dataSearchScope = data.utility;
                        break;
                    }
                    case "b": {
                        dataSearchScope = data.behaviour;
                        break;
                    }
                    case "a": {
                        dataSearchScope = data.appearance;
                        break;
                    }
                }

                if (dataSearchScope !== null) {
                    if (typeof dataSearchScope[key] === "undefined") {
                        if (typeof defaults[scope] !== "undefined" && typeof defaults[scope][key] !== "undefined") { // default values if undefined
                            value = defaults[scope][key];
                        }
                    } else {
                        value = dataSearchScope[key];
                    }
                }

                if (keyInfo === "a/styles") {
                    if (typeof value.directoriesIconSize === "undefined" && typeof value.bookmarksIconSize !== "undefined") { // @deprecated
                        value.directoriesIconSize = value.bookmarksIconSize;
                    }

                    value = Object.assign({}, defaults.a.styles, value);

                    if (ext.helper.font && ext.helper.font.isLoaded()) { // FontHelper is available and loaded -> extend object with detailed font information
                        let fontInfo = ext.helper.font.getFontInfo();
                        value.fontFamily = fontInfo.name;
                        Object.assign(value, fontInfo.fontWeights);
                    }

                    if (value.colorScheme === "__color_ee") {
                        value.isEE = true;
                        value.colorScheme = mainColor;
                    }
                }

                result[key] = value;
            });

            if (typeof keys === "string") {
                let key = keys.split("/")[1];
                result = result[key];
            }

            return result;
        };

        /**
         * Saves the given values in the storage
         *
         * @param {object} values
         * @param {function} callback
         */
        this.setData = (values, callback) => {
            this.init(() => { // init retrieves the newest data
                Object.keys(values).forEach((keyInfo) => {
                    let scope = keyInfo.split("/")[0];
                    let key = keyInfo.split("/")[1];
                    let value = values[keyInfo];

                    switch (scope) {
                        case "u": {
                            data.utility[key] = value;
                            break;
                        }
                        case "b": {
                            data.behaviour[key] = value;
                            break;
                        }
                        case "a": {
                            data.appearance[key] = value;
                            break;
                        }
                    }
                });

                try { // can fail (e.g. MAX_WRITE_OPERATIONS_PER_MINUTE exceeded)
                    chrome.storage.sync.set(data, () => {
                        if (typeof callback === "function") {
                            callback();
                        }
                    });
                } catch (e) {
                    if (typeof callback === "function") {
                        callback();
                    }
                }
            });
        };

        /**
         * Sends a message to the model and calls the callback function when receiving a response
         *
         * @param {string} key
         * @param {object|function} opts
         * @param {function} callback
         */
        this.call = (key, opts, callback) => {
            if (typeof opts === "function") {
                callback = opts;
                opts = {};
            }

            opts.type = key;
            chrome.extension.sendMessage(opts, (response) => {
                if (typeof callback === "function") {
                    callback(response);
                }
            });
        };

        /**
         * Returns the default text color for the given appearance (light or dark)
         *
         * @param {string} appearance
         * @returns {string}
         */
        this.getDefaultColor = (name, appearance) => {
            if (defaultColors[name]) {
                if (appearance && defaultColors[name][appearance]) {
                    return defaultColors[name][appearance];
                } else {
                    return defaultColors[name].light;
                }
            }

            return null;
        };
    };

})(jsu);
