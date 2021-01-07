export default class DialogContent {

    static data = {
        dataPath: {
            formId: "dataPath-form",
            title: "Data Path",
            message: "Set the path where is the data that you want to visualize."
        },
        delimiter: {
            formId: "delimiter-form",
            title: "Delimiter",
            message: "Set the new delimiter which is used in your files."
        },
        filePattern: {
            formId: "filePattern-form",
            title: "File Pattern (Regex)",
            message: "Set the file pattern in regex of the files that must be read."
        },
        ignoreFirstLine: {
            formId: "ignoreFirstLine-form",
            title: "Ignore First Line",
            message: "Set if the first line of each file must be read or not."
        }
    };

}