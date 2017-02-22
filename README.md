# jupyterlab_geojson

A JupyterLab and Jupyter Notebook extension for rendering GeoJSON data

![output renderer](http://g.recordit.co/i2yLx3WNWy.gif)

## Prerequisites

* JupyterLab ^0.18.0 and/or Notebook >=4.3.0

## Usage

To render GeoJSON output in IPython:

```python
from jupyterlab_geojson import GeoJSON

GeoJSON({
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [-118.4563712, 34.0163116]
    },
    "properties": {
        "name": "Clover Park"
    }
})
```

To render a .geojson file as a tree, simply open it:

![file renderer](http://g.recordit.co/5QvIyPP1kW.gif)

## Install

```bash
pip install jupyterlab_geojson
# For JupyterLab
jupyter labextension install --symlink --py --sys-prefix jupyterlab_geojson
jupyter labextension enable --py --sys-prefix jupyterlab_geojson
# For Notebook
jupyter nbextension install --symlink --py --sys-prefix jupyterlab_geojson
jupyter nbextension enable --py --sys-prefix jupyterlab_geojson
```

## Development

```bash
pip install -e .
# For JupyterLab
jupyter labextension install --symlink --py --sys-prefix jupyterlab_geojson
jupyter labextension enable --py --sys-prefix jupyterlab_geojson
# For Notebook
jupyter nbextension install --symlink --py --sys-prefix jupyterlab_geojson
jupyter nbextension enable --py --sys-prefix jupyterlab_geojson
```
