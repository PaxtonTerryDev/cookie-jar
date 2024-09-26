interface CookieOptions {
  path?: string;
  expires?: Date | number;
  secure?: boolean;
  httpOnly?: boolean; // Cannot be set from JS, server-side only
  sameSite?: "Strict" | "Lax" | "None";
  domain?: string;
}

export class CJ {
  private static instance: CJ;

  private constructor() {}

  public static getInstance(): CJ {
    if (!CJ.instance) {
      CJ.instance = new CJ();
    }
    return CJ.instance;
  }

  static setCookie(
    name: string,
    value: string,
    options: CookieOptions = {}
  ): void {
    if (options.sameSite === "None" && !options.secure) {
      throw new Error(
        "Cookies with SameSite=None must also have the Secure attribute."
      );
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
      value || ""
    )}`;

    if (options.expires) {
      if (typeof options.expires === "number") {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
      } else {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
    }

    if (options.path) cookieString += `; path=${options.path}`;
    if (options.secure) cookieString += `; Secure`;
    if (options.sameSite) cookieString += `; SameSite=${options.sameSite}`;
    if (options.domain) cookieString += `; domain=${options.domain}`;

    document.cookie = cookieString;
  }

  static getCookie(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  }

  static deleteCookie(name: string, path: string = "/", domain?: string): void {
    let cookieString = `${encodeURIComponent(
      name
    )}=; Max-Age=-99999999; path=${path}`;
    if (domain) cookieString += `; domain=${domain}`;
    document.cookie = cookieString;
  }

  static setJSONCookie(
    name: string,
    value: object,
    options?: CookieOptions
  ): void {
    CJ.setCookie(name, JSON.stringify(value), options);
  }

  static getJSONCookie(name: string): object | null {
    const cookie = CJ.getCookie(name);
    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch (error) {
        console.error("Error parsing cookie JSON", error);
        return null;
      }
    }
    return null;
  }
}
