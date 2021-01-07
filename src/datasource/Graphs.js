function layoutScatter3D() {
    return {
        width: 1000,
        heigth: 750,
        legend: {
            y: 1,
            x: 0,
        },
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,

        }
    };
}

function layout() {
    return {
        width: 1000,
        height: 750
    };
}

function layoutViolin() {
    return ({
        width: 1000,
        height: 750,
        title: "",
        yaxis: {
            zeroline: false
        }
    }
    )
}

export default class Graphs {

    static addDataToViolin(y, color, algName, runNumber, columnName) {
        const obj = {};
        obj["y"] = y;
        obj["x"] = columnName;
        obj["name"] = algName + "/" + runNumber + " (" + columnName + ")";
        obj["points"] = 'none';
        obj["line"] = {
            color: color
        };
        obj["type"] = 'violin';
        obj["box"] = {
            visible: true
        };
        obj["boxpoints"] = false;
        obj["opacity"] = 0.6;
        obj["meanline"] = {
            visible: true
        };
        return obj;
    }

    static addDataToBox(y, color, algName, runNumber, columnName) {
        const obj = {};
        obj["y"] = y;
        obj["hovertemplate"] = columnName + ": %{y}<br><extra></extra>";
        obj["name"] = algName + "/" + runNumber + " (" + columnName + ")";
        obj["type"] = 'box';
        obj["line"] = {
            color: color
        };
        obj["fillcolor"] = color;
        obj["opacity"] = 0.6;
        return obj;
    }

    static addDataToScatter2D(x, y, color, algName, runNumber, columnNameX, columnNameY) {
        const obj = {};
        obj["x"] = x;
        obj["y"] = y;
        obj["hovertemplate"] = columnNameX + ": %{x}<br>" + columnNameY + "y: %{y}<br><extra></extra>";
        obj["mode"] = 'markers';
        obj["name"] = algName + "/" + runNumber + " (" + columnNameX + ", " + columnNameY + ")";
        obj["marker"] = {
            size: 12,
            color: color,
            line: {
                color: 'rgb(0,0,0)',
                width: 1
            }
        };
        obj["type"] = 'scatter';
        return obj;
    }

    static addDataToScatter3D(x, y, z, color, algName, runNumber, columnNameX, columnNameY, columnNameZ) {
        const obj = {};
        obj["x"] = x;
        obj["y"] = y;
        obj["z"] = z;
        obj["hovertemplate"] = algName + "/" + runNumber + "<br>" + columnNameX + ": %{x}<br>" + columnNameY + ": %{y}<br>" + columnNameZ + ": %{z}<extra></extra>";
        obj["mode"] = 'markers';
        obj["name"] = algName + "/" + runNumber + " (" + columnNameX + ", " + columnNameY + ", " + columnNameZ + ")";
        obj["marker"] = {
            size: 12,
            color: color,
            line: {
                color: 'rgb(0,0,0)',
                width: 1
            }
        };
        obj["type"] = 'scatter3d';
        return obj;
    }

    static addDataToScatter3DWithColor(x, y, z, w, color, algName, runNumber, columnNameX, columnNameY, columnNameZ, colorbarPos) {
        const obj = {};
        obj["x"] = x;
        obj["y"] = y;
        obj["z"] = z;
        obj["hovertemplate"] = algName + "/" + runNumber + "<br>" + columnNameX + ": %{x}<br>" + columnNameY + ": %{y}<br>" + columnNameZ + ": %{z}<extra></extra>";
        obj["mode"] = 'markers';
        obj["name"] = algName + "/" + runNumber;
        obj["marker"] = {
            size: 12,
            color: w,
            colorscale: [
                ['0.0', 'rgb(255,255,255)'],
                ['1.0', color]],
            colorbar: {
                x: colorbarPos
            },
            line: {
                color: 'rgb(0,0,0)',
                width: 1
            }
        };
        obj["type"] = 'scatter3d';
        return obj;
    }


    static dimensions = [1, 2, 3, 4];

    static data = [{
        "nbDimensions": 1,
        "id": "1D-violin",
        "typeName": "Violin Plot",
        "type": "violin",
        "objBuild": Graphs.addDataToViolin.name,
        "layout": layoutViolin
    }, {
        "id": "1D-box",
        "nbDimensions": 1,
        "typeName": "Box Plot",
        "type": "box",
        "objBuild": Graphs.addDataToBox.name,
        "layout": layout
    }, {
        "id": "2D-plot",
        "nbDimensions": 2,
        "typeName": "Scatter Plot",
        "objBuild": Graphs.addDataToScatter2D.name,
        "layout": layout
    }, {
        "id": "3D-scatter3d",
        "nbDimensions": 3,
        "typeName": "Scatter Plot",
        "objBuild": Graphs.addDataToScatter3D.name,
        "layout": layoutScatter3D
    }, {
        "id": "4D-scatter3d",
        "nbDimensions": 4,
        "typeName": "Scatter Plot",
        "objBuild": Graphs.addDataToScatter3DWithColor.name,
        "layout": layoutScatter3D
    }];

    static IT = 0;

    static getIterator = () => {
        Graphs.IT++;
        return Graphs.IT;
    };

}