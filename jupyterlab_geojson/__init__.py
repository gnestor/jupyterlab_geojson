from IPython.display import display, JSON

# Running `npm run build` will create static resources in the static
# directory of this Python package (and create that directory if necessary).

def _jupyter_labextension_paths():
    return [{
        'name': 'jupyterlab_geojson',
        'src': 'static',
    }]

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyterlab_geojson',
        'require': 'jupyterlab_geojson/extension'
    }]

# A display class that can be used within a notebook. 
#   from jupyterlab_geojson import GeoJSON
#   GeoJSON(data)
    
class GeoJSON(JSON):
    """A display class for displaying GeoJSON visualizations in the Jupyter Notebook and IPython kernel.
    
    GeoJSON expects a JSON-able dict, not serialized JSON strings.

    Scalar types (None, number, string) are not allowed, only dict containers.
    """
    # wrap data in a property, which warns about passing already-serialized JSON
    _data = None
    
    def __init__(self, data=None, url_template=None, layer_options=None, url=None, filename=None, metadata=None):
        """Create a GeoJSON display object given raw data.

        Parameters
        ----------
        data : dict or list
            VegaLite data. Not an already-serialized JSON string.
            Scalar types (None, number, string) are not allowed, only dict
            or list containers.
        url_template : string
            Leaflet TileLayer URL template: http://leafletjs.com/reference.html#url-template
        layer_options : dict
            Leaflet TileLayer options: http://leafletjs.com/reference.html#tilelayer-options
        url : unicode
            A URL to download the data from.
        filename : unicode
            Path to a local file to load the data from.
        metadata: dict
            Specify extra metadata to attach to the json display object.
        """
        self.url_template = url_template
        self.layer_options = layer_options
        self.metadata = metadata
        super(GeoJSON, self).__init__(data=data, url=url, filename=filename)

    def _ipython_display_(self):
        md = {}
        if self.url_template:
            md['tileUrlTemplate'] = self.url_template
        if self.layer_options:
            md['tileLayerOptions'] = self.layer_options
        if self.metadata:
            md.update(self.metadata)
        bundle = {
            'application/geo+json': self.data,
            'text/plain': '<jupyterlab_geojson.GeoJSON object>'
        }
        metadata = {
            'application/geo+json': md
        }
        display(bundle, metadata=metadata, raw=True)
