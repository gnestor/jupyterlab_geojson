import { IRenderMime } from '@jupyterlab/rendermime';
import { IDocumentRegistry } from '@jupyterlab/docregistry';
import { toArray, ArrayExt } from '@phosphor/algorithm';
import { OutputRenderer } from './output';
import { DocWidgetFactory } from './doc';
import './index.css';

/**
 * Activate the extension.
 */
function activatePlugin(app, rendermime, registry) {
  /**
   * Calculate the index of the renderer in the array renderers
   * e.g. Insert this renderer after any renderers with mime type that matches 
   * "+json"
   */
  // const index = ArrayExt.findLastIndex(
  //   toArray(rendermime.mimeTypes()),
  //   mime => mime.endsWith('+json')
  // ) + 1;
  /* ...or just insert it at the top */
  const index = 0;

  /**
   * Add mime type renderer for application/geo+json
   */
  rendermime.addRenderer(
    {
      mimeType: 'application/geo+json',
      renderer: new OutputRenderer()
    },
    index
  );
  
  /**
   * Set the extensions associated with GeoJSON.
   */
  const EXTENSIONS = ['.geojson', '.json'];
  const DEFAULT_EXTENSIONS = ['.geojson'];

    /**
     * Add document renderer for geojson files
     */
    const options = {
      fileExtensions: EXTENSIONS,
      defaultFor: DEFAULT_EXTENSIONS,
      name: 'GeoJSON',
      displayName: 'GeoJSON',
      modelName: 'text',
      preferKernel: false,
      canStartKernel: false
    };
    
  registry.addWidgetFactory(new DocWidgetFactory(options));
}

/**
 * Configure jupyterlab plugin
 */
const Plugin = {
  id: 'jupyter.extensions.GeoJSON',
  requires: [IRenderMime, IDocumentRegistry],
  activate: activatePlugin,
  autoStart: true
};

export default Plugin;
