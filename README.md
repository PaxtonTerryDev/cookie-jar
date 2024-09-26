# CJ Cookie Manager

**CJ Cookie Manager** is a simple and flexible utility for managing cookies in web applications. It provides an easy-to-use API for setting, getting, and deleting cookies, with support for common cookie attributes such as `expires`, `path`, `secure`, `sameSite`, and `domain`. It also includes methods to handle cookies with JSON values.

## Features

- Set, get, and delete cookies with ease.
- Support for advanced cookie options like `Secure`, `SameSite`, and `Domain`.
- JSON encoding/decoding for cookie values.
- Built using TypeScript for type safety.

## Installation

Install the package via npm:

```bash
npm install cj-cookie-manager
```
## Usage
### Basic Usage
```typescript
import CJ from 'cj-cookie-manager';

// Get the singleton instance
const cookieManager = CJ.getInstance();

// Set a cookie
cookieManager.setCookie('username', 'JohnDoe', { expires: 7 }); // Expires in 7 days

// Get a cookie
const username = cookieManager.getCookie('username');
console.log(username); // Output: 'JohnDoe'

// Delete a cookie
cookieManager.deleteCookie('username');
```
### Setting a Cookie with Options
You can set cookies with additional options such as expiration time, secure flag, sameSite, and path.

```typescript
cookieManager.setCookie('sessionId', 'abc123', {
  expires: 3,              // Expires in 3 days
  path: '/',                // Available throughout the site
  secure: true,             // Only sent over HTTPS
  sameSite: 'Strict',       // SameSite policy
  domain: '.example.com'    // Cookie available across subdomains
});
```

### Handling JSON Data in Cookies
You can easily store and retrieve JSON objects as cookies using the setJSONCookie and getJSONCookie methods.

```typescript
// Set a cookie with a JSON object
cookieManager.setJSONCookie('preferences', { theme: 'dark', language: 'en' });

// Get the JSON object from the cookie
const preferences = cookieManager.getJSONCookie('preferences');
console.log(preferences); // Output: { theme: 'dark', language: 'en' }
```

## API
``setCookie(name: string, value: string, options?: CookieOptions)``
Sets a cookie with the given name and value, with optional settings for ``expires``, ``path``, ``secure``, ``sameSite``, and ``domain``.

Parameters:

- ``name``: The name of the cookie.
- ``value``: The value of the cookie.
- ``options`` (optional): Additional cookie settings.
    - ``expires``: Number of days until the cookie expires or a specific Date.
    - ``path``: The path on which the cookie is available (defaults to /).
    - ``secure``: Set to true to only send the cookie over HTTPS.
    - ``sameSite``: SameSite attribute ("Strict", "Lax", "None").
    - ``domain``: The domain where the cookie is available.

``getCookie(name: string): string | null``
Retrieves the value of the cookie with the specified name. Returns null if the cookie does not exist.

Parameters:

``name``: The name of the cookie.
deleteCookie(name: string, path?: string, domain?: string)
Deletes the cookie with the given name. Optionally specify the path and domain if they were set when the cookie was created.

Parameters:

``name``: The name of the cookie to delete.
``path``: The path of the cookie (defaults to /).
``domain``: The domain of the cookie.


``setJSONCookie(name: string, value: object, options?: CookieOptions)``
Sets a cookie with a JSON object as the value. The object will be automatically stringified.

Parameters:

``name``: The name of the cookie.
``value``: The JSON object to store.
``options`` (optional): Additional cookie settings (same as setCookie).

``getJSONCookie(name: string): object | null``
Retrieves the JSON object stored in the cookie with the specified name. Returns null if the cookie does not exist or if it can't be parsed.

Parameters:

``name``: The name of the cookie.
## Example
```typescript
import CJ from 'cj-cookie-manager';

const cookieManager = CJ.getInstance();

// Set a simple cookie
cookieManager.setCookie('userToken', '123456', { secure: true, sameSite: 'Lax' });

// Set a cookie with a JSON object
cookieManager.setJSONCookie('settings', { darkMode: true, notifications: false });

// Retrieve a simple cookie
const token = cookieManager.getCookie('userToken');
console.log(token); // Output: '123456'

// Retrieve a JSON cookie
const settings = cookieManager.getJSONCookie('settings');
console.log(settings); // Output: { darkMode: true, notifications: false }

// Delete a cookie
cookieManager.deleteCookie('userToken');
```
## License
This project is licensed under the MIT License. See the LICENSE file for details.