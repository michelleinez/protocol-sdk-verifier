# Configurations in Depth

## Why?
The SDK uses [`create-react-app`](https://create-react-app.dev) in order to create optimized production builds for production. By default, the package only supports `development` and `production` as environment definition flags.

Rather than use other environment variables to control values that should be tied to environment definition and maintaining multiple `.env` files, we have decided to create configuration files that contain some definitions that apply to all environments, as well as values that only apply to specific environments.

This allows us to modify just one file when we need to make changes and makes it easy to control inheritance between environments.

## Environment-specific variables

### `permittedOrigins`
The SDK uses cross-window messaging as part of its business logic to set state for certain components. The `permittedOrigins` string is a comma-separated list of origins whose MessageEvents will be honored.

### `permittedOriginPatterns`
This key, if defined, allows you to define wildcard patterns in addition to the values defined in `permittedOrigins`.

### `actions`
Rather than adjusting internal state of components based on an object sent as part of a cross-window message, the SDK has a pre-defined list of strings that correspond to `setState` parameters. You can see this list in the [ActionBuilder.js file](https://github.com/kiva/Protocol-EKYC-SDK/blob/master/tools/bundle/ActionBuilder.js).

If you define an `actions` object, you can limit which strings will be honored in the MessageEvent listener.

### `inherits`
This array allows you to define environments whose configurations will be added. Inherited values will not override values defined within an environment.

## Globally scoped variables
### `locale`
This variable controls which translation file is used for populating text fields in the SDK. For certain languages, it can also control the text direction of the app (for example, setting `locale="ar"` will change the class of the `#root` HTML element of the app from `ltr` to `rtl`).

For more information on translations, you can look at the [language directory](https://github.com/kiva/protocol-sdk-verifier/tree/master/tools/language).

### `verification_options`
This array controls which authentication options to enable for a given version of the application. If the array's length is greater than 1, an option menu will be automatically rendered in your application after the user consents to begin the verification process.

This configuration is an array of `AuthOption` objects, which contain the following keys:

* `id`: A unique ID for the authentication type. If you are planning on using `AgencyQR.tsx`, you should make sure that the ID corresponds to a key in the switch statement used for [determining the cloud agent](https://github.com/kiva/protocol-sdk-verifier/blob/demo/src/ui/screens/AgencyQR.tsx#L53-L63). 
* `title`: This is the title text used in the menu for selecting which authentication method to use
* `description`: Descriptive text used in the menu for selecting which authentication method to use
* `guardian`: A boolean to indicate whether the eKYC verification requires a third party in order to succeed, or whether the verification method can (but does not necessarily have to) rely completely on agent-to-agent communication.
* `sequence`: This is an array of IDs that determines the order of navigation for the application. Each ID should have a corresponding React component in the [ScreenDictionary component](https://github.com/kiva/protocol-sdk-verifier/blob/master/src/ui/screens/ScreenDictionary.tsx).

### `pii_map`
This map defines the pieces of PII (Personally Identifiable Information) which will be requested as part of an organization's eKYC verification. ([More information about PII can be found here](https://en.wikipedia.org/wiki/Personal_data))

This is an object which assigns metadata to the values that will be returned from a successful eKYC request, and is used to verify that the backend response is complete and genuine.

* `name`: This value is used for text values throughout the app, especially the Results page and the User Consent page.
* `rendered`: This boolean determines whether the PII value is rendered on the Results page.
* `alternateName`: If defined, this is the text value that will be used in the Results page rather than the value defined in `name`.
* `wide`: Determines if the data should span two columns on the Results page. Defaults to `false`.
* `alternateKey`: In some cases, the keys returned from the backend in a successful eKYC response will need to be translated to a different value. If defined, `alternateKey` can be used to define the new key that will be used.

### `colorMap`
This allows for defining a color scheme. If this object is undefined, these are the default values that will be added to the application as a SCSS file:

```
$primary-color: #24778b;
$primary-offset: white;
$secondary-color: #e7e7e7;
$secondary-offset: #333;
$error-color: #b65f57;
$error-offset: white;
$warning-color: #fff625;
$warning-offset: #000;
```

You can redefine colors for any color by adding it to the `colorMap` object. Keys that are not included in `colorMap` will use the default color.

### `controllerUrlBase`
If you are using a cloud agent for verifications, you can provide the base URL for the agent in this key. The endpoints for this base URL should be configured directly in the `IAgent` you create in [agents directory](https://github.com/kiva/protocol-sdk-verifier/blob/master/src/ui/agents).

### `agentPort`
If you are running a verification agent on your local machine, you can set this value to the port that your agent is running on.


### `headerImage`
This defines the URI string pointing to the image that will be used in the SDK's header.

