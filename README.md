# jupyterlab_geojson

A JupyterLab and Jupyter Notebook extension for rendering GeoJSON

![output renderer](http://g.recordit.co/QAsC7YULcY.gif)

## Prerequisites

* JupyterLab ^0.20.0 and/or Notebook >=4.3.0

## Usage

To render GeoJSON output in IPython:

```python
from jupyterlab_geojson import GeoJSON

GeoJSON({
    "string": "string",
    "array": [1, 2, 3],
    "bool": True,
    "object": {
        "foo": "bar"
    }
})
```

To render a `.geojson` file as a tree, simply open it:

![file renderer](http://g.recordit.co/cbf0xnQHKn.gif)

## Install

```bash
# For JupyterLab
jupyter labextension install jupyterlab_geojson
# For Notebook
pip install jupyterlab_geojson
jupyter nbextension install --py --sys-prefix jupyterlab_geojson
jupyter nbextension enable --py --sys-prefix jupyterlab_geojson
```

## Development

```bash
pip install -e .
# For JupyterLab
cd labextension
jupyter labextension link .
# For Notebook
jupyter nbextension install --symlink --py --sys-prefix jupyterlab_geojson
jupyter nbextension enable --py --sys-prefix jupyterlab_geojson
```
