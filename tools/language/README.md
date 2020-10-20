# Translations

## Why?

The Kiva Protocol Verifier SDK was born out of a similar application that we created for identity verification for financial institutions in Sierra Leone, and because of internet speeds/bandwidth constraints in Sierra Leone, we were given a product requirement that the app needed to be as lightweight as absolutely possible. While we wanted to support internationalization, we wanted to avoid importing libraries we didn't need.

Because the app doesn't have to process very much dynamic data, we were able to create a static map of translation data at build time, and then use a utility to look up and render the data from those keys during runtime.

And because we already built it, we figured we'd give it to you, too.

## How To Use It

The first thing you should do is create your data file - you can find a few samples in this very directory. If you are creating data for a new language, we recommend copying the JSON from one of the languages and then replacing the values with your own.

If you're adding a new translation key, you can do it like this.

1. Add the key to your JSON file. For courtesy's sake, please also copy the string to the `dev/default.json` file, or copy it to the other language files individually.
2. Add a new key to the `messageMap` in [the MessageBuilder script](https://github.com/kiva/protocol-sdk-verifier/tree/master/tools/bundle/MessageBuilder.js) and make the value correspond to the dot notation path of the new translation you added in Step 1.
3. In the application code, take the key you added to `messageMap` in Step 2 and print it out using `I18n.getKey('YOUR_KEY')`. You can also provide interpolated strings, which you can read more about in the "[How we use translations](https://github.com/kiva/protocol-sdk-verifier/tree/master/tools/language#how-we-use-translations)" section below.

### Translation files
The names of our translation directories begin with a lowercase language code (`en` for English, `es` for Spanish, `ar` for Arabic, etc.) followed by a `-` and then an uppercase country code (such as `SL` for Sierra Leone).

We allow additional keys to be appended to the name as long as the keys are separated by a `-`. We will build translations by first searching for the directory that matches a code exactly, then popping elements off the string and searching for directories whose name matches the truncated string.

For example, if we wanted to build translations for `en-UK-Hogwarts`, we would:

1. Try to find `en-UK-Hogwarts/default.json`
2. Then try to find `en-UK/default.json`
3. Then find `en/default.json`
4. Then find `dev/default.json`

For each search, we will process the keys in the file found [using our MessageBuilder script](https://github.com/kiva/protocol-sdk-verifier/tree/master/tools/bundle) and attach them to a shorter key to create a flat map of keys to translations, and then publish those to `./src/constants/translations.json`.

### How we use translations
We have built [a util file called `I18n`](https://github.com/kiva/protocol-sdk-verifier/blob/master/src/ui/utils/I18n.ts). This class consumes the short keys that are used in our translations JSON file and prints out the corresponding value using the `getKey()` method.

```
I18n.getKey('UKNOWN_ERROR'); // prints "An unknown error occurred."
```

We also have the option of interpolating strings using the `computeKey()` method.

```
INPUT_LENGTH_ERROR: "Input must be between {{minimum}} and {{maximum}} characters"

I18n.computeKey({
    minimum: 1,
    maximum: 50
}, 'INPUT_LENGTH_ERROR'); // prints "Input must be between 1 and 50 characters"
```