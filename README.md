# YAJER README

The README would normally document whatever steps are necessary to get the application up and running. This one also does so. Well, kind of.

## What is this all about?

This is Yet Another Jest Runner. It will scan the currently open document for tests and will provide an option to run an individual test, describe or the entire file.

> Tip: You can pick up the necessary jest configuration at runtime per file

## Right, but how to use it?

Just hover the small test icon at the end of you test statement line and choose a command from the tooltip provided,

![YAJER with Hover](https://github.com/styordanov/yajer/blob/master/media/marketplace/hover.gif 'YAJER with Hover')

or,

Right-click the test statement you'd like to run,

![YAJER with Context](https://github.com/styordanov/yajer/blob/master/media/marketplace/context.gif 'YAJER with Context')

or,

Use the nice little tree view in the explorer.

![YAJER with TreeView](https://github.com/styordanov/yajer/blob/master/media/marketplace/treeview.gif 'YAJER with TreeView')

## Anything to configure?

You don't have to.

By default YAJER will run with the jest executable from your project's `node_modules` folder and will scan recursively for configuration files (`jest.config.js` and `jest.config.json`). If this doesn't work for you, you can always define the executable and the config file path for yourself, or set the config file patterns, if you're doing some fancy stuff.

> Tip: Wanna add some spice? Just configure whatever you need as additional cli arguments, e.g.`--coverage`, `-u`, etc.

## Who should I talk to?

- For bugs / improvements / suggestions contact the repo owner
- For beer please do the same
