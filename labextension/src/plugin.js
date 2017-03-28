import { IRenderMime } from '@jupyterlab/rendermime';
import { IDocumentRegistry } from '@jupyterlab/docregistry';
import { ILayoutRestorer, InstanceTracker } from '@jupyterlab/apputils';
import { toArray, ArrayExt } from '@phosphor/algorithm';
import { OutputRenderer } from './output';
import { DocWidgetFactory } from './doc';
import './index.css';

/**
 * The name of the factory
 */
const FACTORY = 'GeoJSON';

/**
 * Set the extensions associated with GeoJSON.
 */
const EXTENSIONS = ['.geojson', '.geo.json', '.json'];
const DEFAULT_EXTENSIONS = ['.geojson', '.geo.json'];

/**
 * Activate the extension.
 */
function activatePlugin(app, rendermime, registry, restorer) {
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

  const factory = new DocWidgetFactory({
    fileExtensions: EXTENSIONS,
    defaultFor: DEFAULT_EXTENSIONS,
    name: FACTORY,
    // displayName: FACTORY,
    // modelName: 'text',
    // preferKernel: false,
    // canStartKernel: false
  });

  /**
   * Add document renderer for geojson files
   */
  registry.addWidgetFactory(factory);
  
  const tracker = new InstanceTracker({
    namespace: 'jupyterlab_geojson',
    shell: app.shell
  });

  /**
   * Handle state restoration
   */
  restorer.restore(tracker, {
    command: 'file-operations:open',
    args: widget => ({ path: widget.context.path, factory: FACTORY }),
    name: widget => widget.context.path
  });

  /**
   * Track the widget
   */
  factory.widgetCreated.connect((sender, widget) => {
    tracker.add(widget);
    /* Notify the instance tracker if restore data needs to update */
    widget.context.pathChanged.connect(() => {
      tracker.save(widget);
    });
  });
}

/**
 * Configure jupyterlab plugin
 */
const Plugin = {
  id: 'jupyter.extensions.GeoJSON',
  requires: [IRenderMime, IDocumentRegistry, ILayoutRestorer],
  activate: activatePlugin,
  autoStart: true
};

export default Plugin;
